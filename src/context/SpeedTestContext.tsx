import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

interface SpeedTestContextType {
  ping: number;
  downloadSpeed: number;
  uploadSpeed: number;
  isTestRunning: boolean;
  currentTest: 'idle' | 'ping' | 'download' | 'upload';
  startTest: () => Promise<void>;
}

const SpeedTestContext = createContext<SpeedTestContextType | undefined>(undefined);

export const useSpeedTest = () => {
  const context = useContext(SpeedTestContext);
  if (!context) {
    throw new Error('useSpeedTest must be used within a SpeedTestProvider');
  }
  return context;
};

export const SpeedTestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ping, setPing] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<'idle' | 'ping' | 'download' | 'upload'>('idle');

  const measurePing = async () => {
    setCurrentTest('ping');
    const startTime = performance.now();
    try {
      await axios.get('https://www.google.com/favicon.ico', {
        timeout: 5000,
      });
      const endTime = performance.now();
      setPing(Math.round(endTime - startTime));
    } catch (error) {
      console.error('Ping measurement failed:', error);
      setPing(0);
    }
  };

  const measureDownloadSpeed = async () => {
    setCurrentTest('download');
    const fileSize = 5 * 1024 * 1024; // 5MB test file
    const startTime = performance.now();
    try {
      await axios.get(`https://speed.cloudflare.com/__down?bytes=${fileSize}`, {
        timeout: 10000,
        responseType: 'arraybuffer',
      });
      const endTime = performance.now();
      const durationInSeconds = (endTime - startTime) / 1000;
      const speedMbps = (fileSize * 8) / (1000000 * durationInSeconds);
      setDownloadSpeed(Math.round(speedMbps));
    } catch (error) {
      console.error('Download speed test failed:', error);
      setDownloadSpeed(0);
    }
  };

  const measureUploadSpeed = async () => {
    setCurrentTest('upload');
    const dataSize = 2 * 1024 * 1024; // 2MB test data
    const testData = new Blob([new ArrayBuffer(dataSize)]);
    const startTime = performance.now();
    try {
      await axios.post('https://speed.cloudflare.com/__up', testData, {
        timeout: 10000,
        headers: { 'Content-Type': 'application/octet-stream' },
      });
      const endTime = performance.now();
      const durationInSeconds = (endTime - startTime) / 1000;
      const speedMbps = (dataSize * 8) / (1000000 * durationInSeconds);
      setUploadSpeed(Math.round(speedMbps));
    } catch (error) {
      console.error('Upload speed test failed:', error);
      setUploadSpeed(0);
    }
  };

  const startTest = useCallback(async () => {
    setIsTestRunning(true);
    try {
      await measurePing();
      await measureDownloadSpeed();
      await measureUploadSpeed();
    } finally {
      setIsTestRunning(false);
      setCurrentTest('idle');
    }
  }, []);

  const value = {
    ping,
    downloadSpeed,
    uploadSpeed,
    isTestRunning,
    currentTest,
    startTest,
  };

  return (
    <SpeedTestContext.Provider value={value}>
      {children}
    </SpeedTestContext.Provider>
  );
};
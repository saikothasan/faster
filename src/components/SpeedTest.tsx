import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Download, Upload } from 'lucide-react';
import { useSpeedTest } from '../context/SpeedTestContext';
import SpeedGauge from './SpeedGauge';

const SpeedTest: React.FC = () => {
  const { ping, downloadSpeed, uploadSpeed, isTestRunning, currentTest, startTest } = useSpeedTest();

  return (
    <div className="max-w-xl w-full mx-auto space-y-8 p-4 sm:p-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold">Test Your Internet Speed</h1>
        <p className="text-text-secondary text-base sm:text-lg max-w-prose mx-auto">
          Find out how fast your internet connection, measure ping time in millisecond, maximum download
          and upload speed in Megabits per second (Mbps) unit
        </p>
      </div>

      <div className="grid gap-8 sm:gap-12">
        <div className="w-full flex justify-center">
          <SpeedGauge
            type="ping"
            value={ping}
            maxValue={3000}
            unit="ms"
            icon={Activity}
            label="Ping Speed"
            isActive={currentTest === 'ping'}
          />
        </div>

        <div className="w-full flex justify-center">
          <SpeedGauge
            type="download"
            value={downloadSpeed}
            maxValue={1000}
            unit="Mbps"
            icon={Download}
            label="Download Speed"
            isActive={currentTest === 'download'}
          />
        </div>

        <div className="w-full flex justify-center">
          <SpeedGauge
            type="upload"
            value={uploadSpeed}
            maxValue={1000}
            unit="Mbps"
            icon={Upload}
            label="Upload Speed"
            isActive={currentTest === 'upload'}
          />
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="button-primary w-full sm:w-auto"
          onClick={startTest}
          disabled={isTestRunning}
          aria-label={isTestRunning ? 'Speed test in progress' : 'Start speed test'}
        >
          {isTestRunning ? 'Testing...' : 'Start Testing'}
        </motion.button>
      </div>
    </div>
  );
};

export default SpeedTest;
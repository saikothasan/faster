import React from 'react';
import SpeedTest from './components/SpeedTest';
import { SpeedTestProvider } from './context/SpeedTestContext';

function App() {
  return (
    <SpeedTestProvider>
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <SpeedTest />
      </div>
    </SpeedTestProvider>
  );
}

export default App;
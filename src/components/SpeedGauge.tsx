import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SpeedGaugeProps {
  type: 'ping' | 'download' | 'upload';
  value: number;
  maxValue: number;
  unit: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
}

const SpeedGauge: React.FC<SpeedGaugeProps> = ({
  type,
  value,
  maxValue,
  unit,
  icon: Icon,
  label,
  isActive,
}) => {
  const angle = (value / maxValue) * 180;
  const clampedAngle = Math.min(Math.max(angle, 0), 180);
  const radius = 120;
  const strokeWidth = 12;

  const getGradientId = () => {
    switch (type) {
      case 'ping':
        return 'gaugeGradientPing';
      case 'download':
        return 'gaugeGradientDownload';
      case 'upload':
        return 'gaugeGradientUpload';
      default:
        return '';
    }
  };

  const getNeedleClass = () => {
    switch (type) {
      case 'ping':
        return 'needle-ping';
      case 'download':
        return 'needle-download';
      case 'upload':
        return 'needle-upload';
      default:
        return '';
    }
  };

  return (
    <div className="relative flex flex-col items-center transform scale-90 sm:scale-100">
      <div className="relative w-[280px] h-[140px]">
        <svg
          width="280"
          height="140"
          viewBox="0 0 280 140"
          className={`transform ${isActive ? 'animate-pulse-slow' : ''}`}
          role="img"
          aria-label={`${label} gauge showing ${value} ${unit}`}
        >
          <defs>
            <linearGradient id={getGradientId()} x1="0%" y1="0%" x2="100%" y2="0%">
              {type === 'upload' ? (
                <>
                  <stop offset="0%" className="gauge-gradient-upload-start" />
                  <stop offset="100%" className="gauge-gradient-upload-end" />
                </>
              ) : (
                <stop offset="100%" className={`gauge-gradient-${type}`} />
              )}
            </linearGradient>
          </defs>

          <path
            d={`M ${strokeWidth / 2},${140 - strokeWidth / 2} A ${radius},${radius} 0 0 1 ${
              280 - strokeWidth / 2
            },${140 - strokeWidth / 2}`}
            fill="none"
            strokeWidth={strokeWidth}
            className="gauge-background"
          />

          <path
            d={`M ${strokeWidth / 2},${140 - strokeWidth / 2} A ${radius},${radius} 0 0 1 ${
              280 - strokeWidth / 2
            },${140 - strokeWidth / 2}`}
            fill="none"
            strokeWidth={strokeWidth}
            stroke={`url(#${getGradientId()})`}
            strokeDasharray={`${(clampedAngle / 180) * Math.PI * radius} ${Math.PI * radius}`}
          />

          <motion.line
            x1="140"
            y1="140"
            x2="140"
            y2="30"
            strokeWidth="2"
            className={getNeedleClass()}
            animate={{ rotate: clampedAngle }}
            transition={{ type: 'spring', stiffness: 50, damping: 10 }}
            style={{ transformOrigin: '140px 140px' }}
          />

          <circle cx="140" cy="140" r="4" className={getNeedleClass()} />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl sm:text-3xl font-bold">{value}</span>
            <span className="text-base sm:text-lg text-text-secondary">{unit}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-base sm:text-lg font-medium">{label}</span>
      </div>

      <div className="absolute top-0 flex justify-between w-full px-4 text-xs sm:text-sm text-text-secondary">
        <span>0</span>
        <span>{maxValue}</span>
      </div>
    </div>
  );
};

export default SpeedGauge;
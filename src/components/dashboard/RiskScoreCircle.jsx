import React from 'react';

const RiskScoreCircle = ({ score = 85 }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  // Calculate percentages for each section
  const onTimePerformance = 40; // Purple
  const safety = 30; // Green
  const compliance = 30; // Blue

  const sections = [
    { percentage: onTimePerformance, color: '#D14DCF', offset: 0 },
    { percentage: safety, color: '#38D935', offset: onTimePerformance },
    { percentage: compliance, color: '#3C8CE2', offset: onTimePerformance + safety },
  ];

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-sm font-semibold text-black mb-3">Risk Score Card</h3>

      {/* Circular Progress */}
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
          {/* Background circle */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="12"
          />

          {/* Colored segments */}
          {sections.map((section, index) => {
            const segmentLength = (section.percentage / 100) * circumference;
            const offset = (section.offset / 100) * circumference;

            return (
              <circle
                key={index}
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke={section.color}
                strokeWidth="12"
                strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                strokeDashoffset={-offset}
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {/* Center score */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-black">{score}%</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2 w-full">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-icon-purple"></div>
          <span className="text-xs text-text-medium">On-Time Performance</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-status-success"></div>
          <span className="text-xs text-text-medium">Safety</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary-blue"></div>
          <span className="text-xs text-text-medium">Compliance</span>
        </div>
      </div>
    </div>
  );
};

export default RiskScoreCircle;

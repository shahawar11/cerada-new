"use client";
import { useEffect, useState, useMemo } from "react";

const getTimeDiff = (targetDate: Date) => {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0)
    return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 30);
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));

  return { months, days, hours, minutes, seconds };
};

export default function Countdown({
  targetDateString,
}: {
  targetDateString: string;
}) {
  const targetDate = useMemo(() => new Date(targetDateString), [targetDateString]);
  const [timeLeft, setTimeLeft] = useState(getTimeDiff(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeDiff(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timeUnits = [
    {
      value: timeLeft.months,
      label: "Months",
      shortLabel: "MON",
      color: "from-blue-950 to-blue-900",
    },
    {
      value: timeLeft.days,
      label: "Days",
      shortLabel: "DAY",
      color: "from-blue-900 to-blue-800",
    },
    {
      value: timeLeft.hours,
      label: "Hours",
      shortLabel: "HRS",
      color: "from-blue-800 to-blue-700",
    },
    {
      value: timeLeft.minutes,
      label: "Minutes",
      shortLabel: "MIN",
      color: "from-blue-700 to-blue-600",
    },
    {
      value: timeLeft.seconds,
      label: "Seconds",
      shortLabel: "SEC",
      color: "from-blue-600 to-blue-500",
    },
  ];

  return (
    <div className="w-full flex justify-center items-center ">
      {/* Desktop/Tablet View */}
      <div className="hidden sm:flex items-center gap-3">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex items-center gap-3">
            <div
              className={`
              bg-gradient-to-br ${unit.color} 
              rounded-xl p-4 min-w-[80px] h-[70px]
              flex flex-col items-center justify-center
              shadow-lg hover:shadow-xl transition-all duration-300
              border border-white/20 backdrop-blur-sm
              hover:scale-105 transform
            `}
            >
              <div className="text-2xl xl:text-3xl font-bold text-white tabular-nums leading-none">
                {unit.value.toString().padStart(2, "0")}
              </div>
              <div className="text-xs xl:text-sm text-white/90 font-medium mt-1 uppercase tracking-wide">
                {unit.label}
              </div>
            </div>
            {index < timeUnits.length - 1 && (
              <div className="text-gray-400 text-xl font-bold">:</div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="flex sm:hidden items-center gap-2 flex-wrap justify-center">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex items-center gap-2">
            <div
              className={`
              bg-gradient-to-br ${unit.color} 
              rounded-lg p-3 min-w-[70px] h-[65px]
              flex flex-col items-center justify-center
              shadow-md hover:shadow-lg transition-all duration-300
              border border-white/20
              hover:scale-105 transform
            `}
            >
              <div className="text-xl font-bold text-white tabular-nums leading-none">
                {unit.value.toString().padStart(2, "0")}
              </div>
              <div className="text-xs text-white/90 font-medium mt-1 uppercase tracking-wide">
                {unit.shortLabel}
              </div>
            </div>
            {index < timeUnits.length - 1 && index % 2 === 1 && (
              <div className="w-full basis-full h-0"></div>
            )}
            {index < timeUnits.length - 1 && index % 2 === 0 && (
              <div className="text-gray-400 text-lg font-bold">:</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

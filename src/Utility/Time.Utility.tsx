import React, { useEffect, useState } from "react";

interface ElapsedClockProps {
  startTime: string;
}

const Time = ({ startTime }: ElapsedClockProps) => {

  const [elapsedTime, setElapsedTime] = useState("");
  
  useEffect(() => {
    const [time, period] = startTime.trim().split(" ");
    if (!time || !period || !["am", "pm"].includes(period.toLowerCase())) {
      throw new Error("Invalid start time format. Expected HH:MM:SS (am/pm)");
    }

    let [hours, minutes, seconds] = time.split(":").map(Number);

    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      isNaN(seconds) ||
      hours > 12 ||
      minutes > 59 ||
      seconds > 59
    ) {
      console.error(
        "Invalid time in startTime. Ensure 'hh:mm:ss' format is correct."
      );
      return;
    }
    if (period.toLowerCase() === "pm" && hours < 12) {
      hours += 12;
    } else if (period.toLowerCase() === "am" && hours === 12) {
      hours = 0;
    }
    const start = new Date();
    start.setHours(hours, minutes, seconds);

    const updateElapsedTime = () => {
      const now = new Date();
      const elapsed = Math.floor(
        Math.abs((now.getTime() - start.getTime()) / 1000)
      );

      const elapsedSeconds = elapsed % 60;
      const elapsedMinutes = Math.floor(elapsed / 60) % 60;
      const elapsedHours = Math.floor(elapsed / 3600);

      setElapsedTime(
        `${elapsedHours.toString().padStart(2, "0")}:${elapsedMinutes
          .toString()
          .padStart(2, "0")}:${elapsedSeconds.toString().padStart(2, "0")}`
      );
    };

    const intervalId = setInterval(updateElapsedTime, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);


  return (
    <div className="">
      <p className="font-[500] text-9xl text-shadow-md">{elapsedTime}</p>
    </div>
  );
};

export default Time;

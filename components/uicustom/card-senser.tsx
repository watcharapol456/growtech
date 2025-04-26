"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
export const CardSensor = () => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [soil, setSoil] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);

  async function fetchTemperature() {
    try {
      const res = await fetch("/api/card");
      if (!res.ok) {
        throw new Error("Failed to fetch temperature data");
      }
      const data = await res.json();
      console.log("DEBUG data", data);
      setTemperature(data.avgTemp);
      setHumidity(data.avgHumidity);
      setSoil(data.avgSoil);
    
      console.log("DEBUG soil value:", soil);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTemperature();
    const interval = setInterval(fetchTemperature, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString();
      setTime(formatted);
    };
    updateTime(); 
    const interval = setInterval(updateTime, 1000); 

    return () => clearInterval(interval);
  }, []);
  console.log("DEBUG DATA", temperature, humidity, soil, time);
  return (
    <div className="grid grid-cols-2 w-full h-full  ">
      {/* Temperature */}
      <div className="flex flex-col justify-center items-center border-r border-b border-gray-500">
        <div className="flex items-center gap-2 text-green-900 text-3xl font-semibold ml-8">
          {temperature} °C
          <Image
            src="/assets/thermometer.svg"
            width={30}
            height={30}
            alt="temp"
          />
        </div>
        <p className="text-green-900 text-lg font-semibold mx-auto">Temperature</p>
      </div>

      <div className="flex flex-col justify-center items-center border-b border-gray-500">
        <div className="flex items-center gap-2 text-green-900 text-3xl font-semibold ml-10">
          {humidity} %
          <Image
            src="/assets/droplets.svg"
            width={30}
            height={30}
            alt="humidity"
          />
        </div>
        <p className="text-green-900 text-lg font-semibold ">humidity</p>
      </div>

      <div className="flex flex-col justify-center items-center border-r border-gray-500">
        <div className="flex items-center gap-2 text-green-900 text-3xl font-semibold ml-10">
          <span>{soil === 1 ? "ความชื้นเพียงพอ" : "ความชื้นไม่เพียงพอ"}</span>
          <Image
            src="/assets/droplets.svg"
            width={30}
            height={30}
            alt="soil moisture"
          />
        </div>

        <p className="text-green-900 text-lg font-semibold ">Soil Moisture</p>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center gap-2 text-green-900 text-3xl font-semibold ml-10">
          {time} 
          <Image src="/assets/droplets.svg" width={30} height={30} alt="time" />
        </div>
        <p className="text-green-900 text-lg font-semibold ">Time</p>
      </div>
    </div>
  );
};

export default CardSensor;

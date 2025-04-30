"use client";

import { useCurrentUser } from "@/hook/useCurrentUser";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type RawItem = {
  timestamp: string;
  temp1: number;
  humi1: number;
  avgSoil: number;
  eData: number;
};

type DisplayItem = {
  title: string;
  date: string;
};

export default function DateFilter() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [allData, setAllData] = useState<RawItem[]>([]);
  const [filteredData, setFilteredData] = useState<DisplayItem[]>([]);
  const user = useCurrentUser();

  // ดึงข้อมูลทั้งหมด
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/datareport");
      const result = await res.json();
      setAllData(result);
    };
    fetchData();
  }, []);

  // กรองข้อมูลตามวันที่ที่เลือก
  useEffect(() => {
    if (!selectedDate || allData.length === 0) return;

    const selectedDay = selectedDate.getDate();
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();

    const filtered = allData
      .filter((item) => {
        const itemDate = new Date(item.timestamp);
        return (
          itemDate.getDate() === selectedDay &&
          itemDate.getMonth() === selectedMonth &&
          itemDate.getFullYear() === selectedYear
        );
      })
      .map((item) => ({
        title: `อุณหภูมิ: ${item.temp1}°C, ความชื้น: ${item.humi1}%, ความชื้นดิน: ${item.avgSoil}%`,
        date: item.timestamp,
      }));

    setFilteredData(filtered);
  }, [selectedDate, allData]);

  if (user?.role === "ADMIN") {
    return redirect("/admin/dashboard");
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
        เลือกวันที่เพื่อดูข้อมูล
      </h1>

      <div className="flex justify-center mb-6">
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          className="border border-gray-300 rounded px-3 py-2 text-gray-700"
        />
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="font-semibold text-lg text-gray-700 mb-3">
          ข้อมูลวันที่:{" "}
          <span className="text-blue-600">
            {selectedDate?.toLocaleDateString()}
          </span>
        </h2>

        {filteredData.length === 0 ? (
          <p className="text-red-500">ไม่พบข้อมูลในวันนี้</p>
        ) : (
          <ul className="space-y-3">
            {filteredData.map((item, idx) => (
              <li
                key={idx}
                className="p-3 bg-white rounded shadow text-gray-800 border-l-4 border-blue-500"
              >
                <p className="text-sm text-gray-500">{item.date}</p>
                <p>{item.title}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

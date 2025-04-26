"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { insertReportdata } from "@/actions";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Label } from "../ui/label";

export default function ReportForm() {
  const [description, setDescription] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!description.trim()) {
      toast.error("กรุณากรอกรายละเอียดก่อนบันทึก");
      return;
    }

    try {
      const reportdata = await insertReportdata({
        description: description,
        topic: topic,
        name: name,
      });
      console.log("data added:", reportdata);
      toast.success("บันทึกข้อมูลเรียบร้อย");
      setDescription(""); // เคลียร์ข้อความ
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }

  };

  return (
    <div className="flex w-[400px]  ">
      <form onSubmit={handleSubmit}>
        <Label className="m-5 text-2xl">Topic</Label>

        <Textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter Topic"
          className="m-5 w-[400px]"
        />
        <Label className="m-5 text-2xl">details</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter details"
          className="m-5 w-[400px]"
        />
        <div className=" w-full flex justify-center justify-items-center">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}

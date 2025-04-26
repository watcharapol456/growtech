// "use client";

// import { DatePicker } from "@/components/ui/DatePicker";
// import { useCurrentUser } from "@/hook/useCurrentUser";
// import { redirect } from "next/navigation";

// import { Button } from "@/components/ui/button";
// import { useState, useTransition } from "react";
// import { getReportsByDate } from "@/actions/date.action";


// interface Reports {
//   time: Date; 
//   temperature: number;
//   humidity: number;
//   soil: number;
// }

// export default function ReportPage() {
//   const user = useCurrentUser();
//   const [data, setData] = useState<Reports[]>([]); 
//   const [isPending, startTransition] = useTransition();
 
//   if (user?.role === "user") {
//     redirect("/dashboard");
//   }

//   const handleSubmit = async (formData: FormData) => {
//     startTransition(async () => {
//       const reports = await getReportsByDate(formData); 
//       setData(reports);
//       console.log("DEBUG reports",reports)
//     });
//   };

//   return (
//     <div className="w-full h-full">
//       <div className="border-b-4 p-5 m-5">
//         <h1 className="text-4xl font-bold">Report</h1>
//       </div>
//       <div className="flex">
//         <div className="flex flex-col items-center justify-center w-full">
//           <div className="flex flex-1 h-full items-end">
//             <h1 className="text-4xl font-bold">Dataset</h1>
//           </div>
//           <form action={handleSubmit}>
//             <DatePicker />
//             <Button disabled={isPending}>{isPending ? "Loading..." : "Submit"}</Button>
//           </form>
//         </div>
//         <div className="flex flex-col items-center w-full p-4 border border-gray-300 rounded-lg m-5">
//           <h2 className="text-2xl font-semibold mb-2">Area Show Data</h2>
//           {isPending ? (
//             <p>Loading...</p>
//           ) : data.length > 0 ? (
//             <ul className="w-full">
//               {data.map((item) => (
//                 <li key={item.time.toString()} className="border-b p-2">
              
    
//                   <p><strong>Temperature:</strong> {item.temperature}°C</p>
//                   <p><strong>Humidity:</strong> {item.humidity}%</p>
//                   <p><strong>Soil:</strong> {item.soil}</p>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No data available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

const Page = () =>{
  return (
    <div>
      Page
    </div>
  )
}
export default Page;
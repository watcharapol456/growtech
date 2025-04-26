
export async function GET() {
    try {
      const res = await fetch("https://cmmlab.kmutt.ac.th/growtechs/datareport");
  
      if (!res.ok) {
        return new Response("Failed to fetch data from upstream", { status: 500 });
      }
  
      const data = await res.json();
      return Response.json(data);
    } catch (error) {
      return new Response("Internal Server Error", { status: 500 });
    }
  }
  
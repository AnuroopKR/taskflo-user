export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return Response.json({ error: "Failed to fetch" }, { status: 500 });
    }

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
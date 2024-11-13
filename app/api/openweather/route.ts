import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Access query parameters
  const query = req.nextUrl.searchParams;
  const lat = query.get("lat");
  const lng = query.get("lng");

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHER_API_KEY}`;
  const API_URL_OPENWEATHER_5DAYS = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHER_API_KEY}`;

  try {
    const res = await fetch(API_URL);
    const res_2 = await fetch(API_URL_OPENWEATHER_5DAYS);

    if (!res.ok) {
      throw new Error(`Error fetching weather data: ${res.statusText}`);
    }

    const data = await res.json();
    const data_2 = await res_2.json();

    return NextResponse.json({
      openweatherpos: data,
      openweather5days: data_2,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}

import { Location } from "@/types/location";
import type { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.OPENWEATHER_API_KEY as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { latitude, longitude } = req.body as Location;

  console.log("API", latitude, longitude);

  if (!latitude || !longitude) return res.status(400).end();

  const url = `https://pro.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  console.log("url", url);
  const data = await fetch(url);

  console.log("BACKEND DATA", data);
  const data2 = await data.json();
  return res.status(200).json(data2);
}

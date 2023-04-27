import { Location } from "@/types/location";
import type { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.OPENWEATHER_API_KEY as string;

const limit = 1;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { latitude, longitude } = req.body as Location;

  console.log("API", latitude, longitude);

  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${limit}&appid=${API_KEY}`;
  console.log("url", url);
  const data = await fetch(url, {
    method: "GET"
  });

  console.log("BACKEND DATA", data);
  return res.status(200).json(data);
}

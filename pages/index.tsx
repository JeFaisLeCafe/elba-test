import { useState, useEffect } from "react";
import { useGetLocation } from "@/utils/useGetLocation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { location } = useGetLocation();

  console.log("location INDEX", location);

  useEffect(() => {
    async function getForecast() {
      if (location && location.latitude && location.longitude) {
        const data = await fetch("/api/getForecast", {
          method: "POST",
          body: JSON.stringify(location)
        });
        console.log("data front", data);
        const forecast = await data.json();
        console.log("forecast", forecast);
      }
      setIsLoading(false);
    }

    getForecast();
  }, [location]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-6xl font-bold">Elba Weather App</h1>
      <h2 className="text-2xl italic">
        Front-end Technical Test by Pierre-Étienne Soury
      </h2>
    </main>
  );
}

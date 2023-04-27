import { Location } from "@/types/location";
import { useEffect, useState } from "react";

export const useGetLocation = () => {
  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        if (
          latitude &&
          longitude &&
          latitude !== location?.latitude &&
          longitude !== location?.longitude
        ) {
          setLocation({ latitude, longitude });
        }
      },
      (err) => console.warn(err),
      { timeout: 2000 }
    );
  }, [location?.latitude, location?.longitude]);

  return { location };
};

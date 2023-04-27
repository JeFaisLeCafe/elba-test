// Import required dependencies
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { useGetLocation } from "@/utils/useGetLocation";

const WeatherWidget: React.FC = () => {
  const [cityId, setCityId] = useState("2996944");
  const { location } = useGetLocation();

  // Load the widget script when the component mounts
  useEffect(() => {
    async function setCity() {
      if (location && location.latitude && location.longitude) {
        const data = await fetch("/api/getCity", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(location)
        });
        console.log("data front", data);
        const city = await data.json();
        console.log("city", city);
      }
    }
    setCity();
  }, [location]);

  useEffect(() => {
    const loadWidgetScript = () => {
      const script = document.createElement("script");
      script.async = true;
      script.charset = "utf-8";
      script.src =
        "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
      const s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(script, s);
    };

    window.myWidgetParam ? window.myWidgetParam : (window.myWidgetParam = []);
    window.myWidgetParam.push({
      id: 11,
      cityid: cityId,
      appid: "384a078aa3f4476abff1343ce1e25ca9",
      units: "metric",
      containerid: "openweathermap-widget-11"
    });

    loadWidgetScript();
  }, [cityId]);

  return (
    <>
      <Script src="//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/d3.min.js"></Script>
      <div id="openweathermap-widget-11" className="w-full"></div>
    </>
  );
};

export default WeatherWidget;

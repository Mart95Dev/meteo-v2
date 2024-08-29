import React, { useState, useEffect } from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

export default function IconAnimation() {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const icons = [
    <WiDaySunny key="sunny" />,
    <WiCloudy key="cloudy" />,
    <WiRain key="rain" />,
    <WiSnow key="snow" />,
    <WiThunderstorm key="thunderstorm" />,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [icons.length]);

  return (
    <div className="icon-animation-container">{icons[currentIconIndex]}</div>
  );
}

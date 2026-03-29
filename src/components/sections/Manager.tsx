"use client";
import Project from "./ui/Project";
import Team from "./ui/Team";
import OpenMeteoWeather from "./ui/Weather";

const Manager = () => {
  return (
    <div className="flex">
      <div className="w-2/3">
        <div className="h-24 w-full flex justify-between p-2">
          {/* Left: Welcome + Location */}
          <div className="flex w-1/2 flex-col">
            <h2 className="text-2xl font-semibold text-gray-800">
              Welcome, John Doe 👋
            </h2>
            <p className="text-gray-500 text-sm mt-1">📍 Mumbai</p>
          </div>
          <OpenMeteoWeather latitude={12.02} longitude={75.5} city="Mumbai" />
        </div>
        <Project />
      </div>
      <div className="w-1/3 p-2 ">
        <Team />
      </div>
    </div>
  );
};

export default Manager;

"use client";

import { LocationSelectProps } from "@/utils/locationInterface";
import React, { useState } from "react";
import { IoMdArrowDropleft } from "react-icons/io";

const LocationSelect: React.FC<LocationSelectProps> = ({
  locations,
  selectedCity,
  onChange,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="mb-4 w-full">
      <label
        htmlFor="location-select"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Choose a location
      </label>
      <div className="relative mt-2">
        <select
          id="location-select"
          value={selectedCity}
          onChange={(e) => onChange(e.target.value)}
          onMouseEnter={() => setIsHovered(true)} // Activer sur survol
          onMouseLeave={() => setIsHovered(false)} // Désactiver sur survol
          className="relative w-full cursor-pointer rounded-md bg-white py-2 px-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
        >
          {locations.map((location, idx) => (
            <option key={idx} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          {isHovered ? (
            <IoMdArrowDropleft className="h-5 w-5 text-gray-400" />
          ) : null}
        </span>
      </div>
    </div>
  );
};

export default LocationSelect;

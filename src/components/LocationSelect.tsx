import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropleft } from "react-icons/io";
import { Location, LocationSelectProps } from "@/utils/locationInterface";

const LocationSelect: React.FC<LocationSelectProps> = ({
  locations,
  selectedCity,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (city: string) => {
    onChange(city);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Bouton pour déclencher le dropdown */}
      <button
        className="flex items-center justify-between h-10 px-3 w-full border border-gray-400 focus:outline-none bg-white rounded-md cursor-pointer"
        onClick={toggleDropdown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="text-sm leading-none">{selectedCity}</span>
        {/* Changement d'icône en fonction du hover */}
        {isHovered ? (
          <IoMdArrowDropleft className="h-5 w-5 text-gray-600" />
        ) : (
          <IoMdArrowDropdown className="h-5 w-5 text-gray-600" />
        )}
      </button>

      {/* Menu Dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 border border-gray-400 bg-white shadow-lg rounded-md">
          <div className="max-h-40 overflow-y-auto"> {/* Ajout de max-height et overflow */}
            {locations.map((location: Location, idx) => (
              <a
                key={idx}
                className="flex items-center h-8 px-3 text-sm hover:bg-blue-300 cursor-pointer"
                onClick={() => handleSelect(location.name)}
              >
                {location.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelect;

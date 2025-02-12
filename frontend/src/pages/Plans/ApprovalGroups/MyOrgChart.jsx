import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import { FaPuzzlePiece, FaLocationDot, FaBriefcase } from "react-icons/fa6";
import { IoIosArrowDropdownCircle } from "react-icons/io";

function MyOrgChart() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null); // Ref for the button

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      // Check button too!
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside); // Use mousedown
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownItemClick = (event) => {
    event.preventDefault();
    console.log("Clicked:", event.target.textContent);
    setIsDropdownOpen(false);
  };

  return (
    <div className="page-content">
      <div className="row">
        <div className="col-4">
          <div className="card">
            <div className="row">
              <div className="col-3 bg-fill">
                <FaPuzzlePiece />
              </div>
              <div className="col-9 p-0 border-2">
                <div className="content">
                  <div className="content-main">
                    <a href="#" title="Compliance Group">
                      Compliance Group
                    </a>
                    <div className="info">
                      <div>
                        <IoIosArrowDropdownCircle />1
                      </div>
                      <div>
                        <FaLocationDot />0
                      </div>
                      <div>
                        <FaBriefcase />0
                      </div>
                    </div>
                  </div>
                  <button onClick={toggleDropdown} className="dropdown-button">
                    &#8226;&#8226;&#8226;
                  </button>
                  {isDropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="dropdown-content2 dropdown-content absolute z-10 bg-white border rounded shadow-lg"
                      style={{ right: 0, top: "100%" }}
                    >
                      <a
                        href="#" 
                        className="dropdown-item2 dropdown-item block text-gray-700 hover:bg-gray-100"
                        onClick={handleDropdownItemClick} // Add the click handler
                      >
                        Edit
                      </a>
                      <a
                        href="#"
                        className="dropdown-item2 dropdown-item block text-gray-700 hover:bg-gray-100"
                        onClick={handleDropdownItemClick}
                      >
                        New Child
                      </a>
                      <a
                        href="#"
                        className="dropdown-item2 dropdown-item block text-danger hover:bg-gray-100"
                        onClick={handleDropdownItemClick}
                      >
                        Delete
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyOrgChart;

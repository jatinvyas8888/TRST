import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  IoMdArrowDropdown,
  IoMdArrowDropright,
  IoMdAttach,
} from "react-icons/io";
import { TiPlus } from "react-icons/ti";
import { FaTableColumns, FaFilter, FaRegTrashCan } from "react-icons/fa6";
import { GrDetach } from "react-icons/gr";
import { BiSolidEdit } from "react-icons/bi";
import { ImCopy } from "react-icons/im";
import { LuRefreshCw } from "react-icons/lu";
import { HiDotsHorizontal } from "react-icons/hi";
import ApplicationSection from "./ApplicationSection";
const PlanSection = () => {
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [isPlanColumnOpen, setIsPlanColumnOpen] = useState(false);

  const togglePlanDropDown = () => setIsPlanOpen(!isPlanOpen);
  const togglePlanColumnDropDown = () =>
    setIsPlanColumnOpen(!isPlanColumnOpen);


  const [selectedApplicationIds, setSelectedApplicationIds] = useState([]);
  
  const handleSelectedApplications = (ids) => {
    console.log("Selected IDs from ApplicationSection:", ids);
    setSelectedApplicationIds(ids);
  };
  
  return (
    <div className="main-content2 pt-3">
      <div className="d-flex align-items-center justify-content-between">
        {/* Left Section */}
        <div className="d-flex align-items-center">
          <span className="header-title">Plans</span>

          {/* Plans Dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle border-radius-2"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded={isPlanOpen}
              onClick={togglePlanDropDown}
            >
              All Plans
              <IoMdArrowDropdown className="hw-20" />
            </button>
            <ul
              className={`dropdown-menu ${isPlanOpen ? "show" : ""}`}
              aria-labelledby="dropdownMenuButton"
              style={{
                "--vz-dropdown-min-width": "15rem",
                "--vz-dropdown-font-size": "14px",
              }}
            >
              <li>
                <a className="dropdown-item" href="#">
                  <TiPlus className="mb-2px hw-15" /> Create New View
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <IoMdArrowDropright className="hw-20" /> All Plans
                  <BiSolidEdit className="hw-15 ml-20px" />
                  <FaTableColumns className="hw-15 ml-5px" />
                  <ImCopy className="hw-15 ml-5px" />
                </a>
              </li>
              <li><a className="dropdown-item" href="#">All Business Continuity Plans</a></li>
              <li><a className="dropdown-item" href="#">All Disaster Recovery Plans</a></li>
              <li><a className="dropdown-item" href="#">My Plans</a></li>
              <li><a className="dropdown-item" href="#">Update Frequency</a></li>
              <li><a className="dropdown-item" href="#">Plan Scorecard</a></li>
              <li><a className="dropdown-item" href="#">All Plans - Exercise</a></li>
              <li><a className="dropdown-item" href="#">Plan Templates</a></li>
              <li><a className="dropdown-item" href="#">IT User View</a></li>
              <li><a className="dropdown-item" href="#">All Expired Plans</a></li>
              <li><a className="dropdown-item" href="#">All Plans - Chart Only</a></li>
            </ul>
          </div>

          {/* Refresh Button */}
          <button className="button border-1 ms-1">
            <LuRefreshCw className="hw-18" />
          </button>

          {/* Column Dropdown */}
          <span className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
              type="button"
              id="TollFropdown"
              data-bs-toggle="dropdown"
              aria-expanded={isPlanColumnOpen}
              onClick={togglePlanColumnDropDown}
            >
              <FaTableColumns className="hw-14" />
            </button>
            <ul
              className={`dropdown-menu ${isPlanColumnOpen ? "show" : ""}`}
              aria-labelledby="TollFropdown"
              style={{
                "--vz-dropdown-min-width": "15rem",
                "--vz-dropdown-font-size": "14px",
              }}
            >
              <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                <span className="fw-bold">Columns</span>{" "}
                <a className="blue">Reset</a>
              </li>
              {[
                "Plan Name",
                "Status",
                "Plan Type",
                "Plan Editor(s)",
                "Plan Leader",
                "Next Update Date",
              ].map((label, idx) => (
                <li className="dropdown-checkbox" key={idx}>
                  <label>
                    <input type="checkbox" className="ms-2 me-1" /> {label}
                  </label>
                </li>
              ))}
            </ul>
          </span>

          {/* Filter Button */}
          <button className="button border-1 ms-1">
            <FaFilter className="hw-15" />
          </button>
        </div>

        {/* Right Section */}
        <div>
          <button className="button border-1 ms-1" title="Attach Employee">
            <IoMdAttach className="hw-20" />
          </button>
          <button className="button border-1 ms-1" title="Detach Employee">
            <GrDetach className="hw-20" />
          </button>
          <NavLink className="button1 border-1" to="/plan">
            <TiPlus className="hw-20" /> Plan
          </NavLink>
          <button className="button border-1 ms-1">
            <FaRegTrashCan className="hw-18" />
          </button>
          <button className="button border-1 ms-1">
            <HiDotsHorizontal className="hw-20" />
          </button>
        </div>
      </div>

      <div className="border-1 mt-2 mb-2"></div>
       <ApplicationSection setSelectedApplicationIds={handleSelectedApplications} />
    </div>
  );
};

export default PlanSection;

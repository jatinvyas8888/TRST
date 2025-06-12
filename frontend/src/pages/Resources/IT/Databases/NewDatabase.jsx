import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaPrint, FaRegFilePdf } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaCircleQuestion } from "react-icons/fa6";
import "./Databases.css";
import { BiSearchAlt2 } from "react-icons/bi";
import DatabaseOwnerModal from "./DatabaseOwnerModal";
import ApplicationModal from "./ApplicationModal";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Alert,
  Spinner,
} from "reactstrap";
import { TiPlus } from "react-icons/ti";

function NewDatabase() {
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isTimeZoneOpen, setIsTimeZoneOpen] = useState(false); // Time Zone dropdown
  const [isStatusOpen, setIsStatusOpen] = useState(false); // Employee Status dropdown

  const [isHostelOpen, setIsHostelOpen] = useState(false); // Employee Status dropdown

  const [selectedStatus, setSelectedStatus] = useState("-- Please select --");
  const statusOptions = ["-- Please select --", "DB2", "Mongo DB", "MySQL", "Oracle", "Teradata", "SQL"];
  //databaseowner modal
  const [databaseOwner, setDatabaseOwner] = useState([]);
    const [databaseOwnerNames, setDatabaseOwnerNames] = useState(""); // Stores selected names
    const [showDatabaseOwnerModal, setShowDatabaseOwnerModal] = useState(false);
      // Application Modal State
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [selectedApplicationNames, setSelectedApplicationNames] = useState("");


  const [selectedHostel, setSelectedHostel] = useState("-- Please select --");
  const hostelOptions = ["-- Please select --",
    
    "Other",
     "Internal",
    "External"];
  const toggleStatusDropdown = () => setIsStatusOpen((prev) => !prev);
  const toggleHostelDropdown = () => setIsHostelOpen((prev) => !prev);

  const toggleToolDropDown = () => setIsToolOpen(!isToolOpen);
  const handleSelectStatus = (option) => {
    setSelectedStatus(option);
    setIsStatusOpen(false);
  };
  const handleSelecthostel = (option) => {
    setSelectedHostel(option);
    setIsHostelOpen(false);
  };
  const [isDROpen, setIsDROpen] = useState(false);
  const [isRTOpen, setIsRTOpen] = useState(false);
  const [selectedDR, setSelectedDR] = useState("-- Please select --");
  const [selectedRTO, setSelectedRTO] = useState("-- Please select --");
  const DROptions = [
    "-- Please select --",
    "Active/Active",
    "Active/Standby",
    "Manual Restore",
    "Other"
  ];
  const RTOOptions = ["-- Please select --", 
      
      "15Mins", "1 Hours", "0.5 Hours","2Hrs","3Hrs","4Hrs","6Hrs"];
  const toggleDRDropdown = () => setIsDROpen((prev) => !prev);
  const toggleRTODropdown = () => setIsRTOpen((prev) => !prev);
  const handleSelectDR = (option) => {
    setSelectedDR(option);
    setIsDROpen(false);
  };
  const handleSelectRTO = (option) => {
    setSelectedRTO(option);
    setIsRTOpen(false);
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>New Database Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Database: New Database </div>
            <div className="d-flex align-items-center justify-content-end">
              <div>
                <NavLink
                  className="button3 border-1 button3-changes me-1"
                  to="/databases"
                  title="Cancel"
                >
                  <RxCross2
                    className="me-1"
                    style={{ width: "15px", height: "15px" }}
                  />
                  Cancel
                </NavLink>
                <NavLink
                  className="button3 border-1 button3-changes me-1"
                  to=""
                  title="Save"
                >
                  Save & New
                </NavLink>
                <NavLink className="button3 border-1 me-3" to="#" title="Save">
                  <FaCheck
                    className="me-1"
                    style={{ width: "15px", height: "15px" }}
                  />
                  Save
                </NavLink>
              </div>
              <div
                className="map-action k-widget k-button-group order-1"
                id="map-action-toggle"
                role="group"
              >
                <span className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                    type="button"
                    id="TollFropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded={isToolOpen}
                    onClick={toggleToolDropDown}
                  >
                    <HiMiniWrench className="hw-16" />
                  </button>
                  <ul
                    className={`right-auto dropdown-menu  ${
                      isToolOpen ? "show" : ""
                    }`}
                    aria-labelledby="TollFropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        <BiSolidEdit className="hw-15" /> Design this page
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <FcSettings className="hw-15" /> Object Definition
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <LuTableOfContents className="hw-15" /> Tab Definition
                      </a>
                    </li>
                    <div className="border-1"></div>
                    <li>
                      <a className="dropdown-item" href="#">
                        <FaPrint className="hw-15" /> Print
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <FaRegFilePdf className="hw-15" /> PDF
                      </a>
                    </li>
                    <div className="border-1"></div>
                    <li>
                      <a className="dropdown-item" href="#">
                        <LuClock9 className="hw-15" /> Page Load Time
                      </a>
                    </li>
                  </ul>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="form-content">
          <div className="form-heading">Database Information </div>
          <div className="border-1"></div>
          <Form>
            <div className="row pt-4">
              <div className="col-6">
                {[" Database Name"].map((label, index) => (
                  <div className="mb-3 d-flex align-items-center" key={index}>
                    <Label
                      htmlFor={label}
                      className="form-label me-2 fs-15 w-40"
                    >
                      {label}
                      <span class="text-danger">*</span>
                    </Label>
                    <Input name="text" className="form-control" type="text" />
                  </div>
                ))}
                {["Database ID"].map((label, index) => (
                  <div className="mb-3 d-flex align-items-center" key={index}>
                    <Label
                      htmlFor={label}
                      className="form-label me-2 fs-15 w-40"
                    >
                      {label}
                    </Label>
                    <Input name="text" className="form-control" type="text" />
                  </div>
                ))}
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="applicationType"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Type
                  </Label>
                  <div className="dropdown-container position-relative flex-grow-1 w-100">
                    <button
                      onClick={toggleStatusDropdown}
                      className="form-control text-start d-flex justify-content-between align-items-center"
                      type="button"
                    >
                      <span>{selectedStatus}</span>
                      <svg
                        className={`ms-2 ${isStatusOpen ? "rotate-180" : ""}`}
                        style={{ width: "12px", height: "12px" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isStatusOpen && (
                      <div
                        className="position-absolute w-100 mt-1 bg-white border rounded dropdown-menu1"
                        style={{ zIndex: 1000 }}
                      >
                        {statusOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelectStatus(option)}
                            className="dropdown-item w-100 text-start py-2 px-3"
                            type="button"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {["Version"].map((label, index) => (
                  <div className="mb-3 d-flex align-items-center" key={index}>
                    <Label
                      htmlFor={label}
                      className="form-label me-2 fs-15 w-40"
                    >
                      {label}
                    </Label>
                    <Input name="text" className="form-control" type="text" />
                  </div>
                ))}
                <div className="mb-3 d-flex">
                  <label
                    htmlFor="editors"
                    className="form-label fs-15 w-20 me-2"
                  >
                    Database Owner(s)
                  </label>
                  <div
                    className="form-control1 d-flex flex-wrap gap-2"
                    style={{
                      minHeight: "38px",
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      backgroundColor: "#fff",
                    }}

                  >
                    {databaseOwnerNames} 
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary border-radius-2"

                  >
                    <BiSearchAlt2 className="fs-15"
                     onClick={() => setShowDatabaseOwnerModal(true)}  />
                  </button>
                </div>
                {["Description"].map((label, index) => (
                  <div className="mb-3 d-flex align-items-center" key={index}>
                    <Label
                      htmlFor={label}
                      className="form-label me-2 fs-15 w-40"
                    >
                      {label}
                      <span class="text-danger">*</span>
                    </Label>
                    <textarea
                      name="text"
                      className="form-control"
                      type="text"
                    />
                  </div>
                ))}
              </div>
              <div className="col-6">
                {/* DR Strategy Dropdown */}
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="drStrategy"
                    className="form-label me-2 fs-15 w-40"
                  >
                    DR Strategy
                  </Label>
                  <div className="dropdown-container position-relative flex-grow-1 w-100">
                    <button
                      onClick={toggleDRDropdown}
                      className="form-control text-start d-flex justify-content-between align-items-center"
                      type="button"
                    >
                      <span>{selectedDR}</span>
                      <svg
                        className={`ms-2 ${isDROpen ? "rotate-180" : ""}`}
                        style={{ width: "12px", height: "12px" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isDROpen && (
                      <div
                        className="position-absolute w-100 mt-1 bg-white border rounded dropdown-menu1"
                        style={{ zIndex: 1000 }}
                      >
                        {DROptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelectDR(option)}
                            className="dropdown-item w-100 text-start py-2 px-3"
                            type="button"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* Hosted Type Dropdown */}
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="hostedType"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Hosted Type
                  </Label>
                  <div className="dropdown-container position-relative flex-grow-1 w-100">
                    <button
                      onClick={toggleHostelDropdown} // Fix: Use correct toggle function
                      className="form-control text-start d-flex justify-content-between align-items-center"
                      type="button"
                    >
                      <span>{selectedHostel}</span>{" "}
                      {/* Fix: Use correct state */}
                      <svg
                        className={`ms-2 ${isHostelOpen ? "rotate-180" : ""}`}
                        style={{ width: "12px", height: "12px" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isHostelOpen && (
                      <div
                        className="position-absolute w-100 mt-1 bg-white border rounded dropdown-menu1"
                        style={{ zIndex: 1000 }}
                      >
                        {hostelOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelecthostel(option)}
                            className="dropdown-item w-100 text-start py-2 px-3"
                            type="button"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {["End Point Address"].map((label, index) => (
                  <div className="mb-3 d-flex align-items-center" key={index}>
                    <Label
                      htmlFor={label}
                      className="form-label me-2 fs-15 w-40"
                    >
                      {label}
                    </Label>
                    <Input name="text" className="form-control" type="text" />
                  </div>
                ))}
                {/* RTO Dropdown */}
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="rto" className="form-label me-2 fs-15 w-40">
                    RTO
                  </Label>
                  <div className="dropdown-container position-relative flex-grow-1 w-100">
                    <button
                      onClick={toggleRTODropdown}
                      className="form-control text-start d-flex justify-content-between align-items-center"
                      type="button"
                    >
                      <span>{selectedRTO}</span>
                      <svg
                        className={`ms-2 ${isRTOpen ? "rotate-180" : ""}`}
                        style={{ width: "12px", height: "12px" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isRTOpen && (
                      <div
                        className="position-absolute w-100 mt-1 bg-white border rounded dropdown-menu1"
                        style={{ zIndex: 1000 }}
                      >
                        {RTOOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelectRTO(option)}
                            className="dropdown-item w-100 text-start py-2 px-3"
                            type="button"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
        <div className="form-content">
          <div className="form-heading">Dependencies </div>
          <div className="border-1"></div>
          <Form>
            <div className="row pt-4">
              <div className="col-8">
                     {/* Applications Section */}
              <div className="mb-3 d-flex">
                <label htmlFor="applications" className="form-label">
                  Applications
                </label>
                <div
                  className="form-control1 d-flex flex-wrap gap-2"
                  style={{
                    minHeight: "38px",
                    border: "1px solid #ced4da",
                    borderRadius: "5px",
                    padding: "8px",
                    backgroundColor: "#fff",
                  }}
                >
                  {selectedApplicationNames}
                </div>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => setShowApplicationModal(true)}
                >
                  <BiSearchAlt2 className="fs-15" />
                </button>
              </div>
                <div className="mb-3 d-flex">
                  <label
                    htmlFor="editors"
                    className="form-label fs-15 w-20 me-2"
                  >
                   Hardware
                  </label>
                  <div
                    className="form-control1 d-flex flex-wrap gap-2"
                    style={{
                      minHeight: "38px",
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      backgroundColor: "#fff",
                    }}
                  ></div>
                  <button
                    type="button"
                    className="btn btn-secondary border-radius-2"
                  >
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
         
      </div>

      {/* databaseowner */}
        <DatabaseOwnerModal
        isOpen={showDatabaseOwnerModal}
        toggle={() => setShowDatabaseOwnerModal(false)}
        onSelect={(ownerData) => {
          setDatabaseOwner(ownerData.ids); // Store selected IDs
          setDatabaseOwnerNames(ownerData.names); // Display selected names
        }}
      />
      {/* Application Modal */}
      <ApplicationModal
        isOpen={showApplicationModal}
        toggle={() => setShowApplicationModal(false)}
        onSelect={(appData) => {
          setSelectedApplications(appData.ids); 
          setSelectedApplicationNames(appData.names);
        }}
      />
    
       
    


    </React.Fragment>
  );
}

export default NewDatabase;

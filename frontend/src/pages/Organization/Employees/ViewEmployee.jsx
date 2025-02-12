import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import {
  IoMdArrowDropdown,
  IoMdArrowDropright,
  IoMdAttach,
  IoMdArrowRoundBack,
  IoMdArrowRoundForward,
} from "react-icons/io";
import { SiConvertio, SiRclone } from "react-icons/si";
import { LuRefreshCw, LuTableOfContents, LuClock9 } from "react-icons/lu";
import {
  FaPrint,
  FaPencil,
  FaRegTrashCan,
  FaTableColumns,
  FaPlus,
  FaFileExport,
} from "react-icons/fa6";
import {
  FaRegFilePdf,
  FaTag,
  FaFilter,
  FaSearch,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdMessage, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { TiPlus, TiArrowBack } from "react-icons/ti";
import { ImCopy } from "react-icons/im";
import { HiDotsHorizontal, HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiMenuAlt } from "react-icons/tfi";
import { GrDetach } from "react-icons/gr";
import { PiExportFill } from "react-icons/pi";

function ViewEmployee() {
  const [key, setKey] = useState("Employee Info");
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [isExerciseOpen, setIsExerciseOpen] = useState(false);
  const toggleExerciseDropdown = () => {
    setIsExerciseOpen(!isExerciseOpen);
  };
  const [isIncidentOpen, setIsIncidentOpen] = useState(false);
  const toggleIncidentDropdown = () => {
    setIsIncidentOpen(!isIncidentOpen);
  };

  const toggleExerciseColumnDropDown = () => {
    setIsExerciseOpen(!isExerciseOpen);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false); // More descriptive name

  const toggleMenu = () => {
    // More descriptive name
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleToolDropDown = () => {
    setIsToolOpen(!isToolOpen);
  };
  const ColumnDropDown = () => {
    setIsColumnOpen(!isColumnOpen);
  };

  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const togglePlanDropDown = () => {
    setIsPlanOpen(!isPlanOpen);
  };

  const [isPlanColumnOpen, setIsPlanColumnOpen] = useState(false);
  const togglePlanColumnDropDown = () => {
    setIsPlanColumnOpen(!isPlanColumnOpen);
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>Employee Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex mb-3">
            <div className="header-text pe-2">Employee:</div>
            <div className="header-text">Abdullah Gaylani</div>
          </div>
          <div className="d-flex justify-content-end">
            <div className="button5 me-1">
              <TiArrowBack />
            </div>
            <div className="button5">
              <IoMdArrowRoundBack />
            </div>
            <div className="button5 me-1">
              <IoMdArrowRoundForward />
            </div>
            <div className="button4 me-1">
              <FaPencil />
            </div>

            <div
              className="map-action k-widget k-button-group order-1"
              id="map-action-toggle"
              data-role="buttongroup"
              role="group"
            >
              <span className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded={isMenuOpen}
                  onClick={toggleMenu}
                >
                  <HiOutlineDotsHorizontal className="wh-16" />{" "}
                </button>
                <ul
                  className={`right-auto dropdown-menu ${
                    isMenuOpen ? "show" : ""
                  }`}
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      <RiDeleteBin6Line className="hw-15 mr-5px" />
                      Delete
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <FaTag className="hw-15 mr-5px" />
                      Tag
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <SiConvertio className="hw-15 mr-5px" />
                      Convert
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <SiRclone className="hw-15 mr-5px" />
                      Clone
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <MdMessage className="hw-15 mr-5px" />
                      Send
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <FaSearch className="hw-15 mr-5px" />
                      Find Duplicates
                    </a>
                  </li>
                </ul>
              </span>
            </div>
            <div
              className="map-action k-widget k-button-group order-1"
              id="map-action-toggle"
              data-role="buttongroup"
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
                  <HiMiniWrench className="wh-16" />
                </button>
                <ul
                  className={`right-auto dropdown-menu ${
                    isToolOpen ? "show" : ""
                  }`}
                  aria-labelledby="TollFropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      <BiSolidEdit className="hw-15 mr-5px" />
                      Design this page
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <FcSettings className="hw-15 mr-5px" />
                      Object Definition
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <LuTableOfContents className="hw-15 mr-5px" />
                      tab Definition
                    </a>
                  </li>
                  <div className="border-1"></div>
                  <li>
                    <a className="dropdown-item" href="#">
                      <FaPrint className="hw-15 mr-5px" />
                      Print
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <FaRegFilePdf className="hw-15 mr-5px" />
                      PDF
                    </a>
                    <div className="border-1"></div>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <LuClock9 className="hw-15 mr-5px" />
                      Page Load Time
                    </a>
                  </li>
                </ul>
              </span>
            </div>
          </div>
        </div>
        <Tabs
          id="Employee Info"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="Employee Info" title="Employee Info">
            <div className="container-fluid">
              <div className="form-content">
                <div className="form-heading">Work Contact Information</div>{" "}
                <div className="border-1 mb-3"></div>
                <div className="row">
                  <div className="col-6">
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Employee ID</div>
                      <div className="tab-title">3133</div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">First Name</div>
                      <div className="tab-title">Abdullah</div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Middle Name</div>
                      <div className="tab-title"></div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Last Name</div>
                      <div className="tab-title">Gaylani</div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Preferred Name</div>
                      <div className="tab-title"></div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Title</div>
                      <div className="tab-title">
                        Treasury Middle Office Supervisor
                      </div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Time Zone</div>
                      <div className="tab-title"></div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Work Email Address</div>
                      <div className="tab-title">
                        <a href="" className="text-blue">
                          abdullah.gaylani_@qib.com.qa
                        </a>
                      </div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Work Phone</div>
                      <div className="tab-title">
                        <FaPhoneAlt className="text-primary" />
                        <a href="" className="text-blue">
                          4442
                        </a>
                      </div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Fax</div>
                      <div className="tab-title"></div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Work Mobile Phone</div>
                      <div className="tab-title">
                        <FaPhoneAlt className="text-primary" />
                        <a href="" className="text-blue">
                          4442
                        </a>
                      </div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Manager</div>
                      <div className="tab-title">
                        <a href="" className="text-blue">
                          Abdelillah Talbioui
                        </a>
                      </div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Subordinates</div>
                      <div className="tab-title"></div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Employee Status</div>
                      <div className="tab-title">Active</div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">User Account</div>
                      <div className="tab-title"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="form-content">
                <div className="form-heading">Organization</div>
                <div className="border-1 mb-3"></div>
                <div className="row">
                  <div className="col-6">
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Location</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Department</div>
                      <div className="tab-title">
                        <a href="" className="text-blue">
                          Treasury Middle Office & Market Risk
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="form-content">
                <div className="form-heading">Personal Contact Information</div>
                <div className="border-1 mb-3"></div>
                <div className="row">
                  <div className="col-6">
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Street Address 1</div>
                      <div className="tab-title"></div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Street Address 2</div>
                      <div className="tab-title"></div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">City</div>
                      <div className="tab-title"></div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">State/Province</div>
                      <div className="tab-title"></div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">ZIP/Postal Code</div>
                      <div className="tab-title"></div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Country</div>
                      <div className="tab-title">United States</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Personal Mobile Phone</div>
                      <div className="tab-title">
                        <FaPhoneAlt className="text-primary" />
                        <a href="" className="text-blue">
                          55686951
                        </a>
                      </div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Home Phone Number</div>
                      <div className="tab-title">
                        <FaPhoneAlt className="text-primary" />
                        <a href="" className="text-blue">
                          55686951
                        </a>
                      </div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Personal Email Address</div>
                      <div className="tab-title"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="form-content">
                <div className="form-heading">Portal Visitor</div>
                <div className="border-1 mb-3"></div>
                <div className="row">
                  <div className="col-6">
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Portal User</div>
                      <div className="tab-title">
                        <div className="button6">NO</div>
                      </div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Last Login</div>
                      <div className="tab-title"></div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Portal Login Name</div>
                      <div className="tab-title"></div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Workflow Status</div>
                      <div className="tab-title">Created</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-content2 pt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="header-title">WFH</span>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded={isPlanOpen}
                      onClick={togglePlanDropDown}
                    >
                      All WFH
                      <IoMdArrowDropdown className="hw-20" />
                    </button>
                    <ul
                      className={`dropdown-menu ${isPlanOpen ? "show" : ""}`}
                      aria-labelledby="dropdownMenuButton"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          <TiPlus className="mb-2px hw-15" />
                          Create New View
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <IoMdArrowDropright className="hw-20" />
                          All WFH
                          <BiSolidEdit className="hw-15 ml-20px" />
                          <FaTableColumns className="hw-15 ml-5px" />
                          <ImCopy className="hw-15 ml-5px" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button className="button border-1 ms-1">
                    <LuRefreshCw className="hw-18" />
                  </button>
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
                      className={`dropdown-menu ${
                        isPlanColumnOpen ? "show" : ""
                      }`}
                      aria-labelledby="TollFropdown"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                        <span className="fw-bold">Columns</span>{" "}
                        <a className="blue">Reset</a>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Staff ID
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Staff Email
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Desktop/Laptop
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          VPN Token
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Activity
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Priority Order
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Additional support required
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Comments
                        </label>
                      </li>
                    </ul>
                  </span>
                  <button className="button border-1 ms-1">
                    <FaFilter className="hw-15" />
                  </button>
                </div>
                <div>
                  <button
                    className="button border-1 ms-1"
                    title="Attach Employee"
                  >
                    <IoMdAttach className="hw-20" />
                  </button>
                  <button
                    className="button border-1 ms-1 me-1"
                    title="Detach Employee"
                  >
                    <GrDetach className="hw-20" />
                  </button>
                  <NavLink className="button1 border-1" to="/wfh">
                    <TiPlus className="hw-20" />
                    WFH
                  </NavLink>
                  <button className="button border-1 ms-1">
                    <FaPlus className="hw-18" />
                  </button>
                  <button className="button border-1 ms-1">
                    <FaRegTrashCan className="hw-18" />
                  </button>
                  <button className="button border-1 ms-1">
                    <PiExportFill className="hw-18" />
                  </button>
                  <button className="button border-1 ms-1">
                    <HiDotsHorizontal className="hw-20" />
                  </button>
                  <button className="button border-1 ms-1">
                    <MdOutlineKeyboardArrowDown className="hw-18" />
                  </button>
                </div>
              </div>
              <div className="border-1 mt-2 mb-2"></div>
            </div>
            <div className="main-content2 pt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="header-title">
                    BIA Equipment Dependencys
                  </span>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded={isOpen}
                      onClick={toggleDropdown}
                    >
                      Department Resource/Equipment Requirement
                      <IoMdArrowDropdown className="hw-20" />
                    </button>
                    <ul
                      className={`dropdown-menu ${isOpen ? "show" : ""}`}
                      aria-labelledby="dropdownMenuButton"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          <TiPlus className="mb-2px hw-15" />
                          Create New View
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <IoMdArrowDropright className="hw-20" />
                          Department Resource/Equipment Requirement
                          <BiSolidEdit className="hw-15 ml-20px" />
                          <FaTableColumns className="hw-15 ml-5px" />
                          <ImCopy className="hw-15 ml-5px" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button className="button border-1 ms-1">
                    <LuRefreshCw className="hw-18" />
                  </button>
                  <span className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                      type="button"
                      id="TollFropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded={isColumnOpen}
                      onClick={ColumnDropDown}
                    >
                      <FaTableColumns className="hw-14" />
                    </button>
                    <ul
                      className={`dropdown-menu ${isColumnOpen ? "show" : ""}`}
                      aria-labelledby="TollFropdown"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                        <span className="fw-bold">Columns</span>{" "}
                        <a className="blue">Reset</a>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          BIA Equipment Dependency
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Total # Required
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Comments
                        </label>
                      </li>
                    </ul>
                  </span>
                  <button className="button border-1 ms-1">
                    <FaFilter className="hw-15" />
                  </button>
                </div>
                <div>
                  <div>
                    <button
                      className="button border-1 ms-1"
                      title="Attach Employee"
                    >
                      <IoMdAttach className="hw-20" />
                    </button>
                    <button
                      className="button border-1 ms-1 me-1"
                      title="Detach Employee"
                    >
                      <GrDetach className="hw-20" />
                    </button>
                    <NavLink className="button1 border-1" to="/">
                      <TiPlus className="hw-20" />
                      BIA Equipment Dependency
                    </NavLink>
                    <button className="button border-1 ms-1">
                      <FaPlus className="hw-18" />
                    </button>
                    <button className="button border-1 ms-1">
                      <FaRegTrashCan className="hw-18" />
                    </button>
                    <button className="button border-1 ms-1">
                      <PiExportFill className="hw-18" />
                    </button>
                    <button className="button border-1 ms-1">
                      <HiDotsHorizontal className="hw-20" />
                    </button>
                    <button className="button border-1 ms-1">
                      <MdOutlineKeyboardArrowDown className="hw-18" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="border-1 mt-2 mb-2"></div>
            </div>
          </Tab>
          <Tab eventKey="Teams and Tasks" title="Teams and Tasks">
            <div className="main-content2 pt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="header-title">Team Assignments</span>
                  <button className="button border-1 ms-1">
                    <LuRefreshCw className="hw-18" />
                  </button>
                  <span className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                      type="button"
                      id="TollFropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded={isColumnOpen}
                      onClick={ColumnDropDown}
                    >
                      <FaTableColumns className="hw-14" />
                    </button>
                    <ul
                      className={`dropdown-menu ${isColumnOpen ? "show" : ""}`}
                      aria-labelledby="TollFropdown"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                        <span className="fw-bold">Columns</span>{" "}
                        <a className="blue">Reset</a>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Team
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Team Description
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Task Duration
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Updated At
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Updated By
                        </label>
                      </li>
                    </ul>
                  </span>
                  <button className="button border-1 ms-1">
                    <FaFilter className="hw-15" />
                  </button>
                </div>
                <div>
                  <button
                    className="button border-1 ms-1"
                    title="Attach Employee"
                  >
                    <IoMdAttach className="hw-20" />
                  </button>
                  <button
                    className="button border-1 ms-1 me-1"
                    title="Detach Employee"
                  >
                    <GrDetach className="hw-20" />
                  </button>
                  <NavLink className="button1 border-1" to="/team">
                    <TiPlus className="hw-20" />
                    Team
                  </NavLink>

                  <button className="button border-1 ms-1">
                    <FaRegTrashCan className="hw-18" />
                  </button>
                  <button className="button border-1 ms-1">
                    <FaFileExport className="hw-18" />
                  </button>
                  <button className="button border-1 ms-1">
                    <HiDotsHorizontal className="hw-20" />
                  </button>
                </div>
              </div>
              <div className="border-1 mt-2 mb-2"></div>
              <div className="main-content2 pt-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <span className="header-title">Task Assignments</span>
                    <button className="button border-1 ms-1">
                      <LuRefreshCw className="hw-18" />
                    </button>
                    <span className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                        type="button"
                        id="TollFropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded={isExerciseOpen}
                        onClick={toggleExerciseColumnDropDown}
                      >
                        <FaTableColumns className="hw-14" />
                      </button>
                      <ul
                        className={`dropdown-menu ${
                          isExerciseOpen ? "show" : ""
                        }`}
                        aria-labelledby="TollFropdown"
                        style={{
                          "--vz-dropdown-min-width": "15rem",
                          "--vz-dropdown-font-size": "14px;",
                        }}
                      >
                        <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                          <span className="fw-bold">Columns</span>{" "}
                          <a className="blue">Reset</a>
                        </li>
                        <li class="dropdown-checkbox">
                          <label>
                            <input type="checkbox" className="ms-2 me-1" />
                            Task
                          </label>
                        </li>
                        <li class="dropdown-checkbox">
                          <label>
                            <input type="checkbox" className="ms-2 me-1" />
                            Description
                          </label>
                        </li>
                        <li class="dropdown-checkbox">
                          <label>
                            <input type="checkbox" className="ms-2 me-1" />
                            Duration Time
                          </label>
                        </li>
                        <li class="dropdown-checkbox">
                          <label>
                            <input type="checkbox" className="ms-2 me-1" />
                            Time Units
                          </label>
                        </li>
                        <li class="dropdown-checkbox">
                          <label>
                            <input type="checkbox" className="ms-2 me-1" />
                            Updated At
                          </label>
                        </li>
                        <li class="dropdown-checkbox">
                          <label>
                            <input type="checkbox" className="ms-2 me-1" />
                            Updated By
                          </label>
                        </li>
                      </ul>
                    </span>
                    <button className="button border-1 ms-1">
                      <FaFilter className="hw-15" />
                    </button>
                  </div>
                  <div>
                    <button className="button border-1 ms-1">
                      <FaRegTrashCan className="hw-18" />
                    </button>
                    <button className="button border-1 ms-1">
                      <FaFileExport className="hw-18" />
                    </button>
                    <button className="button border-1 ms-1">
                      <HiDotsHorizontal className="hw-20" />
                    </button>
                  </div>
                </div>
                <div className="border-1 mt-2 mb-2"></div>
              </div>
              <div className="main-content2 pt-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <span className="header-title">Call Trees</span>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle border-radius-2"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded={isPlanOpen}
                        onClick={togglePlanDropDown}
                      >
                        All Call Trees
                        <IoMdArrowDropdown className="hw-20" />
                      </button>
                      <ul
                        className={`dropdown-menu ${isPlanOpen ? "show" : ""}`}
                        aria-labelledby="dropdownMenuButton"
                        style={{
                          "--vz-dropdown-min-width": "15rem",
                          "--vz-dropdown-font-size": "14px;",
                        }}
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            <TiPlus className="mb-2px hw-15" />
                            Create New View
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <IoMdArrowDropright className="hw-20" />
                            All Call Trees
                            <BiSolidEdit className="hw-15 ml-20px" />
                            <FaTableColumns className="hw-15 ml-5px" />
                            <ImCopy className="hw-15 ml-5px" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <button className="button border-1 ms-1">
                      <LuRefreshCw className="hw-18" />
                    </button>
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
                        className={`dropdown-menu ${
                          isPlanColumnOpen ? "show" : ""
                        }`}
                        aria-labelledby="TollFropdown"
                        style={{
                          "--vz-dropdown-min-width": "15rem",
                          "--vz-dropdown-font-size": "14px;",
                        }}
                      >
                        <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                          <span className="fw-bold">Columns</span>{" "}
                          <a className="blue">Reset</a>
                        </li>
                        <li class="dropdown-checkbox">
                          <label>
                            <input type="checkbox" className="ms-2 me-1" />
                            Call Tree
                          </label>
                        </li>
                        <li class="dropdown-checkbox">
                          <label>
                            <input type="checkbox" className="ms-2 me-1" />
                            People in Call Tree
                          </label>
                        </li>
                        <li class="dropdown-checkbox">
                          <label>
                            <input type="checkbox" className="ms-2 me-1" />
                            Updated At
                          </label>
                        </li>
                        <li class="dropdown-checkbox">
                          <label>
                            <input type="checkbox" className="ms-2 me-1" />
                            Updated By
                          </label>
                        </li>
                      </ul>
                    </span>
                    <button className="button border-1 ms-1">
                      <FaFilter className="hw-15" />
                    </button>
                  </div>
                  <div>
                    <button
                      className="button border-1 ms-1"
                      title="Attach Employee"
                    >
                      <IoMdAttach className="hw-20" />
                    </button>
                    <button
                      className="button border-1 ms-1 me-1"
                      title="Detach Employee"
                    >
                      <GrDetach className="hw-20" />
                    </button>
                    <NavLink className="button1 border-1" to="/call-tree ">
                      <TiPlus className="hw-20" />
                      Call Tree
                    </NavLink>

                    <button className="button border-1 ms-1">
                      <FaRegTrashCan className="hw-18" />
                    </button>
                    <button className="button border-1 ms-1">
                      <FaFileExport className="hw-18" />
                    </button>
                    <button className="button border-1 ms-1">
                      <HiDotsHorizontal className="hw-20" />
                    </button>
                    <button className="button border-1 ms-1">
                      <MdOutlineKeyboardArrowDown className="hw-18" />
                    </button>
                  </div>
                </div>
                <div className="border-1 mt-2 mb-2"></div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="Communication Log" title="Communication Log">
            <div className="main-content2 pt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="header-title">Communication Log</span>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded={isOpen}
                      onClick={toggleDropdown}
                    >
                      All Communication Log
                      <IoMdArrowDropdown className="hw-20" />
                    </button>
                    <ul
                      className={`dropdown-menu ${isOpen ? "show" : ""}`}
                      aria-labelledby="dropdownMenuButton"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          <TiPlus className="mb-2px hw-15" />
                          Create New View
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <IoMdArrowDropright className="hw-20" />
                          All Communication Log
                          <BiSolidEdit className="hw-15 ml-20px" />
                          <FaTableColumns className="hw-15 ml-5px" />
                          <ImCopy className="hw-15 ml-5px" />
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          All Communication Logs
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          All Communication Logs (No Summary)
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Communications Today
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Communications Today - Sales Only
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          All Communication Logs - Mobile Email
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Communications Today
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button className="button border-1 ms-1">
                    <LuRefreshCw className="hw-18" />
                  </button>
                  <span className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                      type="button"
                      id="TollFropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded={isColumnOpen}
                      onClick={ColumnDropDown}
                    >
                      <FaTableColumns className="hw-14" />
                    </button>
                    <ul
                      className={`dropdown-menu ${isColumnOpen ? "show" : ""}`}
                      aria-labelledby="TollFropdown"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                        <span className="fw-bold">Columns</span>{" "}
                        <a className="blue">Reset</a>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Subject
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Type
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Sent Date
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          To
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Updated At
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Updated By
                        </label>
                      </li>
                    </ul>
                  </span>
                  <button className="button border-1 ms-1">
                    <FaFilter className="hw-15" />
                  </button>
                </div>
                <div>
                  <button
                    className="button border-1 ms-1"
                    title="Attach Employee"
                  >
                    <IoMdAttach className="hw-20" />
                  </button>
                  <button
                    className="button border-1 ms-1 me-1"
                    title="Detach Employee"
                  >
                    <GrDetach className="hw-20" />
                  </button>
                  <NavLink className="button1 border-1" to="/location ">
                    <TiPlus className="hw-20" />
                    Location
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
            </div>
          </Tab>
          <Tab eventKey="Relationships" title="Relationships">
            <div className="main-content2 pt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="header-title">Teams</span>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded={isPlanOpen}
                      onClick={togglePlanDropDown}
                    >
                      All Teams
                      <IoMdArrowDropdown className="hw-20" />
                    </button>
                    <ul
                      className={`dropdown-menu ${isPlanOpen ? "show" : ""}`}
                      aria-labelledby="dropdownMenuButton"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          <TiPlus className="mb-2px hw-15" />
                          Create New View
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <IoMdArrowDropright className="hw-20" />
                          All Teams
                          <BiSolidEdit className="hw-15 ml-20px" />
                          <FaTableColumns className="hw-15 ml-5px" />
                          <ImCopy className="hw-15 ml-5px" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button className="button border-1 ms-1">
                    <LuRefreshCw className="hw-18" />
                  </button>
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
                      className={`dropdown-menu ${
                        isPlanColumnOpen ? "show" : ""
                      }`}
                      aria-labelledby="TollFropdown"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                        <span className="fw-bold">Columns</span>{" "}
                        <a className="blue">Reset</a>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Team
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Team Type
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Team Members
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Task Duration
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Updated At
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Updated By
                        </label>
                      </li>
                    </ul>
                  </span>
                  <button className="button border-1 ms-1">
                    <FaFilter className="hw-15" />
                  </button>
                </div>
                <div>
                  <button className="button border-1 ms-1">
                    <FaRegTrashCan className="hw-18" />
                  </button>
                  <button className="button border-1 ms-1">
                    <FaFileExport className="hw-18" />
                  </button>
                  <button className="button border-1 ms-1">
                    <HiDotsHorizontal className="hw-20" />
                  </button>
                  <button className="button border-1 ms-1">
                    <MdOutlineKeyboardArrowDown className="hw-18" />
                  </button>
                </div>
              </div>
              <div className="border-1 mt-2 mb-2"></div>
            </div>
            <div className="main-content2 pt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="header-title">Exercises</span>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded={isOpen}
                      onClick={toggleDropdown}
                    >
                      All Exercises
                      <IoMdArrowDropdown className="hw-20" />
                    </button>
                    <ul
                      className={`dropdown-menu ${isOpen ? "show" : ""}`}
                      aria-labelledby="dropdownMenuButton"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          <TiPlus className="mb-2px hw-15" />
                          Create New View
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <IoMdArrowDropright className="hw-20" />
                          All Exercises
                          <BiSolidEdit className="hw-15 ml-20px" />
                          <FaTableColumns className="hw-15 ml-5px" />
                          <ImCopy className="hw-15 ml-5px" />
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          My Exercises
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Active Exercises
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Active Exercises (Portal)
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button className="button border-1 ms-1">
                    <LuRefreshCw className="hw-18" />
                  </button>
                  <span className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                      type="button"
                      id="TollFropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded={isColumnOpen}
                      onClick={ColumnDropDown}
                    >
                      <FaTableColumns className="hw-14" />
                    </button>
                    <ul
                      className={`dropdown-menu ${isColumnOpen ? "show" : ""}`}
                      aria-labelledby="TollFropdown"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                        <span className="fw-bold">Columns</span>{" "}
                        <a className="blue">Reset</a>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Exercise Name
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Status
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Start Date/Time
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          End Date/Time
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Updated At
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Updated By
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Created At
                        </label>
                      </li>
                    </ul>
                  </span>
                  <button className="button border-1 ms-1">
                    <FaFilter className="hw-15" />
                  </button>
                </div>
                <div>
                  <button className="button border-1 ms-1">
                    <FaRegTrashCan className="hw-18" />
                  </button>
                  <button className="button border-1 ms-1">
                    <FaFileExport className="hw-18" />
                  </button>
                  <button className="button border-1 ms-1">
                    <HiDotsHorizontal className="hw-20" />
                  </button>
                  <button className="button border-1 ms-1">
                    <MdOutlineKeyboardArrowDown className="hw-18" />
                  </button>
                </div>
              </div>
              <div className="border-1 mt-2 mb-2"></div>
            </div>
            <div className="main-content2 pt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="header-title">Risks</span>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded={isIncidentOpen}
                      onClick={toggleIncidentDropdown}
                    >
                      All Risks
                      <IoMdArrowDropdown className="hw-20" />
                    </button>
                    <ul
                      className={`dropdown-menu ${
                        isIncidentOpen ? "show" : ""
                      }`}
                      aria-labelledby="dropdownMenuButton"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          <TiPlus className="mb-2px hw-15" />
                          Create New View
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <IoMdArrowDropright className="hw-20" />
                          All Risks
                          <BiSolidEdit className="hw-15 ml-20px" />
                          <FaTableColumns className="hw-15 ml-5px" />
                          <ImCopy className="hw-15 ml-5px" />
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Unmitigated Risk
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Unassigned Risk
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Financial Impact vs Mitigation Costs
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button className="button border-1 ms-1">
                    <LuRefreshCw className="hw-18" />
                  </button>
                  <span className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                      type="button"
                      id="TollFropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded={isExerciseOpen}
                      onClick={toggleExerciseColumnDropDown}
                    >
                      <FaTableColumns className="hw-14" />
                    </button>
                    <ul
                      className={`dropdown-menu ${
                        isExerciseOpen ? "show" : ""
                      }`}
                      aria-labelledby="TollFropdown"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                        <span className="fw-bold">Columns</span>{" "}
                        <a className="blue">Reset</a>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Risk Name
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Risk Type
                        </label>
                      </li>

                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Risk Owner
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Impact
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Likelihood
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Inherent Risk
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Mitigation Percentage
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Residual Risk
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Total Mitigation Cost
                        </label>
                      </li>
                    </ul>
                  </span>
                  <button className="button border-1 ms-1">
                    <FaFilter className="hw-15" />
                  </button>
                </div>
                <div>
                  <button className="button border-1 ms-1">
                    <FaRegTrashCan className="hw-18" />
                  </button>
                  <button className="button border-1 ms-1">
                    <FaFileExport className="hw-18" />
                  </button>
                  <button className="button border-1 ms-1">
                    <HiDotsHorizontal className="hw-20" />
                  </button>
                  <button className="button border-1 ms-1">
                    <MdOutlineKeyboardArrowDown className="hw-18" />
                  </button>
                </div>
              </div>
              <div className="border-1 mt-2 mb-2"></div>
            </div>
          </Tab>
          <Tab eventKey="System Info" title="System Info">
            <div className="container-fluid">
              <div className="form-content">
                <div className="form-heading">System Information</div>{" "}
                <div className="border-1 mb-3"></div>
                <div className="row">
                  <div className="col-6">
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Created By</div>
                      <div className="tab-title">
                        <a href="" className="text-blue">
                          Maaz Khan
                        </a>
                      </div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Updated By</div>
                      <div className="tab-title">
                        <a href="" className="text-blue">
                          Maaz Khan
                        </a>
                      </div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Tags</div>
                      <div className="tab-title"></div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">GDPR Report</div>
                      <div className="tab-title">
                        <a href="" className="text-blue">
                          GDPR Report
                        </a>
                      </div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Termination Date</div>
                      <div className="tab-title"></div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Created At</div>
                      <div className="tab-title">07/24/2023, 1:55 PM</div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Updated At</div>
                      <div className="tab-title">07/24/2023, 2:02 PM</div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">ID</div>
                      <div className="tab-title">142595113</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="form-content ">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="form-heading">Audit Trail</div>
                  <div className="d-flex align-items-center justify-content-end">
                    <button className="button border-1 ms-1" title="Show All">
                      <TfiMenuAlt className="hw-20" />
                    </button>
                    <button className="button border-1 ms-1" title="Refresh">
                      <LuRefreshCw className="hw-18" />
                    </button>
                    <button className="button border-1 ms-1">
                      <MdOutlineKeyboardArrowDown className="hw-20" />
                    </button>
                  </div>
                </div>
                <div className="border-1 mb-3"></div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>{" "}
    </React.Fragment>
  );
}

export default ViewEmployee;

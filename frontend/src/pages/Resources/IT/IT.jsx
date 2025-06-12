import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, NavLink } from "react-router-dom";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { LuRefreshCw, LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaPrint } from "react-icons/fa6";
import { FaHome, FaFilter, FaRegFilePdf } from "react-icons/fa";
import { TiExport, TiPlus } from "react-icons/ti";
import { FaRegTrashCan, FaTableColumns } from "react-icons/fa6";
import { ImCopy } from "react-icons/im";
import { HiDotsHorizontal } from "react-icons/hi";
import "./IT.css";

function IT() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [applications, setApplications] = useState([
    {
      applicationID: '1',
      applicationName: 'App One',
      applicationType: 'Type A',
      hostedType: 'Cloud',
      applicationAlias: 'Alias One',
      applicationURL: 'http://appone.com',
      description: 'Description for App One',
      applicationOwner: 'Owner One',
      businessOwner: 'Business Owner One',
      applicationVendor: 'Vendor One',
      businessEntity: 'Entity One',
      rto: '24 hours',
      drStrategy: 'Strategy One',
      primaryDataCenter: 'Data Center One',
    },
    {
      applicationID: '2',
      applicationName: 'App Two',
      applicationType: 'Type B',
      hostedType: 'On-Premise',
      applicationAlias: 'Alias Two',
      applicationURL: 'http://apptwo.com',
      description: 'Description for App Two',
      applicationOwner: 'Owner Two',
      businessOwner: 'Business Owner Two',
      applicationVendor: 'Vendor Two',
      businessEntity: 'Entity Two',
      rto: '48 hours',
      drStrategy: 'Strategy Two',
      primaryDataCenter: 'Data Center Two',
    },
    {
      applicationID: '3',
      applicationName: 'App Three',
      applicationType: 'Type C',
      hostedType: 'Hybrid',
      applicationAlias: 'Alias Three',
      applicationURL: 'http://appthree.com',
      description: 'Description for App Three',
      applicationOwner: 'Owner Three',
      businessOwner: 'Business Owner Three',
      applicationVendor: 'Vendor Three',
      businessEntity: 'Entity Three',
      rto: '72 hours',
      drStrategy: 'Strategy Three',
      primaryDataCenter: 'Data Center Three',
    },
    {
      applicationID: '4',
      applicationName: 'App Four',
      applicationType: 'Type D',
      hostedType: 'Cloud',
      applicationAlias: 'Alias Four',
      applicationURL: 'http://appfour.com',
      description: 'Description for App Four',
      applicationOwner: 'Owner Four',
      businessOwner: 'Business Owner Four',
      applicationVendor: 'Vendor Four',
      businessEntity: 'Entity Four',
      rto: '96 hours',
      drStrategy: 'Strategy Four',
      primaryDataCenter: 'Data Center Four',
    },
    {
      applicationID: '5',
      applicationName: 'App Five',
      applicationType: 'Type E',
      hostedType: 'On-Premise',
      applicationAlias: 'Alias Five',
      applicationURL: 'http://appfive.com',
      description: 'Description for App Five',
      applicationOwner: 'Owner Five',
      businessOwner: 'Business Owner Five',
      applicationVendor: 'Vendor Five',
      businessEntity: 'Entity Five',
      rto: '120 hours',
      drStrategy: 'Strategy Five',
      primaryDataCenter: 'Data Center Five',
    },
  ]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleToolDropDown = () => {
    setIsToolOpen(!isToolOpen);
  };

  const ColumnDropDown = () => {
    setIsColumnOpen(!isColumnOpen);
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleEdit = (id) => {
    console.log("Edit item with ID:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete item with ID:", id);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>IT Applications Page | TRST</title>
        <meta name="description" content="This is the IT applications page description" />
        <meta name="keywords" content="IT, applications, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">IT Applications</div>
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
                      Tab Definition
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
        <div className="main-content2 pt-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <span className="header-title">IT Applications</span>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-2"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded={isOpen}
                  onClick={toggleDropdown}
                >
                  All IT Applications <IoMdArrowDropdown className="hw-20" />
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
                      All IT Applications{" "}
                      <BiSolidEdit className="hw-15 ml-20px" />
                      <FaTableColumns className="hw-15 ml-5px" />
                      <ImCopy className="hw-15 ml-5px" />
                    </a>
                  </li>
                  <span className="ms-1">Select Another View...</span>
                  <li>
                    <a className="dropdown-item" href="#">
                      Export Only
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Data Migration
                    </a>
                  </li>
                </ul>
              </div>
              <button className="button border-1 ms-1">
                <FaHome className="hw-15" />
              </button>
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
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Application Name{" "}
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Application Type{" "}
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Hosted Type{" "}
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Application Alias{" "}
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Application URL{" "}
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Description{" "}
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Application Owner{" "}
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Business Owner{" "}
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Application Vendor{" "}
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Business Entity{" "}
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      RTO{" "}
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      DR Strategy{" "}
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Primary Data Center{" "}
                    </label>
                  </li>
                </ul>
              </span>
              <button className="button border-1 ms-1">
                <FaFilter className="hw-15" />
              </button>
            </div>
            <div>
              <NavLink className="button1 border-1" to="/new-application">
                <TiPlus className="hw-20" />
                Application
              </NavLink>
              <button className="button border-1 ms-1">
                <FaRegTrashCan className="hw-18" />
              </button>
              <button className="button border-1 ms-1">
                <TiExport className="hw-20" />
              </button>
              <button className="button border-1 ms-1">
                <HiDotsHorizontal className="hw-20" />
              </button>
            </div>
          </div>
          <div className="border-1 mt-2 mb-2"></div>
        </div>
        <div className="table-responsive">
          <h3>Applications Records</h3>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setCheckedItems(isChecked ? applications.map(app => app.applicationID) : []);
                    }}
                    checked={checkedItems.length === applications.length}
                  />
                </th>
                <th>Actions</th>
                <th>Application Name</th>
                <th>Application Type</th>
                <th>Hosted Type</th>
                <th>Application Alias</th>
                <th>Application URL</th>
                <th>Description</th>
                <th>Application Owner</th>
                <th>Business Owner</th>
                <th>Application Vendor</th>
                <th>Business Entity</th>
                <th>RTO</th>
                <th>DR Strategy</th>
                <th>Primary Data Center</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.applicationID}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkedItems.includes(app.applicationID)}
                      onChange={() => handleCheckboxChange(app.applicationID)}
                    />
                  </td>
                  <td>
                    {/* <div style={{ gap: "10px" }} className="d-flex align-items-center">
                      <button onClick={() => handleEdit(app.applicationID)} className="btn btn-sm btn-link">Edit</button>
                      <button onClick={() => handleDelete(app.applicationID)} className="btn btn-sm btn-link text-danger">Delete</button>
                    </div> */}
                     <div style={{ gap: "10px" }} className="d-flex align-items-center">
                      <button onClick={() => handleEdit(record.id)} className="btn btn-sm btn-link">
                        <BiSolidEdit className="hw-15" />
                      </button>
                      <button onClick={() => handleDelete(record.id)} className="btn btn-sm btn-link text-danger">
                        <FaRegTrashCan className="hw-15" />
                      </button>
                    </div>
                  </td>
                  <td>{app.applicationName}</td>
                  <td>{app.applicationType}</td>
                  <td>{app.hostedType}</td>
                  <td>{app.applicationAlias}</td>
                  <td>{app.applicationURL}</td>
                  <td>{app.description}</td>
                  <td>{app.applicationOwner}</td>
                  <td>{app.businessOwner}</td>
                  <td>{app.applicationVendor}</td>
                  <td>{app.businessEntity}</td>
                  <td>{app.rto}</td>
                  <td>{app.drStrategy}</td>
                  <td>{app.primaryDataCenter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default IT;
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
import "./Hardware.css";

function Hardware() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleToolDropDown = () => {
    setIsToolOpen(!isToolOpen);
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
        <title>Hardware Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Hardware</div>
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
              <span className="header-title">Hardware</span>
              <button className="button border-1 ms-1">
                <FaHome className="hw-15" />
              </button>
              <button className="button border-1 ms-1">
                <LuRefreshCw className="hw-18" />
              </button>
              <button className="button border-1 ms-1">
                <FaFilter className="hw-15" />
              </button>
            </div>
            <div>
              <NavLink className="button1 border-1" to="/new-hardware">
                <TiPlus className="hw-20" />
                Hardware
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
          <h3>Hardware Records</h3>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setCheckedItems(isChecked ? ['1', '2', '3', '4', '5'] : []);
                    }}
                    checked={checkedItems.length === 5}
                  />
                </th>
                <th>Actions</th>
                <th>Hardware Name</th>
                <th>Hardware Type</th>
                <th>Serial Number</th>
                <th>Model</th>
                <th>Operating System</th>
                <th>Hardware ID</th>
                <th>Owner</th>
                <th>Memory (GB)</th>
                <th>Warranty Expiration</th>
                <th>Description</th>
                <th>Location</th>
                <th>Lowest Application RTO</th>
                <th>Parent Hardware</th>
                <th>Child Hardware</th>
                <th>Vendor</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '1', name: 'Server 1', type: 'Rack', serial: 'SN001', model: 'Model A', os: 'Linux', hardwareId: 'HW001', owner: 'Owner A', memory: '32', warranty: '2025-12-31', description: 'First server', location: 'Data Center 1', rto: '1 hour', parent: 'None', child: 'None', vendor: 'Vendor A', cost: '$2000' },
                { id: '2', name: 'Server 2', type: 'Blade', serial: 'SN002', model: 'Model B', os: 'Windows', hardwareId: 'HW002', owner: 'Owner B', memory: '64', warranty: '2026-06-30', description: 'Second server', location: 'Data Center 2', rto: '2 hours', parent: 'None', child: 'None', vendor: 'Vendor B', cost: '$3000' },
                { id: '3', name: 'Workstation 1', type: 'Desktop', serial: 'SN003', model: 'Model C', os: 'Windows', hardwareId: 'HW003', owner: 'Owner C', memory: '16', warranty: '2024-03-15', description: 'First workstation', location: 'Office 1', rto: '30 minutes', parent: 'None', child: 'None', vendor: 'Vendor C', cost: '$1500' },
                { id: '4', name: 'Workstation 2', type: 'Desktop', serial: 'SN004', model: 'Model D', os: 'Linux', hardwareId: 'HW004', owner: 'Owner D', memory: '32', warranty: '2025-11-20', description: 'Second workstation', location: 'Office 2', rto: '1 hour', parent: 'None', child: 'None', vendor: 'Vendor D', cost: '$1600' },
                { id: '5', name: 'Router 1', type: 'Network', serial: 'SN005', model: 'Model E', os: 'N/A', hardwareId: 'HW005', owner: 'Owner E', memory: 'N/A', warranty: '2023-09-10', description: 'First router', location: 'Data Center 1', rto: '5 minutes', parent: 'None', child: 'None', vendor: 'Vendor E', cost: '$500' },
              ].map((record) => (
                <tr key={record.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkedItems.includes(record.id)}
                      onChange={() => handleCheckboxChange(record.id)}
                    />
                  </td>
                  <td>
                    <div style={{ gap: "10px" }} className="d-flex align-items-center">
                      <button onClick={() => handleEdit(record.id)} className="btn btn-sm btn-link">
                        <BiSolidEdit className="hw-15" />
                      </button>
                      <button onClick={() => handleDelete(record.id)} className="btn btn-sm btn-link text-danger">
                        <FaRegTrashCan className="hw-15" />
                      </button>
                    </div>
                  </td>
                  <td>{record.name}</td>
                  <td>{record.type}</td>
                  <td>{record.serial}</td>
                  <td>{record.model}</td>
                  <td>{record.os}</td>
                  <td>{record.hardwareId}</td>
                  <td>{record.owner}</td>
                  <td>{record.memory}</td>
                  <td>{record.warranty}</td>
                  <td>{record.description}</td>
                  <td>{record.location}</td>
                  <td>{record.rto}</td>
                  <td>{record.parent}</td>
                  <td>{record.child}</td>
                  <td>{record.vendor}</td>
                  <td>{record.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Hardware;
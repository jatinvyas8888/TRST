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
import "./Databases.css";

function Databases() {
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
        <title>Databases Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Databases</div>
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
              <span className="header-title">Databases</span>
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
              <NavLink className="button1 border-1" to="/new-database">
                <TiPlus className="hw-20" />
                Database
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
          <h3>Database Records</h3>
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
                <th>Database Name*</th>
                <th>DR Strategy</th>
                <th>Hosted Type</th>
                <th>End Point Address</th>
                <th>RTO</th>
                <th>Database ID</th>
                <th>Type</th>
                <th>Version</th>
                <th>Database Owner(s)</th>
                <th>Description*</th>
                <th>Applications</th>
                <th>Hardware</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '1', name: 'Database 1', drStrategy: 'Backup', hosted: 'Cloud', endpoint: 'http://db1.com', rto: '1 hour', dbId: 'DB001', type: 'SQL', version: '1.0', owners: 'Owner A', description: 'First database', applications: 'App 1, App 2', hardware: 'Server 1' },
                { id: '2', name: 'Database 2', drStrategy: 'Replication', hosted: 'On-Premise', endpoint: 'http://db2.com', rto: '2 hours', dbId: 'DB002', type: 'NoSQL', version: '2.0', owners: 'Owner B', description: 'Second database', applications: 'App 3', hardware: 'Server 2' },
                { id: '3', name: 'Database 3', drStrategy: 'Snapshot', hosted: 'Cloud', endpoint: 'http://db3.com', rto: '30 minutes', dbId: 'DB003', type: 'SQL', version: '1.5', owners: 'Owner C', description: 'Third database', applications: 'App 4', hardware: 'Server 3' },
                { id: '4', name: 'Database 4', drStrategy: 'None', hosted: 'On-Premise', endpoint: 'http://db4.com', rto: '4 hours', dbId: 'DB004', type: 'SQL', version: '3.0', owners: 'Owner D', description: 'Fourth database', applications: 'App 5', hardware: 'Server 4' },
                { id: '5', name: 'Database 5', drStrategy: 'Backup', hosted: 'Cloud', endpoint: 'http://db5.com', rto: '1 hour', dbId: 'DB005', type: 'NoSQL', version: '2.5', owners: 'Owner E', description: 'Fifth database', applications: 'App 6', hardware: 'Server 5' },
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
                  <td>{record.drStrategy}</td>
                  <td>{record.hosted}</td>
                  <td>{record.endpoint}</td>
                  <td>{record.rto}</td>
                  <td>{record.dbId}</td>
                  <td>{record.type}</td>
                  <td>{record.version}</td>
                  <td>{record.owners}</td>
                  <td>{record.description}</td>
                  <td>{record.applications}</td>
                  <td>{record.hardware}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Databases;
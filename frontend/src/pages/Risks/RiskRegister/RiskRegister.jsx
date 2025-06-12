import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, NavLink } from "react-router-dom";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { LuRefreshCw, LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaPrint, FaFilter, FaRegFilePdf, FaRegTrashCan, FaTableColumns } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { TiExport, TiPlus } from "react-icons/ti";
import { ImCopy } from "react-icons/im";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiEdit } from "react-icons/ci"; 
import { RiDeleteBin6Line } from "react-icons/ri";
import Toastify from "toastify-js";

function RiskRegister() {
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [riskRegisters, setRiskRegisters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false); // State for select all checkbox

  const [columns, setColumns] = useState([
    { id: "riskName", label: "Risk Name", draggable: true },
    { id: "riskType", label: "Risk Type", draggable: true },
    { id: "riskOwners", label: "Risk Owners", draggable: true },
    { id: "description", label: "Description", draggable: true },
    { id: "financialImpact", label: "Financial Impact", draggable: true },
    { id: "actualClosureDate", label: "Actual Closure Date", draggable: true },
    { id: "likelihood", label: "Likelihood", draggable: true },
    { id: "impact", label: "Impact", draggable: true },
    { id: "processes", label: "Processes", draggable: true },
    { id: "hardware", label: "Hardware", draggable: true },
    { id: "applications", label: "Applications", draggable: true },
    { id: "updatedAt", label: "Updated At", draggable: true },
  ]);

  const [visibleColumns, setVisibleColumns] = useState({
    riskName: true,
    riskType: true,
    riskOwners: true,
    description: true,
    financialImpact: true,
    actualClosureDate: true,
    likelihood: true,
    impact: true,
    processes: true,
    hardware: true,
    applications: true,
    updatedAt: true,
  });

  const [draggedColumn, setDraggedColumn] = useState(null);

  // Column handlers
  const handleColumnToggle = (columnId) => {
    setVisibleColumns(prev => ({ ...prev, [columnId]: !prev[columnId] }));
  };

  const resetColumns = () => {
    setVisibleColumns({
      riskName: true,
      riskType: true,
      riskOwners: true,
      description: true,
      financialImpact: true,
      actualClosureDate: true,
      likelihood: true,
      impact: true,
      processes: true,
      hardware: true,
      applications: true,
      updatedAt: true,
    });
  };

  // Drag and drop handlers
  const handleDragStart = (e, column) => {
    if (!column.draggable) return;
    setDraggedColumn(column);
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedColumn(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    if (!draggedColumn || !targetColumn.draggable) return;

    const newColumns = [...columns];
    const draggedIdx = columns.findIndex(col => col.id === draggedColumn.id);
    const targetIdx = columns.findIndex(col => col.id === targetColumn.id);

    newColumns.splice(draggedIdx, 1);
    newColumns.splice(targetIdx, 0, draggedColumn);

    setColumns(newColumns);
  };

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page
  };

  const paginatedRiskRegisters = riskRegisters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(riskRegisters.length / itemsPerPage);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleToolDropDown = () => {
    setIsToolOpen(!isToolOpen);
  };

  const ColumnDropDown = () => {
    setIsColumnOpen(!isColumnOpen);
  };

  const fetchRiskRegisters = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/risk-registers");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setRiskRegisters(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleRefresh = async () => {
    try {
      document.querySelector(".refresh-button").classList.add("rotate");
      await fetchRiskRegisters();
      Toastify({ text: "Data refreshed successfully!", duration: 3000, gravity: "top", position: "right", style: { background: "#28a745" } }).showToast();
    } catch {
      Toastify({ text: "Error refreshing data", duration: 3000, gravity: "top", position: "right", style: { background: "#dc3545" } }).showToast();
    } finally {
      setTimeout(() => document.querySelector(".refresh-button").classList.remove("rotate"), 500);
    }
  };

  // Handle select all checkbox change
  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setRiskRegisters(riskRegisters.map(register => ({ ...register, isSelected: !selectAll })));
  };

  // Handle individual checkbox change
  const handleCheckboxChange = (id) => {
    setRiskRegisters(riskRegisters.map(register => register._id === id ? { ...register, isSelected: !register.isSelected } : register));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Risk Register | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Risk Register</div>
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
                  className={`right-auto dropdown-menu ${isToolOpen ? "show" : ""}`}
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
        <div className="main-content2 pt-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <span className="header-title">Risks Register</span>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-2"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded={isOpen}
                  onClick={toggleDropdown}
                >
                  All Risks
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
                      All Applications
                      <BiSolidEdit className="hw-15 ml-20px" />
                      <FaTableColumns className="hw-15 ml-5px" />
                      <ImCopy className="hw-15 ml-5px" />
                    </a>
                  </li>
                  <span className="ms-1">Select Another View...</span>
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
                <FaHome className="hw-15" />
              </button>
              <button className="button border-1 ms-1 refresh-button" onClick={handleRefresh} title="Refresh data">
                <LuRefreshCw className="hw-18" />
              </button>
              <span className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                  type="button"
                  onClick={() => setIsColumnOpen(!isColumnOpen)}
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
                    <span className="fw-bold">Columns</span>
                    <a className="blue" onClick={resetColumns} style={{ cursor: 'pointer' }}>Reset</a>
                  </li>
                  {columns.filter(col => col.draggable).map(column => (
                    <li key={column.id} className="dropdown-checkbox">
                      <label>
                        <input
                          type="checkbox"
                          className="ms-2 me-1"
                          checked={visibleColumns[column.id]}
                          onChange={() => handleColumnToggle(column.id)}
                        />
                        {column.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </span>
              <button className="button border-1 ms-1">
                <FaFilter className="hw-15" />
              </button>
            </div>
            <div>
              <NavLink className="button1 border-1" to="/new-risk-register">
                <TiPlus className="hw-20" />
                Risk
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

          {/* Show loading and error messages */}
          {loading && <p>Loading data...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Display data in a table */}
          <div style={{ width: "100%", overflowX: "auto" }}>
            <div style={{ maxHeight: "500px", overflowY: "auto", border: "1px solid #ccc" }}>
              <table className="table table-bordered mt-3" style={{ minWidth: "2800px" }}>
                <thead>
                  <tr>
                    <th className="sticky-col">
                      <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} />
                    </th>
                    <th className="sticky-col" style={{ width: "10%", overflowX: "auto" }}>Action</th>
                    {columns.filter(col => visibleColumns[col.id]).map(column => (
                      <th
                        key={column.id}
                        style={{ width: column.width }}
                        draggable={column.draggable}
                        onDragStart={(e) => handleDragStart(e, column)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, column)}
                        onDragEnd={handleDragEnd}
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedRiskRegisters.length > 0 ? (
                    paginatedRiskRegisters.map((register) => (
                      <tr key={register._id}>
                        <td className="sticky-col">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={register.isSelected || false}
                            onChange={() => handleCheckboxChange(register._id)}
                          />
                        </td>
                        <td className="text-center">
                          <div className="d-flex align-items-center gap-2 justify-content-center">
                            <button className="btn btn-sm btn-link p-0" title="Edit">
                              <CiEdit style={{ cursor: "pointer", fontSize: "1.2em", color: "green" }} size={18} />
                            </button>
                            <button className="btn btn-sm btn-link p-0" title="Delete">
                              <RiDeleteBin6Line className="text-danger" size={18} />
                            </button>
                          </div>
                        </td>
                        {visibleColumns.riskName && <td>{register.riskName}</td>}
                        {visibleColumns.riskType && <td>{register.riskType}</td>}
                        {visibleColumns.riskOwners && <td>{register.riskOwners}</td>}
                        {visibleColumns.description && <td>{register.description}</td>}
                        {visibleColumns.financialImpact && <td>{register.financialImpact}</td>}
                        {visibleColumns.actualClosureDate && <td>{new Date(register.actualClosureDate).toLocaleDateString()}</td>}
                        {visibleColumns.likelihood && <td>{register.likelihood}</td>}
                        {visibleColumns.impact && <td>{register.impact}</td>}
                        {visibleColumns.processes && <td>{register.processes}</td>}
                        {visibleColumns.hardware && <td>{register.hardware}</td>}
                        {visibleColumns.applications && <td>{register.applications}</td>}
                        {visibleColumns.updatedAt && <td>{new Date(register.updatedAt).toLocaleDateString()}</td>}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="14" className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination controls */}
          {riskRegisters.length > itemsPerPage && (
            <div className="pagination-wrapper">
              <div className="d-flex align-items-center gap-3 p-2 justify-content-between">
                <div className="d-flex align-items-center">
                  <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  >{"<<"}</button>
                  <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >{"<"}</button>
                  <span className="mx-2">Page</span>
                  <input
                    type="text"
                    className="form-control page-input"
                    value={currentPage}
                    onChange={(e) => handlePageChange(Number(e.target.value))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handlePageChange(Number(e.target.value));
                      }
                    }}
                    onBlur={(e) => {
                      const page = Number(e.target.value);
                      if (page > 0 && page <= totalPages) {
                        handlePageChange(page);
                      }
                    }}
                  />
                  <span className="mx-2">of {totalPages}</span>
                  <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >{">"}</button>
                  <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  >{">>"}</button>
                </div>
                <div>
                  <span>Items per page:</span>
                  <select
                    className="form-select"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default RiskRegister;
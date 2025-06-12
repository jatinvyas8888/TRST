import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { TiPlus } from "react-icons/ti";
import { Table, Input } from "reactstrap";
import { FaHome, FaFilter } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { TbBrandTorchain } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import EmployeeModal from "./EmployeeModal";


const Employee = ({ setSelectedEmployeeIds }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [selectedEmployeeIds, setSelectedEmployeeIdsLocal] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // Handle Checkbox Selection
  const handleCheckboxChange = (e, employee) => {
    const isChecked = e.target.checked;

    setSelectedEmployeeIdsLocal((prev) => {
      const updatedIds = isChecked
        ? [...prev, employee._id]
        : prev.filter((id) => id !== employee._id);

      setSelectedEmployeeIds(updatedIds); // Pass updated IDs to parent
      return updatedIds;
    });

    setSelectedEmployees((prev) => {
      return isChecked
        ? [...prev, employee]
        : prev.filter((item) => item._id !== employee._id);
    });
  };

  return (
    <div className="form-content">
      <div className="form-heading d-flex justify-content-between align-items-center">
      <span style={{ textAlign: "left", display: "block", fontWeight: "500" }}>
        Employees
      </span>
        <button
           className="btn btn-outline-secondary toggle-btn"
           onClick={() => setIsOpen(!isOpen)}
           title={isOpen ? "Collapse Form" : "Expand Form"}
           style={{
             fontSize: "1.2rem",
             padding: "4px 10px",
             height: "36px",
             lineHeight: "1",
           }}
         >
           {isOpen ? "−" : <TiPlus />}
         </button>
      </div>
      <div className="border-1"></div>

      {isOpen && (
        <div>
          <div className="row pt-4">
            <div className="col-12">
              <div className="mb-3">
                <div className="maincontent">
                  <div className="main-content2 pt-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="header-title">Employee List</span>
                      <div className="d-flex align-items-center">
                      <div className="border-1"></div>
                      </div>
                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="button1 flex items-center gap-2"
                          onClick={() => setShowEmployeeModal(true)}
                        >
                          <TbBrandTorchain size={20} />
                        </button>
                        <NavLink className="button1 border-1" to="/new-employee">
                          <TiPlus className="hw-20" />
                          Employee
                        </NavLink>
                      </div>
                    </div>
                    <div className="border-1"></div>
                  </div>
                </div>

                {/* Table Display Logic */}
                {selectedEmployees.length > 0 ? (
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Select</th>
                        <th>Employee FirstName</th>
                        <th>Employee MiddleName</th>
                
                        <th>LastName</th>
                        <th>PreferredName</th>
                        <th>Title</th>
                        <th>TimeZone</th>
                        <th>WorkEmailAddress</th>
                        <th>WorkPhone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedEmployees.map((employee) => (
                        <tr key={employee._id}>
                          <td>
                            <Input
                              type="checkbox"
                              checked={selectedEmployeeIds.includes(employee._id)}
                              onChange={(e) => handleCheckboxChange(e, employee)}
                            />
                          </td>
                          <td>{employee.firstName || "N/A"}</td>
                          <td>{employee.middleName || "N/A"}</td>
                        
                          <td>{employee.lastName || "N/A"}</td>
                          <td>{employee.preferredName || "N/A"}</td>
                          <td>{employee.title || "N/A"}</td>
                          <td>{employee.timeZone || "N/A"}</td>
                          <td>{employee. workEmailAddress|| "N/A"}</td>
                          <td>{employee. workPhone|| "N/A"}</td>
                          
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <h3>No employee selected</h3>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Employee Modal Integration */}
      <EmployeeModal
        isOpen={showEmployeeModal}
        toggle={() => setShowEmployeeModal(false)}
        onSelect={(employees) => {
          console.log("📡 Received Employees:", employees || "❌ No employees received!");
          setSelectedEmployees(employees || []);
          setSelectedEmployeeIdsLocal(employees?.map((emp) => emp._id) || []);
          setSelectedEmployeeIds(employees?.map((emp) => emp._id) || []); // Update parent state
        }}
      />
    </div>
  );
};

export default Employee;
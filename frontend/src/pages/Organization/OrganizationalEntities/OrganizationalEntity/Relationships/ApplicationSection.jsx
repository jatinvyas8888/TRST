import React, { useState } from "react";
import { Table, Input } from "reactstrap";
import { TbBrandTorchain } from "react-icons/tb";
import ApplicationModal from "./ApplicationModal";
import { TiPlus } from "react-icons/ti";
import { FaHome, FaFilter, FaRegFilePdf } from "react-icons/fa";
import { LuRefreshCw, LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaTableColumns } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiExport } from "react-icons/ti";
import { HiDotsHorizontal } from "react-icons/hi";


const ApplicationSection = ({ setSelectedApplicationIds }) => {
    const [isOpen, setIsOpen] = useState(false);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [selectedApplicationIdsLocal, setSelectedApplicationIdsLocal] = useState([]);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const handleCheckboxChange = (e, application) => {
    const isChecked = e.target.checked;

    setSelectedApplicationIdsLocal((prev) => {
      const updatedIds = isChecked
        ? [...prev, application._id]
        : prev.filter((id) => id !== application._id);

      setSelectedApplicationIds(updatedIds); // update parent
      return updatedIds;
    });

    setSelectedApplications((prev) => {
      return isChecked
        ? [...prev, application]
        : prev.filter((item) => item._id !== application._id);
    });
  };

  return (

    <div className="form-content">
    <div className="form-heading d-flex justify-content-between align-items-center"
    >
      <span>Application</span>
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
                    <div className="d-flex align-items-center">
                     
                    </div>
                    <div className="d-flex align-items-center">
                    
                    </div>
                  </div>
                </div>



                <div className="main-content2 pt-3">
                                    <div className="d-flex align-items-center justify-content-between">
                    {/* Left Side - Locations List and Icons */}
                    <div className="d-flex align-items-center">
                      <span className="header-title me-2">Application List</span>

                      <button className="button border-1 me-1">
                        <FaHome className="hw-15" />
                      </button>
                      <button
                        className="button border-1 me-1"
                        style={{ border: 'none', cursor: 'pointer' }}
                      >
                        <LuRefreshCw className="hw-15" />
                      </button>
                      <button className="button border-1">
                        <FaFilter className="hw-15" />
                      </button>
                    </div>

                    {/* Right Side - Chain Button & Location Link */}
                    <div className="d-flex align-items-center">
                      <button
                        type="button"
                        className="button1 flex items-center gap-2 me-2"
                        onClick={() => setShowApplicationModal(true)}
                      >
                        <TbBrandTorchain size={20} />
                      </button>

                      <NavLink className="button1 border-1" to="/new-application">
                        <TiPlus className="hw-20" />
                        Application
                      </NavLink>
                    </div>
                  </div>
                                <div className="border-1"></div>
                              </div>
              </div>

              {/* Table Display Logic */}
              <Table bordered>
        <thead>
          <tr>
            <th>Select</th>
            <th>Application Name</th>
            <th>Application ID</th>
            <th>Application Type</th>
            <th>Application Alias</th>
            <th>Application URL</th>
            <th>Description</th>
            <th>HostedType</th>
            <th>DrStrategy</th>
            <th>Rto</th>
            <th>Rpo</th>
          </tr>
        </thead>
        <tbody>
          {selectedApplications.length > 0 ? (
            selectedApplications.map((app) => (
              <tr key={app._id}>
                <td>
                  <Input
                    type="checkbox"
                    checked={selectedApplicationIdsLocal.includes(app._id)}
                    onChange={(e) => handleCheckboxChange(e, app)}
                  />
                </td>
                <td>{app.applicationName || "N/A"}</td>
                <td>{app.applicationID || "N/A"}</td>
                <td>{app.applicationType || "N/A"}</td>
             
                <td>{app.applicationAlias || "N/A"}</td>
                <td>{app.applicationURL || "N/A"}</td>
                <td>{app.description || "N/A"}</td>
                <td>{app.hostedType || "N/A"}</td>
                <td>{app.drStrategy|| "N/A"}</td>
                <td>{app.rto || "N/A"}</td>
                <td>{app.rpo || "N/A"}</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No application selected</td>
            </tr>
          )}
        </tbody>
      </Table>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Application Modal Integration */}
    <ApplicationModal
  isOpen={showApplicationModal}
  toggle={() => setShowApplicationModal(false)}
  onSelect={(apps) => {
    console.log("Apps selected from modal:", apps); // ✅ DEBUG
    setSelectedApplications(apps || []);
    const ids = apps.map((a) => a._id);
    setSelectedApplicationIdsLocal(ids);
    setSelectedApplicationIds(ids); // 🔁 send to parent
  }}
/>
  </div>

   
  );
};

export default ApplicationSection;

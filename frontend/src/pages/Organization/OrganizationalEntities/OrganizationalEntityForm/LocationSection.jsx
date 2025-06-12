import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LocationModal from "./LocationModal";
import { TiPlus } from "react-icons/ti";
import { Table, Input } from "reactstrap"; // ✅ Added Input import
import { FaHome, FaFilter, FaRegFilePdf } from "react-icons/fa";
import { LuRefreshCw, LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaTableColumns } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { TbBrandTorchain } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiExport } from "react-icons/ti";
import { HiDotsHorizontal } from "react-icons/hi";



const LocationSection = ({ setSelectedLocationIds }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocationIds, setSelectedLocationIdsLocal] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  // Handle Checkbox Selection
  const handleCheckboxChange = (e, location) => {
    const isChecked = e.target.checked;

    setSelectedLocationIdsLocal((prev) => {
      const updatedIds = isChecked
        ? [...prev, location._id]
        : prev.filter((id) => id !== location._id);

      setSelectedLocationIds(updatedIds); // Pass updated IDs to parent
      return updatedIds;
    });

    setSelectedLocations((prev) => {
      return isChecked
        ? [...prev, location]
        : prev.filter((item) => item._id !== location._id);
    });
  };

  return (
    <div className="form-content">
      <div className="form-heading d-flex justify-content-between align-items-center"
      >
        <span>Locations</span>
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
                        <span className="header-title me-2">Locations List</span>

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
                          onClick={() => setShowLocationModal(true)}
                        >
                          <TbBrandTorchain size={20} />
                        </button>

                        <NavLink className="button1 border-1" to="/new-location">
                          <TiPlus className="hw-20" />
                          Location
                        </NavLink>
                      </div>
                    </div>
                                  <div className="border-1"></div>
                                </div>
                </div>

                {/* Table Display Logic */}
                {selectedLocations.length > 0 ? (
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Select</th>
                        <th> Location Name</th>
                        <th>locationId</th>
                        <th>capacity</th>
                        <th>capacityUsed</th>
                        <th>latitude</th>
                        <th>longitude</th>
                        <th>siteOwnership</th>
                        <th>Location Type</th>
                        <th>Main Phone</th>
                        <th>City</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedLocations.map((location) => (
                        <tr key={location._id}>
                          <td>
                            <Input
                              type="checkbox"
                              checked={selectedLocationIds.includes(location._id)}
                              onChange={(e) => handleCheckboxChange(e, location)}
                            />
                          </td>

                          <td>{location.locationName || "N/A"}</td>
                          <td>{location.locationId || "N/A"}</td>
                          <td>{location.capacity || "N/A"}</td>
                          <td>{location.capacityUsed || "N/A"}</td>
                          <td>{location.latitude || "N/A"}</td>
                          <td>{location.longitude || "N/A"}</td>
                          <td>{location.siteOwnership || "N/A"}</td>
                          <td>{location.locationType || "N/A"}</td>
                          <td>{location.mainPhone || "N/A"}</td>
                          <td>{location.city || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <h3>No location selected</h3>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location Modal Integration */}
      <LocationModal
        isOpen={showLocationModal}
        toggle={() => setShowLocationModal(false)}
        onSelect={(locations) => {
          console.log("📡 Received Locations:", locations || "❌ No locations received!");
          setSelectedLocations(locations || []);
          setSelectedLocationIdsLocal(locations?.map((loc) => loc._id) || []);
          setSelectedLocationIds(locations?.map((loc) => loc._id) || []); // Update parent state
        }}
      />
    </div>
  );
};

export default LocationSection;

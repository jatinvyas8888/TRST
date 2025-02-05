import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, NavLink } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
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
import "./Locations.css";
import LoadingSpinner from "../../../Components/Common/LoadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";

function Locations() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState(1);
  const itemsPerPage = 10;
  const [isLoadingCoordinates, setIsLoadingCoordinates] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { layoutMode } = useSelector(state => ({
    layoutMode: state.Layout.layoutMode
  }));

  // Calculate pagination values
  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const currentRows = locations.slice(indexOfFirstRow, indexOfLastRow);

  // Now useEffect can safely use currentRows
  useEffect(() => {
    console.log("Current locations:", locations);
    console.log("Current rows:", currentRows);
  }, [locations, currentRows]);

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      setIsLoadingCoordinates(true);
      try {
        const response = await fetch("http://localhost:8000/api/v1/locations/all", {
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        
        if (data.success) {
          const formattedLocations = data.data.map((location) => ({
            _id: location._id,
            id: location.locationId,
            locationName: location.locationName || '-',
            locationType: location.locationType || '-',
            streetAddress1: location.streetAddress1 || '-',
            streetAddress2: location.streetAddress2 || '-',
            city: location.city || '-',
            stateProvince: location.stateProvince || '-',
            zipPostalCode: location.zipPostalCode || '-',
            country: location.country || '-',
            mainPhone: location.mainPhone || '-',
            capacity: location.capacity || '-',
            capacityUsed: location.capacityUsed || '-',
            latitude: location.latitude || '-',
            longitude: location.longitude || '-'
          }));
          
          setLocations(formattedLocations);
          console.log("Fetched locations:", formattedLocations);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsLoading(false);
        setIsLoadingCoordinates(false);
      }
    };

    fetchLocations();
  }, []);

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
    setSelectedLocations((prev) => 
      prev.includes(id) ? prev.filter((locId) => locId !== id) : [...prev, id]
    );
  };

  const handleDelete = async (locationId) => {
    if (window.confirm(`Are you sure you want to delete this location?`)) {
      try {
        await fetch(`http://localhost:8000/api/v1/locations/${locationId}`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        // Refresh the list after deletion
        const updatedLocations = locations.filter(loc => loc._id !== locationId);
        setLocations(updatedLocations);
      } catch (error) {
        console.error("Error deleting location:", error);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedLocations.length === 0) return;

    if (window.confirm(`Are you sure you want to delete ${selectedLocations.length} selected item(s)?`)) {
      try {
        // Delete all selected locations
        await Promise.all(
          selectedLocations.map((id) =>
            fetch(`http://localhost:8000/api/v1/locations/${id}`, {
              method: "DELETE",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            })
          )
        );

        // Update the locations list by removing deleted items
        const updatedLocations = locations.filter(
          loc => !selectedLocations.includes(loc._id)
        );
        setLocations(updatedLocations);
        setSelectedLocations([]); // Clear selection after deletion
      } catch (error) {
        console.error("Error deleting locations:", error);
      }
    }
  };

  const handlePageInputChange = (e) => {
    const value = e.target.value;
    setPageInput(value);
    
    if (e.key === 'Enter' || e.type === 'blur') {
      const numValue = parseInt(value);
      const maxPage = Math.ceil(locations.length / itemsPerPage);
      
      if (value === '' || isNaN(numValue) || numValue < 1) {
        setCurrentPage(1);
        setPageInput(1);
      }
      else if (numValue > maxPage) {
        setCurrentPage(maxPage);
        setPageInput(maxPage);
      }
      else {
        setCurrentPage(numValue);
        setPageInput(numValue);
      }
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
    setPageInput(1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => {
      const newPage = prev - 1;
      setPageInput(newPage);
      return newPage;
    });
  };

  const handleNextPage = () => {
    setCurrentPage(prev => {
      const newPage = prev + 1;
      setPageInput(newPage);
      return newPage;
    });
  };

  const handleLastPage = () => {
    const lastPage = Math.ceil(locations.length / itemsPerPage);
    setCurrentPage(lastPage);
    setPageInput(lastPage);
  };

  // Add this function to get coordinates from address
  const getCoordinates = async (address) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_GOOGLE_API_KEY`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      }
      return null;
    } catch (error) {
      console.error('Error getting coordinates:', error);
      return null;
    }
  };

  // Add this function near your other functions
  const viewOnMap = (lat, lon) => {
    if (lat !== '-' && lon !== '-') {
      window.open(`https://www.google.com/maps?q=${lat},${lon}`, '_blank');
    }
  };

  return (
    <div className="page-content" data-bs-theme={layoutMode}>
      <Helmet>
        <title>Location Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="maincontent">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Locations</div>
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
        <div className="main-content2 pt-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <span className="header-title">Locations </span>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-2"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded={isOpen}
                  onClick={toggleDropdown}
                >
                  All Locations <IoMdArrowDropdown className="hw-20" />
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
                      All Locations <BiSolidEdit className="hw-15 ml-20px" />
                      <FaTableColumns className="hw-15 ml-5px" />
                      <ImCopy className="hw-15 ml-5px" />
                    </a>
                  </li>
                  <span className="ms-1">Select Another View...</span>
                  <li>
                    <a className="dropdown-item" href="#">
                      Locations with Addresses
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      All Locations (Longitude/Latitude)
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      For Export Only
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
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Location Name{" "}
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" /> Location
                      Type{" "}
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Street Address 1
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Street Address 2
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      City
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      State/Province
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Zip/Postal Code
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Country
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Main Phone
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Employee Count
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Capacity
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Capacity Used(%)
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Latitude
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Longitude
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      ID
                    </label>
                  </li>
                </ul>
              </span>
              <button className="button border-1 ms-1">
                <FaFilter className="hw-15" />
              </button>
            </div>
            <div>
              <NavLink className="button1 border-1" to="/new-location">
                <TiPlus className="hw-20" />
                Location
              </NavLink>
              <button 
                className="button border-1 ms-1"
                style={{
                  opacity: selectedLocations.length > 0 ? 1 : 0.5,
                  cursor: selectedLocations.length > 0 ? "pointer" : "default",
                }}
                onClick={handleBulkDelete}
                disabled={selectedLocations.length === 0}
              >
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
        </div>
      </div>
      <div className="border-1 mb-2 mt-2"></div>
      <div className="table-container">
        {locations.length > itemsPerPage && (
          <div className="pagination-wrapper">
            <div className="d-flex align-items-center gap-3 p-2 justify-content-between">
              <div className="d-flex align-items-center">
                <button 
                  className="btn btn-sm btn-outline-secondary" 
                  onClick={handleFirstPage}
                  disabled={currentPage === 1}
                >{"<<"}</button>
                <button 
                  className="btn btn-sm btn-outline-secondary" 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >{"<"}</button>
                <span className="mx-2">Page</span>
                <input
                  type="text"
                  className="form-control page-input"
                  value={pageInput}
                  onChange={handlePageInputChange}
                  onKeyDown={handlePageInputChange}
                  onBlur={handlePageInputChange}
                />
                <span className="mx-2">of {Math.ceil(locations.length / itemsPerPage)}</span>
                <button 
                  className="btn btn-sm btn-outline-secondary" 
                  onClick={handleNextPage}
                  disabled={currentPage === Math.ceil(locations.length / itemsPerPage)}
                >{">"}</button>
                <button 
                  className="btn btn-sm btn-outline-secondary" 
                  onClick={handleLastPage}
                  disabled={currentPage === Math.ceil(locations.length / itemsPerPage)}
                >{">>"}</button>
              </div>
              <span className="ms-2 fw-bold">
                {indexOfFirstRow + 1} - {Math.min(indexOfLastRow, locations.length)} of {locations.length} items
              </span>
            </div>
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedLocations(locations.map(loc => loc._id));
                      } else {
                        setSelectedLocations([]);
                      }
                    }}
                    checked={selectedLocations.length === locations.length}
                  />
                </th>
                <th>Actions</th>
                <th>Location Name</th>
                <th>Location Type</th>
                <th>Street Address 1</th>
                <th>Street Address 2</th>
                <th>City</th>
                <th>State/Province</th>
                <th>Zip/Postal Code</th>
                <th>Country</th>
                <th>Main Phone</th>
                <th>Capacity</th>
                <th>Capacity Used(%)</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="16" className="text-center py-4">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : locations.length === 0 ? (
                <tr>
                  <td colSpan="16" className="text-center py-3 text-muted">
                    No locations available
                  </td>
                </tr>
              ) : (
                currentRows.map(location => (
                  <tr key={location._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes(location._id)}
                        onChange={() => handleCheckboxChange(location._id)}
                      />
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <CiEdit
                          style={{ cursor: "pointer", color: "green" }}
                          title="Edit"
                          onClick={() => handleEdit(location._id)}
                        />
                        <RiDeleteBin6Line
                          style={{ 
                            cursor: "pointer", 
                            color: "red",
                            opacity: selectedLocations.includes(location._id) ? 1 : 0.7 
                          }}
                          title="Delete"
                          onClick={() => handleDelete(location._id)}
                        />
                      </div>
                    </td>
                    <td>{location.locationName}</td>
                    <td>{location.locationType}</td>
                    <td>{location.streetAddress1}</td>
                    <td>{location.streetAddress2}</td>
                    <td>{location.city}</td>
                    <td>{location.stateProvince}</td>
                    <td>{location.zipPostalCode}</td>
                    <td>{location.country}</td>
                    <td>{location.mainPhone}</td>
                    <td>{location.capacity}</td>
                    <td>{location.capacityUsed}</td>
                    <td className="coordinate-cell">
                      {isLoadingCoordinates ? (
                        <span className="loading-coordinates">Loading...</span>
                      ) : (
                        <span 
                          className={`coordinate-value ${location.latitude !== '-' ? 'clickable' : ''}`}
                          onClick={() => location.latitude !== '-' && viewOnMap(location.latitude, location.longitude)}
                          title={location.latitude !== '-' ? "Click to view on map" : ""}
                        >
                          {location.latitude}
                        </span>
                      )}
                    </td>
                    <td className="coordinate-cell">
                      {isLoadingCoordinates ? (
                        <span className="loading-coordinates">Loading...</span>
                      ) : (
                        <span 
                          className={`coordinate-value ${location.longitude !== '-' ? 'clickable' : ''}`}
                          onClick={() => location.longitude !== '-' && viewOnMap(location.latitude, location.longitude)}
                          title={location.longitude !== '-' ? "Click to view on map" : ""}
                        >
                          {location.longitude}
                        </span>
                      )}
                    </td>
                    <td>{location.id}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {locations.length > itemsPerPage && (
          <div className="pagination-wrapper">
            <div className="d-flex align-items-center gap-3 p-2 justify-content-between">
              <div className="d-flex align-items-center">
                <button 
                  className="btn btn-sm btn-outline-secondary" 
                  onClick={handleFirstPage}
                  disabled={currentPage === 1}
                >{"<<"}</button>
                <button 
                  className="btn btn-sm btn-outline-secondary" 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >{"<"}</button>
                <span className="mx-2">Page</span>
                <input
                  type="text"
                  className="form-control page-input"
                  value={pageInput}
                  onChange={handlePageInputChange}
                  onKeyDown={handlePageInputChange}
                  onBlur={handlePageInputChange}
                />
                <span className="mx-2">of {Math.ceil(locations.length / itemsPerPage)}</span>
                <button 
                  className="btn btn-sm btn-outline-secondary" 
                  onClick={handleNextPage}
                  disabled={currentPage === Math.ceil(locations.length / itemsPerPage)}
                >{">"}</button>
                <button 
                  className="btn btn-sm btn-outline-secondary" 
                  onClick={handleLastPage}
                  disabled={currentPage === Math.ceil(locations.length / itemsPerPage)}
                >{">>"}</button>
              </div>
              <span className="ms-2 fw-bold">
                {indexOfFirstRow + 1} - {Math.min(indexOfLastRow, locations.length)} of {locations.length} items
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Locations;

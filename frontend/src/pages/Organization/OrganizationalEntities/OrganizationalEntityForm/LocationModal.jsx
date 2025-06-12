import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table, Input } from "reactstrap";
import axios from "axios";

function LocationModal({ isOpen, toggle, onSelect }) {
  const [locations, setLocations] = useState([]); // Stores API locations
  const [selectedLocations, setSelectedLocations] = useState([]); // Stores selected locations
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (isOpen) {
      fetchLocations();
    }
  }, [isOpen]);

  // ✅ Fetch Locations from API
  const fetchLocations = async () => {
    try {
      setLoading(true);
      console.log("🔍 Fetching BCM Sites from API...");

      const response = await axios.get("http://localhost:8000/api/v1/locations/all");

      console.log("✅ Full API Response:", response.data);

      // ✅ Handling different API structures
      let locationList = [];
      if (Array.isArray(response.data)) {
        locationList = response.data;
      } else if (Array.isArray(response.data.data)) {
        locationList = response.data.data;
      } else if (Array.isArray(response.data.locations)) {
        locationList = response.data.locations;
      } else {
        console.error("❌ Unexpected API format. Response:", response.data);
      }

      setLocations(locationList);
    } catch (error) {
      console.error("❌ API Fetch Error:", error);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle checkbox selection for multiple locations
  const handleCheckboxChange = (location) => {
    setSelectedLocations((prev) => {
      const isSelected = prev.some((item) => item._id === String(location._id));
      return isSelected
        ? prev.filter((item) => item._id !== String(location._id))
        : [...prev, { ...location, _id: String(location._id) }];
    });
  };

  // ✅ Confirm selection and pass selected locations to parent
  const handleConfirmSelection = () => {
    onSelect(selectedLocations);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Select BCM Sites</ModalHeader>
      <ModalBody>
        {loading ? (
          <p>Loading...</p>
        ) : locations.length > 0 ? (
          <Table hover bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Location Name</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location, index) => (
                <tr key={location._id}>
                  <td>{index + 1}</td>
                  <td>{location.locationName || "N/A"}</td>
                  <td>
                    <Input
                      type="checkbox"
                      checked={selectedLocations.some((item) => item._id === String(location._id))}
                      onChange={() => handleCheckboxChange(location)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-center text-danger">⚠ No locations available</p>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleConfirmSelection} disabled={selectedLocations.length === 0}>
          Select {selectedLocations.length > 0 && `(${selectedLocations.length})`}
        </Button>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}

export default LocationModal;

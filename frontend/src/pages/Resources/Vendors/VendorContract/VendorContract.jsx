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
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./VendorContract.css";

function VendorContract() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [vendorContacts, setVendorContacts] = useState([
    {
      id: '1',
      vendor: "Vendor 1",
      firstName: "John",
      lastName: "Doe",
      title: "Manager",
      email: "john.doe@example.com",
      workPhone: "123-456-7890",
      workMobilePhone: "098-765-4321",
      alternatePhone: "111-222-3333",
      fax: "444-555-6666",
    },
    {
      id: '2',
      vendor: "Vendor 2",
      firstName: "Jane",
      lastName: "Smith",
      title: "Director",
      email: "jane.smith@example.com",
      workPhone: "223-456-7890",
      workMobilePhone: "198-765-4321",
      alternatePhone: "211-222-3333",
      fax: "244-555-6666",
    },
    {
      id: '3',
      vendor: "Vendor 3",
      firstName: "Alice",
      lastName: "Johnson",
      title: "CEO",
      email: "alice.johnson@example.com",
      workPhone: "323-456-7890",
      workMobilePhone: "298-765-4321",
      alternatePhone: "311-222-3333",
      fax: "344-555-6666",
    },
    {
      id: '4',
      vendor: "Vendor 4",
      firstName: "Bob",
      lastName: "Brown",
      title: "CTO",
      email: "bob.brown@example.com",
      workPhone: "423-456-7890",
      workMobilePhone: "398-765-4321",
      alternatePhone: "411-222-3333",
      fax: "444-555-6666",
    },
    {
      id: '5',
      vendor: "Vendor 5",
      firstName: "Charlie",
      lastName: "Davis",
      title: "CFO",
      email: "charlie.davis@example.com",
      workPhone: "523-456-7890",
      workMobilePhone: "498-765-4321",
      alternatePhone: "511-222-3333",
      fax: "544-555-6666",
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
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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
        <title>Vendor Contacts Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Vendor Contacts</div>
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
              <span className="header-title">Vendor Contacts</span>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-2"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded={isOpen}
                  onClick={toggleDropdown}
                >
                  All Vendor Contacts
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
                      All Vendor Contracts <BiSolidEdit className="hw-15 ml-20px" />
                      <FaTableColumns className="hw-15 ml-5px" />
                      <ImCopy className="hw-15 ml-5px" />
                    </a>
                  </li>
                  <span className="ms-1">Select Another View...</span>
                  <li>
                    <a className="dropdown-item" href="#">
                      All Vendor Contacts
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      For Export Only
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
                      Vendor Contact{" "}
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Title{" "}
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Work Phone{" "}
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Work Mobile Phone{" "}
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Email Address{" "}
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Portal User{" "}
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Workflow Actions{" "}
                    </label>
                  </li>
                </ul>
              </span>
              <button className="button border-1 ms-1">
                <FaFilter className="hw-15" />
              </button>
            </div>
            <div>
              <NavLink className="button1 border-1" to="/new-vendor-contact">
                <TiPlus className="hw-20" />
                vendor-Contact
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
          <div className="vendor-contacts-list">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setCheckedItems(isChecked ? vendorContacts.map((r) => r.id) : []);
                      }}
                      checked={checkedItems.length === vendorContacts.length}
                    />
                  </th>
                  <th scope="col">Actions</th>
                  <th scope="col">Vendor</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Title</th>
                  <th scope="col">Email Address</th>
                  <th scope="col">Work Phone</th>
                  <th scope="col">Work Mobile Phone</th>
                  <th scope="col">Alternate Phone</th>
                  <th scope="col">Fax</th>
                </tr>
              </thead>
              <tbody>
                {vendorContacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkedItems.includes(contact.id)}
                        onChange={() => handleCheckboxChange(contact.id)}
                      />
                    </td>
                    <td className="text-center">
                    <div style={{ gap: "10px" }} className="d-flex align-items-center">
                      <button onClick={() => handleEdit(record.id)} className="btn btn-sm btn-link">
                        <BiSolidEdit className="hw-15" />
                      </button>
                      <button onClick={() => handleDelete(record.id)} className="btn btn-sm btn-link text-danger">
                        <FaRegTrashCan className="hw-15" />
                      </button>
                    </div>
                    </td>
                    <td>{contact.vendor}</td>
                    <td>{contact.firstName}</td>
                    <td>{contact.lastName}</td>
                    <td>{contact.title}</td>
                    <td>{contact.email}</td>
                    <td>{contact.workPhone}</td>
                    <td>{contact.workMobilePhone}</td>
                    <td>{contact.alternatePhone}</td>
                    <td>{contact.fax}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default VendorContract;
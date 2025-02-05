import React from "react";
import { Navigate } from "react-router-dom";

//AuthenticationInner pages
import BasicSignIn from "../pages/AuthenticationInner/Login/BasicSignIn";
import CoverSignIn from "../pages/AuthenticationInner/Login/CoverSignIn";
import BasicPasswReset from "../pages/AuthenticationInner/PasswordReset/BasicPasswReset";

import CoverPasswReset from "../pages/AuthenticationInner/PasswordReset/CoverPasswReset";
import BasicLockScreen from "../pages/AuthenticationInner/LockScreen/BasicLockScr";
import CoverLockScreen from "../pages/AuthenticationInner/LockScreen/CoverLockScr";
import BasicLogout from "../pages/AuthenticationInner/Logout/BasicLogout";
import CoverLogout from "../pages/AuthenticationInner/Logout/CoverLogout";
import BasicSuccessMsg from "../pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg";
import CoverSuccessMsg from "../pages/AuthenticationInner/SuccessMessage/CoverSuccessMsg";
import BasicTwosVerify from "../pages/AuthenticationInner/TwoStepVerification/BasicTwosVerify";
import CoverTwosVerify from "../pages/AuthenticationInner/TwoStepVerification/CoverTwosVerify";
import Basic404 from "../pages/AuthenticationInner/Errors/Basic404";
import Cover404 from "../pages/AuthenticationInner/Errors/Cover404";
import Alt404 from "../pages/AuthenticationInner/Errors/Alt404";
import Error500 from "../pages/AuthenticationInner/Errors/Error500";

import BasicPasswCreate from "../pages/AuthenticationInner/PasswordCreate/BasicPasswCreate";
import CoverPasswCreate from "../pages/AuthenticationInner/PasswordCreate/CoverPasswCreate";
import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";

//Organization Routes
import OrganizationalEntitiesPage from "../pages/Organization/OrganizationalEntities/OrganizationalEntity/OrganizationalEntitiesPage.jsx";
import OrganizationalEntityForm from "../pages/Organization/OrganizationalEntities/OrganizationalEntityForm/OrganizationalEntityForm.jsx";
import EditOrganizationalEntity from "../pages/Organization/OrganizationalEntities/OrganizationalEntityForm/EditOrganizationEntity.jsx";
import Employees from "../pages/Organization/Employees/Employees";
import NewEmployee from "../pages/Organization/Employees/NewEmployee.jsx";
import EditEmployee from "../pages/Organization/Employees/EditEmployee.jsx";
import Locations from "../pages/Organization/Locations/Locations.jsx";
import NewLocation from "../pages/Organization/Locations/NewLocation.jsx";
import LocationMap from "../pages/Organization/LocationMap/LocationMap.jsx";

// Add these imports at the top of the file
import Resources from "../pages/Resources/Resources.jsx";
import IT from "../pages/Resources/IT/IT.jsx";
import NewIT from "../pages/Resources/IT/NewIT.jsx";
import Clients from "../pages/Resources/Clients/Clients.jsx";
import NewClients from "../pages/Resources/Clients/NewClient.jsx";
import ClientContacts from "../pages/Resources/Clients/ClientContacts/ClientContacts.jsx";
import NewClientContact from "../pages/Resources/Clients/ClientContacts/NewClientContact.jsx";
import BCMSeatsRequirements from "../pages/Resources/BCMSeatsRequirements/BCMSeatsRequirements.jsx";
import NewBCMSeatsRequirements from "../pages/Resources/BCMSeatsRequirements/NewBCMSeatsRequirements.jsx";
import Equipment from "../pages/Resources/Equipment/Equipment.jsx";
import NewEquipment from "../pages/Resources/Equipment/NewEquipment.jsx";
import Applications from "../pages/Resources/IT/Applications/Applications.jsx";
import NewApplication from "../pages/Resources/IT/Applications/NewApplication.jsx";
import Databases from "../pages/Resources/IT/Databases/Databases.jsx";
import NewDatabase from "../pages/Resources/IT/Databases/NewDatabase.jsx";
import Hardware from "../pages/Resources/IT/Hardware/Hardware.jsx";
import NewHardware from "../pages/Resources/IT/Hardware/NewHardware.jsx";
import Supplies from "../pages/Resources/Supplies/Supplies.jsx";
import NewSupply from "../pages/Resources/Supplies/NewSupply.jsx";
import Vendors from "../pages/Resources/Vendors/Vendors.jsx";
import NewVendors from "../pages/Resources/Vendors/NewVendor.jsx";
import VendorContract from "../pages/Resources/Vendors/VendorContract/VendorContract.jsx";
import NewVendorContract from "../pages/Resources/Vendors/VendorContract/NewVendorContract.jsx";
import ServiceType from "../pages/Resources/Vendors/ServiceType/ServiceType.jsx";
import NewServiceType from "../pages/Resources/Vendors/ServiceType/NewServiceType.jsx";
import VitalRecords from "../pages/Resources/VitalRecords/VitalRecords.jsx";
import NewVitalRecord from "../pages/Resources/VitalRecords/NewVitalRecord.jsx";

const authProtectedRoutes = [
  // Home Routes
  {
    path: "/admin-home",
    component: <h1 className="page-content">Admin Home Page</h1>,
  },
  {
    path: "/action-items",
    component: <h1 className="page-content">Action Items</h1>,
  },

  // Organization Routes
  {
    path: "/organization",
    component: <h1 className="page-content">Organization</h1>,
  },
  {
    path: "/organizational-entities",
    component: <OrganizationalEntitiesPage />,
  },
  {
    path: "/new-organizational-entity",
    component: <OrganizationalEntityForm />,
  },
  {
    path: "/organizational-entities/edit/:id",
    component: <EditOrganizationalEntity />,
  },
  { path: "/employees", component: <Employees /> },
  { path: "/new-employee", component: <NewEmployee /> },
  { path: "/employees/edit/:id", component: <EditEmployee /> },

  { path: "/locations", component: <Locations /> },
  { path: "/new-location", component: <NewLocation /> },
  { path: "/location-map", component: <LocationMap /> },

  // Resources Routes
  { path: "/resources", component: <Resources /> },

  // Client Routes
  { path: "/clients", component: <Clients /> },
  { path: "/new-clients", component: <NewClients /> },
  { path: "/client-contacts", component: <ClientContacts /> },
  { path: "/new-client-contact", component: <NewClientContact /> },

  // BCM Routes
  { path: "/bcm-seats-requirements", component: <BCMSeatsRequirements /> },
  {
    path: "/new-bcm-seats-requirement",
    component: <NewBCMSeatsRequirements />,
  },

  // Equipment Routes
  { path: "/equipment", component: <Equipment /> },
  { path: "/new-equipment", component: <NewEquipment /> },

  // IT Routes
  { path: "/it", component: <IT /> },
  { path: "/new-it", component: <NewIT /> },
  { path: "/applications", component: <Applications /> },
  { path: "/new-application", component: <NewApplication /> },
  { path: "/databases", component: <Databases /> },
  { path: "/new-database", component: <NewDatabase /> },
  { path: "/hardware", component: <Hardware /> },
  { path: "/new-hardware", component: <NewHardware /> },

  // Supplies Routes
  { path: "/supplies", component: <Supplies /> },
  { path: "/new-supply", component: <NewSupply /> },

  // Vendor Routes
  { path: "/vendors", component: <Vendors /> },
  { path: "/new-vendors", component: <NewVendors /> },
  { path: "/vendors-contacts", component: <VendorContract /> },
  { path: "/new-vendor-contact", component: <NewVendorContract /> },
  { path: "/service-types", component: <ServiceType /> },
  { path: "/new-service-type", component: <NewServiceType /> },

  // Vital Records Routes
  { path: "/vital-records", component: <VitalRecords /> },
  { path: "/new-vital-record", component: <NewVitalRecord /> },

  // User Profile
  { path: "/profile", component: <UserProfile /> },

  // Default Routes
  { path: "/", exact: true, component: <Navigate to="/admin-home" /> },
  { path: "*", component: <Navigate to="/admin-home" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },

  //AuthenticationInner pages
  { path: "/auth-signin-basic", component: <BasicSignIn /> },
  { path: "/auth-signin-cover", component: <CoverSignIn /> },
  { path: "/auth-pass-reset-basic", component: <BasicPasswReset /> },
  { path: "/auth-pass-reset-cover", component: <CoverPasswReset /> },
  { path: "/auth-lockscreen-basic", component: <BasicLockScreen /> },
  { path: "/auth-lockscreen-cover", component: <CoverLockScreen /> },
  { path: "/auth-logout-basic", component: <BasicLogout /> },
  { path: "/auth-logout-cover", component: <CoverLogout /> },
  { path: "/auth-success-msg-basic", component: <BasicSuccessMsg /> },
  { path: "/auth-success-msg-cover", component: <CoverSuccessMsg /> },
  { path: "/auth-twostep-basic", component: <BasicTwosVerify /> },
  { path: "/auth-twostep-cover", component: <CoverTwosVerify /> },
  { path: "/auth-404-basic", component: <Basic404 /> },
  { path: "/auth-404-cover", component: <Cover404 /> },
  { path: "/auth-404-alt", component: <Alt404 /> },
  { path: "/auth-500", component: <Error500 /> },

  { path: "/auth-pass-change-basic", component: <BasicPasswCreate /> },
  { path: "/auth-pass-change-cover", component: <CoverPasswCreate /> },
  { path: "/auth-offline", component: <Offlinepage /> },
];

export { authProtectedRoutes, publicRoutes };

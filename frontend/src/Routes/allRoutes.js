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
import ViewOrganizationalEntitiesPage from "../pages/Organization/OrganizationalEntities/OrganizationalEntity/ViewOrganizationalEntitiesPage.jsx";
import Employees from "../pages/Organization/Employees/Employees";
import NewEmployee from "../pages/Organization/Employees/NewEmployee.jsx";
import EditEmployee from "../pages/Organization/Employees/EditEmployee.jsx";
import ViewEmployee from "../pages/Organization/Employees/ViewEmployee.jsx";
import Locations from "../pages/Organization/Locations/Locations.jsx";
import NewLocation from "../pages/Organization/Locations/NewLocation.jsx";
import EditLocation from "../pages/Organization/Locations/EditLocation.jsx";
import LocationMap from "../pages/Organization/LocationMap/LocationMap.jsx";
import ViewLocation from "../pages/Organization/Locations/ViewLocation.jsx";

//Resources Routes
import Resources from "../pages/Resources/Resources.jsx";
import IT from "../pages/Resources/IT/IT.jsx";
import NewIT from "../pages/Resources/IT/NewIT.jsx";
import Clients from "../pages/Resources/Clients/Clients.jsx";
import NewClients from "../pages/Resources/Clients/NewClient.jsx";
import ClientContacts from "../pages/Resources/Clients/ClientContacts/ClientContacts.jsx";
import NewClientContact from "../pages/Resources/Clients/ClientContacts/NewClientContact.jsx";
import BCMSeatsRequirements from "../pages/Resources/BCMSeatsRequirements/BCMSeatsRequirements.jsx";
import NewBCMSeatsRequirements from "../pages/Resources/BCMSeatsRequirements/NewBCMSeatsRequirements.jsx";
import EditBCMSeatsRequirements from "../pages/Resources/BCMSeatsRequirements/EditBCMSeatsRequirements.jsx";
import Equipment from "../pages/Resources/Equipment/Equipment.jsx";
import NewEquipment from "../pages/Resources/Equipment/NewEquipment.jsx";
import EditEquipment from "../pages/Resources/Equipment/EditEquipment.jsx";
import Applications from "../pages/Resources/IT/Applications/Applications.jsx";
import NewApplication from "../pages/Resources/IT/Applications/NewApplication.jsx";
import EditApplication from "../pages/Resources/IT/Applications/EditApplication.jsx";

import ViewApplication from "../pages/Resources/IT/Applications/ApplicationView.jsx";
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
import EditClient from "../pages/Resources/Clients/EditClient";

//BIA Routes
import BIA from "../pages/BIA/BIA.jsx";
import NewBIA from "../pages/BIA/NewBIA.jsx";
import BIADashboard from "../pages/BIA/BIADashboard/BIADashboard.jsx";
import NewBIADashboard from "../pages/BIA/BIADashboard/NewBIADashboard.jsx";
import Activities from "../pages/BIA/Activities/Activities.jsx";
import NewActivities from "../pages/BIA/Activities/NewActivities.jsx";
import ApprovalGroups from "../pages/BIA/ApprovalGroups/ApprovalGroups.jsx";
import NewApprovalGroups from "../pages/BIA/ApprovalGroups/NewApprovalGroups.jsx";
import EditClientContact from "../pages/Resources/Clients/ClientContacts/EditClientConatct.jsx";

//Plans Routes
import Plan from "../pages/Plans/Plan.jsx";
import NewPlan from "../pages/Plans/NewPlan.jsx";
import ApprovalGroup from "../pages/Plans/ApprovalGroups/ApprovalGroups.jsx";
import NewApprovalGroup from "../pages/Plans/ApprovalGroups/NewApprovalGroups.jsx";
import EditApprovalGroup from "../pages/Plans/ApprovalGroups/EditApprovalGroups.jsx";
import Attachments from "../pages/Plans/Attachments/Attachments.jsx";
import NewAttachments from "../pages/Plans/Attachments/NewAttachment.jsx";
import EditAttachments from "../pages/Plans/Attachments/EditAttachment.jsx";
import CallTrees from "../pages/Plans/CallTrees/CallTrees.jsx";
import EditCallTrees from "../pages/Plans/CallTrees/EditCallTrees.jsx";
import NewCallTrees from "../pages/Plans/CallTrees/NewCallTrees.jsx";
import Plans from "../pages/Plans/Plans/Plan.jsx";
import NewPlans from "../pages/Plans/Plans/NewPlan.jsx";
import EditPlans from "../pages/Plans/Plans/EditPlan.jsx";
import Sections from "../pages/Plans/Sections/Sections.jsx";
import Teams from "../pages/Plans/Teams/Teams.jsx";
import NewTeam from "../pages/Plans/Teams/NewTeams.jsx";
import EditTeam from "../pages/Plans/Teams/EditTeams.jsx";


//Risks Routes
import Risk from "../pages/Risks/Risk.jsx";
import NewRisk from "../pages/Risks/NewRisk.jsx";
import RiskAssessments from "../pages/Risks/RiskAssessments/RiskAssessments.jsx";
import NewRiskAssessments from "../pages/Risks/RiskAssessments/NewRiskAssessments.jsx";
import RiskRegister from "../pages/Risks/RiskRegister/RiskRegister.jsx";
import NewRiskRegister from "../pages/Risks/RiskRegister/NewRiskRegister.jsx";
import Threat from "../pages/Risks/Threat/Threat.jsx";
import NewThreat from "../pages/Risks/Threat/NewThreat.jsx";

//Exercises Routes
import Exercises from "../pages/Exercises/Exercises.jsx";
import NewExercises from "../pages/Exercises/NewExercises.jsx";
import ExerciseIssues from "../pages/Exercises/ExerciseIssues/ExerciseIssues.jsx";
import NewExerciseIssues from "../pages/Exercises/ExerciseIssues/NewExerciseIssues.jsx";

//Incidents Routes
import Incidents from "../pages/Incidents/Incidents.jsx";
import NewIncidents from "../pages/Incidents/NewIncidents.jsx";
import ActiveIncidents from "../pages/Incidents/ActiveIncidents/ActiveIncidents.jsx";
import NewActiveIncidents from "../pages/Incidents/ActiveIncidents/NewActiveIncidents.jsx";
import IncidentMap from "../pages/Incidents/IncidentMap/IncidentMap.jsx";
import NewIncidentMap from "../pages/Incidents/IncidentMap/NewIncidentMap.jsx";

//Business Routes
import Processes from "../pages/Business/Processes/Processes.jsx";
import NewProcesses from "../pages/Business/Processes/NewProcesses.jsx";
import ActionItem from "../pages/Business/ActionItem/ActionItem.jsx";
import BPlans from "../pages/Business/Plans/Plans.jsx";
import BBIA from "../pages/Business/BIA/BIA.jsx";
import BNewBIA from "../pages/Business/BIA/NewBIA.jsx";

//Vendor Dependency
import VendorDependency from "../pages/VendorDependency/VendorDependency.jsx";
import NewVendorDependency from "../pages/VendorDependency/NewVendorDependency.jsx";

//Service Type
import EditServiceType from "../pages/Resources/Vendors/ServiceType/EditServiceType.jsx";


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
    path: "/organizational-entities/view/:id",
    component: <ViewOrganizationalEntitiesPage />,
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
 
  {
    path: "/employees/view/:id",
    component: <ViewEmployee />,
  },

  { path: "/locations", component: <Locations /> },
  { path: "/new-location", component: <NewLocation /> },
  { path: "/locations/edit/:id", component: <EditLocation /> },
  {
    path: "/locations/view/:id",
    component: <ViewLocation />,
  },
  { path: "/location-map", component: <LocationMap /> },

  // Resources Routes
  { path: "/resources", component: <Resources /> },

  // Client Routes
  { path: "/clients", component: <Clients /> },
  { path: "/new-clients", component: <NewClients /> },
  { path: "/clients/edit/:id", component: <EditClient /> },
  { path: "/client-contacts", component: <ClientContacts /> },
  { path: "/new-client-contact", component: <NewClientContact /> },
  { path: "/client-contacts/edit/:id", component: <EditClientContact /> },

  // BCM Routes
  { path: "/bcm-seats-requirements", component: <BCMSeatsRequirements /> },
  {
    path: "/new-bcm-seats-requirement",
    component: <NewBCMSeatsRequirements />,
  },
  { path: "/bcm-seats-requirements/edit/:id", component: <EditBCMSeatsRequirements /> },

  // Equipment Routes
  { path: "/equipment", component: <Equipment /> },
  { path: "/new-equipment", component: <NewEquipment /> },
  { path: "/equipment/edit/:id", component: <EditEquipment /> },

  // IT Routes
  { path: "/it", component: <IT /> },
  { path: "/new-it", component: <NewIT /> },
  { path: "/applications", component: <Applications /> },
  { path: "/new-application", component: <NewApplication /> },
  { path: "/applications/edit/:id", component: < EditApplication /> },
{path: "/applications/viewdata/:id", component: <ViewApplication />},
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
  { path: "/service-types/edit/:id", component: <EditServiceType /> },

  // Vital Records Routes
  { path: "/vital-records", component: <VitalRecords /> },
  { path: "/new-vital-record", component: <NewVitalRecord /> },

  //BIA Routes
  { path: "/bia", component: <BIA /> },
  { path: "/new-bia", component: <NewBIA /> },
  { path: "/bia-dashboard", component: <BIADashboard /> },
  { path: "/new-bia-dashboard", component: <NewBIADashboard /> },
  { path: "/activities", component: <Activities /> },
  { path: "/new-activities", component: <NewActivities /> },
  { path: "/approval-groups", component: <ApprovalGroups /> },
  { path: "/new-approval-groups", component: <NewApprovalGroups /> },

  //Plans Routes
  { path: "/plan", component: <Plan /> },
  { path: "/new-plan", component: <NewPlan /> },
  { path: "/plan_approval-group", component: <ApprovalGroup /> },
  { path: "/plan_new-approval-group", component: <NewApprovalGroup /> },
  { path: "/edit-plan-approval-group/:id", component: <EditApprovalGroup /> },
  { path: "/attachments", component: <Attachments /> },
  { path: "/new-attachments", component: <NewAttachments /> },
  { path: "/edit-attachments/:id", component: <EditAttachments /> },
  { path: "/call-trees", component: <CallTrees /> },
  { path: "/new-call-trees", component: <NewCallTrees /> },
  { path: "/edit-call-trees/:id", component: <EditCallTrees /> },
  { path: "/plans", component: <Plans /> },
  { path: "/new-plans", component: <NewPlans /> },
  { path: "/Edit-plans/:id", component: <EditPlans /> },
  { path: "/sections", component: <Sections /> },
  { path: "/teams", component: <Teams /> },
  { path: "/new-teams", component: <NewTeam /> },
  { path: "/edit-teams/:id", component: <EditTeam /> },

  //Risks Routes
  { path: "/risks", component: <Risk /> },
  { path: "/new-risk", component: <NewRisk /> },
  { path: "/risk-assessments", component: <RiskAssessments /> },
  { path: "/new-risk-assessments", component: <NewRiskAssessments /> },
  { path: "/risk-register", component: <RiskRegister /> },
  { path: "/new-risk-register", component: <NewRiskRegister /> },
  { path: "/threat", component: <Threat /> },
  { path: "/new-threat", component: <NewThreat /> },

  //Exercises Routes
  { path: "/exercises", component: <Exercises /> },
  { path: "/new-exercises", component: <NewExercises /> },
  { path: "/exercise-issues", component: <ExerciseIssues /> },
  { path: "/new-exercise-issues", component: <NewExerciseIssues /> },

  //Incidents Routes
  { path: "/incidents", component: <Incidents /> },
  { path: "/new-incident", component: <NewIncidents /> },
  { path: "/active-incidents", component: <ActiveIncidents /> },
  { path: "/new-active-incidents", component: <NewActiveIncidents /> },
  { path: "/incident-map", component: <IncidentMap /> },
  { path: "/new-incident-map", component: <NewIncidentMap /> },

  //Business Routes
  { path: "/bias", component: <BBIA /> },
  { path: "/new-bia", component: <BNewBIA /> },
  { path: "/business-plans", component: <BPlans /> },
  { path: "/business-processes", component: <Processes /> },

  { path: "/new-business-processes", component: <NewProcesses /> },
  { path: "/business-action-items", component: <ActionItem /> },

  { path: "/vendor-dependency", component: <VendorDependency /> },
  { path: "/new-vendor-dependency", component: <NewVendorDependency /> },

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

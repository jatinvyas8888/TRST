import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isBaseUi, setIsBaseUi] = useState(false);
  const [isAdvanceUi, setIsAdvanceUi] = useState(false);
  const [isForms, setIsForms] = useState(false);
  const [isTables, setIsTables] = useState(false);
  const [isPlans, setIsPlans] = useState(false);
  const [isIcons, setIsIcons] = useState(false);
  const [isMaps, setIsMaps] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);
  const [isLanding, setIsLanding] = useState(false);
  const [isVendors, setIsVendors] = useState(false); // Add this new state
  const [isImport, setIsImport] = useState(false); // Add this new state
  const [isVendorSettings, setIsVendorSettings] = useState(false); // Add this new state
  const [isResources, setIsResources] = useState(false);
  const [isClients, setIsClients] = useState(false);
  const [isIt, setIsIt] = useState(false);
  const [isRisks, setIsRisks] = useState(false);
  const [isExercises, setIsExercises] = useState(false);
  const [isIncidents, setIsIncidents] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const [isBias, setIsBias] = useState(false);

  // Apps
  const [isEmail, setEmail] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Apps") {
      setIsApps(false);
    }
    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    if (iscurrentState !== "BaseUi") {
      setIsBaseUi(false);
    }
    if (iscurrentState !== "AdvanceUi") {
      setIsAdvanceUi(false);
    }
    if (iscurrentState !== "Forms") {
      setIsForms(false);
    }
    if (iscurrentState !== "Tables") {
      setIsTables(false);
    }
    // if (iscurrentState !== "Charts") {
    //   setIsCharts(false);
    // }
    if (iscurrentState !== "Icons") {
      setIsIcons(false);
    }
    if (iscurrentState !== "Maps") {
      setIsMaps(false);
    }
    if (iscurrentState !== "MuliLevel") {
      setIsMultiLevel(false);
    }
    if (iscurrentState === "Widgets") {
      history("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState !== "Landing") {
      setIsLanding(false);
    }
    // if (iscurrentState !== "Vendors") {
    //   setIsVendors(false);
    // }
    // if (iscurrentState !== "VendorSettings") {
    //   setIsVendorSettings(false);
    // }
    if (iscurrentState !== "Resources") {
      setIsResources(false);
    }
    // if (iscurrentState !== "Clients") {
    //   setIsClients(false);
    // }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isApps,
    isAuth,
    isPages,
    isBaseUi,
    isAdvanceUi,
    isForms,
    isTables,
    isPlans,
    isIcons,
    isMaps,
    isMultiLevel,
    isVendors,
    isVendorSettings,
    isResources,
    isClients,
  ]);

  const menuItems = [
    {
      id: "admin-home",
      label: "Admin Home",
      icon: "ri-home-8-line",
      link: "/admin-home",
      stateVariables: isDashboard,
      click: function (e) {
        if (e.target.getAttribute("data-bs-toggle")) {
          e.preventDefault();
        }
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "action-items",
          label: "Action Items",
          link: "/admin/action-items",
          parentId: "admin-home",
        },
        {
          id: "bcic-support-portal",
          label: "BCIC Support Portal",
          link: "/admin/bcic-support-portal",
          parentId: "admin-home",
        },
        {
          id: "calendar",
          label: "Calendar",
          link: "/admin/calendar",
          parentId: "admin-home",
        },
        {
          id: "communication-log",
          label: "Communication Log",
          link: "/communication-log",
          parentId: "admin-home",
        },
        {
          id: "manage-users",
          label: "Manage Users",
          link: "/admin/manage-users",
          parentId: "admin-home",
        },
        { id: "rto", label: "RTO", link: "/rto", parentId: "admin-home" },
        {
          id: "settings",
          label: "Settings",
          link: "/admin/settings",
          parentId: "admin-home",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setEmail(!isEmail);
          },
          stateVariables: isEmail,
          childItems: [
            {
              id: "import",
              label: "Import",
              link: "/admin/import",
              parentId: "settings",
              isChildItem: true,
              stateVariables: isImport,
              click: function (e) {
                e.preventDefault();
                setIsImport(!isImport);
              },
              childItems: [
                {
                  id: "locations",
                  label: "Locations",
                  link: "/admin/locations",
                  parentId: "import",
                },
                {
                  id: "business-entities",
                  label: "Organizational Entities",
                  link: "/admin/business-entities",
                  parentId: "import",
                },
                {
                  id: "employees",
                  label: "Employees",
                  link: "/admin/employees",
                  parentId: "import",
                },
                {
                  id: "vendors",
                  label: "Vendors",
                  link: "/admin/vendors",
                  isChildItem: true,
                  stateVariables: isVendors,
                  click: function (e) {
                    e.preventDefault();
                    setIsVendors(!isVendors);
                  },
                  parentId: "import",
                  childItems: [
                    {
                      id: "vendor-locations",
                      label: "Vendor Locations",
                      link: "/admin/vendor-locations",
                      parentId: "vendors",
                    },
                    {
                      id: "vendor-contracts",
                      label: "Vendor Contracts",
                      link: "/admin/vendor-contracts",
                      parentId: "vendors",
                    },
                    {
                      id: "vendor-services",
                      label: "Vendor Services",
                      link: "/admin/vendor-services",
                      parentId: "vendors",
                    },
                  ],
                },
                {
                  id: "clients",
                  label: "Clients",
                  link: "/admin/clients",
                  parentId: "import",
                },
                {
                  id: "applications",
                  label: "Applications",
                  link: "/admin/applications",
                  parentId: "import",
                },
                {
                  id: "hardware",
                  label: "Hardware",
                  link: "/admin/hardware",
                  parentId: "import",
                },
                {
                  id: "databases",
                  label: "Databases",
                  link: "/admin/databases",
                  parentId: "import",
                },
              ],
            },
            {
              id: "action-item-library",
              label: "Action Item Library",
              link: "/admin/action-item-library",
              parentId: "settings",
            },
            {
              id: "exercise-objective-library",
              label: "Exercise Objective Library",
              link: "/admin/exercise-objective-library",
              parentId: "settings",
            },
          ],
        },
      ],
    },
    {
      id: "organization",
      label: "Organization",
      icon: "ri-organization-chart",
      link: "/organization",
      stateVariables: isPages,
      click: function (e) {
        if (e.target.getAttribute("data-bs-toggle")) {
          e.preventDefault();
        }
        setIsPages(!isPages);
        setIscurrentState("Pages");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "business-entities1",
          label: "Organizational Entities",
          link: "/organizational-entities",
          parentId: "organization",
        },
        {
          id: "employees1",
          label: "Employees",
          link: "/employees",
          parentId: "organization",
        },
        {
          id: "locations1",
          label: "Locations",
          link: "/locations",
          parentId: "organization",
        },
        {
          id: "location-map",
          label: "Location Map",
          link: "/location-map",
          parentId: "organization",
        },
      ],
    },
    {
      id: "resources",
      label: "Resources",
      icon: "ri-user-fill",
      link: "/resources",
      stateVariables: isResources,
      click: function (e) {
       if (e.target.getAttribute("data-bs-toggle")) {
            e.preventDefault();
      }
        setIsResources(!isResources);
        setIscurrentState("Resources");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "clients",
          label: "Clients",
          link: "/clients",
          parentId: "resources",
          isChildItem: true,
          stateVariables: isClients,
          click: function (e) {
            // Only handle collapse
            setIsClients(!isClients);
          },
          childItems: [
            {
              id: "client-contacts",
              label: "Client Contacts",
              link: "/client-contacts",
              parentId: "clients",
            },
          ],
        },
        {
          id: "bcm-seats-requirements",
          label: "BCM Seats Requirements",
          link: "/bcm-seats-requirements",
          parentId: "resources",
        },
        {
          id: "equipment",
          label: "Equipment",
          link: "/equipment",
          parentId: "resources",
        },
        {
          id: "it",
          label: "IT",
          link: "/it",
          parentId: "resources",
          isChildItem: true,
          stateVariables: isIt,
          click: function (e) {
            // Only handle collapse
            setIsIt(!isIt);
          },
          childItems: [
            {
              id: "application",
              label: "Application",
              link: "/applications",
              parentId: "it",
            },
            {
              id: "database",
              label: "Database",
              link: "/databases",
              parentId: "it",
            },
            {
              id: "hardware",
              label: "Hardware",
              link: "/hardware",
              parentId: "it",
            },
          ],
        },
        {
          id: "supplies",
          label: "Supplies",
          link: "/supplies",  // Updated path
          parentId: "resources",
        },
        {
          id: "vendors",
          label: "Vendors",
          link: "/vendors",
          parentId: "resources",
          isChildItem: true,
          stateVariables: isVendors,
          click: function (e) {
            // Only handle collapse
            setIsVendors(!isVendors);
          },
          childItems: [
            {
              id: "vendor-contacts",
              label: "Vendor Contacts",
              link: "/vendors-contacts",
              parentId: "vendors",
            },
            {
              id: "service-type",
              label: "Service Type",
              link: "/service-types",
              parentId: "vendors",
            },
          ],
        },
        {
          id: "vital-records",
          label: "Vital Records",
          link: "/vital-records",
          parentId: "resources",
        },
      ],
    },
    {
      id: "bia",
      label: "BIA",
      icon: "ri-settings-4-fill",
      link: "/bia",
      stateVariables: isAdvanceUi,
      click: function (e) {
        if (e.target.getAttribute("data-bs-toggle")) {
          e.preventDefault();
        }
        setIsAdvanceUi(!isAdvanceUi);
        setIscurrentState("AdvanceUi");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "approval-groups",
          label: "Approval Groups",
          link: "/approval-groups",
          parentId: "bia",
        },
        { 
          id: "bia-dashboard",
          label: "BIA Dashboard",
          link: "/bia-dashboard",
          parentId: "bia",
        },
        {
          id: "activities",
          label: "Activities",
          link: "/activities",
          parentId: "bia",
        },
      ],
    },
    {
      id: "plans",
      label: "Plans",
      icon: "ri-book-2-fill",
      link: "/plans",
      stateVariables: isPlans,
      click: function (e) {
        if (e.target.getAttribute("data-bs-toggle")) {
          e.preventDefault();
        }
        setIsPlans(!isPlans);
        setIscurrentState("Plans");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "plan_approval-group",
          label: "Approval Groups",
          link: "/plan_approval-group",
          parentId: "plans",
        },
        {
          id: "attachments",
          label: "Attachments",
          link: "/attachments",
          parentId: "plans",
        },
        {
          id: "call-trees",
          label: "Call Trees",
          link: "/call-trees",
          parentId: "plans",
        },
        {
          id: "plans",
          label: "Plans",
          link: "/plans",
          parentId: "plans",
        },
        {
          id: "sections",
          label: "Sections",
          link: "/sections",
          parentId: "plans",
        },
        {
          id: "teams",
          label: "Teams",
          link: "/teams",
          parentId: "plans",
        },
      ],
    },
    {
      id: "risks",
      label: "Risks",
      icon: "ri-alert-line",
      link: "/risks",
      stateVariables: isRisks,
      click: function (e) {
        if (e.target.getAttribute("data-bs-toggle")) {
          e.preventDefault();
        }
        setIsRisks(!isRisks);
        setIscurrentState("Risks");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "risk-assessments",
          label: "Risk Assessments",
          link: "/risk-assessments",
          parentId: "risks",
        },
        {
          id: "risk-register",
          label: "Risk Register",
          link: "/risk-register",
          parentId: "risks",
        },
        {
          id: "threat",
          label: "Threat",
          link: "/threat",
          parentId: "risks",
        },
      ],
    },
    {
      id: "exercises",
      label: "Exercises",
      icon: "ri-checkbox-fill",
      link: "/exercises",
      stateVariables: isExercises,
      click: function (e) {
        if (e.target.getAttribute("data-bs-toggle")) {
          e.preventDefault();
        }
        setIsExercises(!isExercises);
        setIscurrentState("Exercises");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "exercise-issues",
          label: "Exercise Issues",
          link: "/exercise-issues",
          parentId: "exercises",
        },
      ],
    },
    {
      id: "Incidents",
      label: "Incidents",
      icon: "ri-supabase-fill",
      link: "/incidents",
      stateVariables: isIncidents,
      click: function (e) {
        if (e.target.getAttribute("data-bs-toggle")) {
          e.preventDefault();
        }
        setIsIncidents(!isIncidents);
        setIscurrentState("Incidents");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "active-incidents",
          label: "Active Incidents",
          link: "/active-incidents",
          parentId: "incidents",
        },
        {
          id: "incident-map",
          label: "Incident Map",
          link: "/incident-map",
          parentId: "incidents",
        },
      ],
    },
    {
      id: "business",
      label: "Business",
      icon: "ri-briefcase-4-fill",
      link: "/business",
      stateVariables: isBusiness,
      click: function (e) {
        if (e.target.getAttribute("data-bs-toggle")) {
          e.preventDefault();
        }
        setIsBusiness(!isBusiness);
        setIscurrentState("Business");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "action-items",
          label: "Action Items",
          link: "/business-action-items",
          parentId: "business",
        },
        {
          id: "bia",
          label: "BIA",
          link: "/bias",
          parentId: "business",
        },
        {
          id: "plans",
          label: "Plans",
          link: "/business-plans",
          parentId: "business",
        },
        {
          id: "processes",
          label: "Processes",
          link: "/business-processes",
          parentId: "business",
        },
      ],
    },
    {
      id: "vendor-dependency",
      label: "Vendor Dependency",
      icon: "ri-contacts-book-fill",
      link: "/vendor-dependency",
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;

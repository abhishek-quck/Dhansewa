import { lazy } from "react";
import { Navigate } from "react-router-dom";
import AddEnrollment from "../views/ui/enrollment/AddEnrollment.js";
import ClientGRT from "../views/ui/centers/ClientGRT.js";
import SpeedLoanDisburse from "../views/ui/group-loan/SpeedLoanDisburse.js";
import LedgerRevise from "../views/ui/advance-settings/LedgerRevise.js";
import CreditReport from "../views/ui/CreditReport.js";
import Collections from "../views/ui/activity/Collections.js";
import DayClose from "../views/ui/activity/DayClose.js";
import CenterMaster from "../views/ui/centers/CenterMaster.js";
import MeetingHandover from "../views/ui/centers/MeetingHandover.js";
import Visit from "../views/ui/centers/Visit.js";
import ADVUpdate from "../views/ui/centers/ADVUpdate.js";
import ClientADV from "../views/ui/centers/ClientADV.js";
import AccountHead from "../views/ui/accounts/AccountHead.js";
import AccountMaster from "../views/ui/accounts/AccountMaster.js";
import VoucherEntry from "../views/ui/accounts/VoucherEntry.js";
import SaleProducts from "../views/ui/management/SaleProducts.js";
import Login from "../views/Login.js";
import Signup from "../views/Signup.js";
import Landing from "../layouts/Landing.js";
import AccountLedger from "../views/ui/accounts/AccountLedger.js";
import TrialBalance from "../views/ui/accounts/TrialBalance.js";
import LoanProducts from "../views/ui/management/LoanProducts.js";
import ArrearCollection from "../views/ui/activity/ArrearCollection.js";
import ArrearClients from "../views/ui/ArrearClients.js";
import LoanChartMaster from "../views/ui/management/LoanChartMaster.js";
import ClientDisbursement from "../views/ui/ClientDisbursement.js";
import AddGRT from "../views/ui/centers/GRT/AddGRT.js"; 
import BranchMaster from "../views/ui/management/BranchMaster.js";
import PrintDocs from "../views/PrintDocs.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Dashboard = lazy(() => import("../views/Dashboard.js"));
const About = lazy(() => import("../views/About.js"));
const Enrollment = lazy(() => import("../views/ui/Enrollment"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/login", exact: true, element: <Login /> },
      { path: "/signup", exact: true, element: <Signup /> },
      { path: "/landing", exact: true, element: <Landing /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/new-enrollment", exact: true, element: <Enrollment /> },
      { path: "/add-enrollment", exact: true, element: <AddEnrollment /> },
      { path: "/center-master", exact: true, element: <CenterMaster /> },
      { path: "/meeting-handover", exact: true, element: <MeetingHandover /> },
      { path: "/center-visit", exact: true, element: <Visit /> },
      { path: "/center-adv-update", exact: true, element: <ADVUpdate /> },
      { path: "/client-adv-update", exact: true, element: <ClientADV /> },
      { path: "/client-grt", exact: true, element: <ClientGRT /> },
      { path: "/review-client/:id", exact: true, element: <AddGRT /> },
      { path: "/client-disbursement", exact: true, element: <ClientDisbursement /> },
      { path: "/speed-loan-disburse", exact: true, element: <SpeedLoanDisburse /> },
      { path: "/ledger-revise", exact: true, element: <LedgerRevise /> },
      { path: "/branches-master", exact: true, element: <BranchMaster /> },
      { path: "/account-head", exact: true, element: <AccountHead /> },
      { path: "/accounts-master", exact: true, element: <AccountMaster /> },
      { path: "/accounts-ledger-view", exact: true, element: <AccountLedger /> },
      { path: "/trial-balance", exact: true, element: <TrialBalance /> },
      { path: "/voucher-entry", exact: true, element: <VoucherEntry /> },
      { path: "/sale-products", exact: true, element: <SaleProducts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/management", exact: true, element: <Tables /> },
      { path: "/loan-products", exact: true, element: <LoanProducts /> },
      { path: "/loan-chart-master", exact: true, element: <LoanChartMaster /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/collections", exact: true, element: <Collections /> },
      { path: "/arrear-collection", exact: true, element: <ArrearCollection /> },
      { path: "/arrear-clients", exact: true, element: <ArrearClients /> },
      { path: "/day-close", exact: true, element: <DayClose /> },
      { path: "/credit-report", exact: true, element: <CreditReport /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      { path: "/print-documents", exact: true, element: <PrintDocs /> },
    ],
  },
];

export default ThemeRoutes;

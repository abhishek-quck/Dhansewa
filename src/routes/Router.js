import { lazy } from "react";
import { Navigate } from "react-router-dom"; 
const AddEnrollment = lazy(()=>import("../views/ui/enrollment/AddEnrollment.js"))
const ClientGRT = lazy(()=>import("../views/ui/centers/ClientGRT.js"))
const SpeedLoanDisburse = lazy(()=>import("../views/ui/group-loan/SpeedLoanDisburse.js"))
const LedgerRevise = lazy(()=>import("../views/ui/advance-settings/LedgerRevise.js"))
const CreditReport = lazy(()=>import("../views/ui/CreditReport.js"))
const Collections = lazy(()=>import("../views/ui/activity/Collections.js"))
const DayClose = lazy(()=>import("../views/ui/activity/DayClose.js"))
const CenterMaster = lazy(()=>import("../views/ui/centers/CenterMaster.js"))
const MeetingHandover = lazy(()=>import("../views/ui/centers/MeetingHandover.js"))
const Visit = lazy(()=>import("../views/ui/centers/Visit.js"))
const ADVUpdate = lazy(()=>import("../views/ui/centers/ADVUpdate.js"))
const ClientADV = lazy(()=>import("../views/ui/centers/ClientADV.js"))
const AccountHead = lazy(()=>import("../views/ui/accounts/AccountHead.js"))
const AccountMaster = lazy(()=>import("../views/ui/accounts/AccountMaster.js"))
const VoucherEntry = lazy(()=>import("../views/ui/accounts/VoucherEntry.js"))
const SaleProducts = lazy(()=>import("../views/ui/management/SaleProducts.js"))
const Login = lazy(()=>import("../views/Login.js"))
const Signup = lazy(()=>import("../views/Signup.js"))
const Landing = lazy(()=>import("../layouts/Landing.js"))
const TrialBalance = lazy(()=>import("../views/ui/accounts/TrialBalance.js"))
const LoanProducts = lazy(()=>import("../views/ui/management/LoanProducts.js"))
const ArrearCollection = lazy(()=>import("../views/ui/activity/ArrearCollection.js"))
const ArrearClients = lazy(()=>import("../views/ui/ArrearClients.js"))
const LoanChartMaster = lazy(()=>import("../views/ui/management/LoanChartMaster.js"))
const ClientDisbursement = lazy(()=>import("../views/ui/ClientDisbursement.js"))
const AddGRT = lazy(()=>import("../views/ui/centers/GRT/AddGRT.js"))
const BranchMaster = lazy(()=>import("../views/ui/management/BranchMaster.js"))
const PrintDocs = lazy(()=>import("../views/PrintDocs.js"))
const PreviewDocs = lazy(()=>import("../views/PreviewDocs.js"))
const EmployeeMaster = lazy(()=>import("../views/ui/hr/EmployeeMaster.js"))
const UserAccess = lazy(()=>import("../views/ui/hr/UserAccess.js"))
const EditProfile = lazy(()=>import("../views/EditProfile.js"))
const BankMaster = lazy(()=>import("../views/ui/management/BankMaster.js"))
const EditEnrollment = lazy(()=>import("../views/ui/enrollment/EditEnrollment.js"))
const UpdateCIS = lazy(()=>import("../views/ui/enrollment/UpdateCIS.js"))
const ManageProduct = lazy(()=>import("../views/ui/management/ManageProduct.js"))

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/
const AccountLedger = lazy(()=> import("../views/ui/accounts/AccountLedger.js"))
const Dashboard = lazy(() => import("../views/Dashboard.js"));
const About = lazy(() => import("../views/About.js"));
const Enrollment = lazy(() => import("../views/ui/enrollment/Enrollment"));
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
      { path: "/edit-profile", exact: true, element: <EditProfile /> },
      { path: "/landing", exact: true, element: <Landing /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/new-enrollment", exact: true, element: <Enrollment /> },
      { path: "/search-enrolled", exact: true, element: <Enrollment /> },
      { path: "/add-enrollment", exact: true, element: <AddEnrollment /> },
      { path: "/update-cis", exact: true, element: <EditEnrollment /> },
      { path: "/edit-enrolled/:id", exact: true, element: <UpdateCIS /> },
      { path: "/center-master", exact: true, element: <CenterMaster /> },
      { path: "/meeting-handover", exact: true, element: <MeetingHandover /> },
      { path: "/center-visit", exact: true, element: <Visit /> },
      { path: "/center-adv-update", exact: true, element: <ADVUpdate /> },
      { path: "/client-adv-update", exact: true, element: <ClientADV /> },
      { path: "/client-grt", exact: true, element: <ClientGRT /> },
      { path: "/review-client/:id", exact: true, element: <AddGRT /> },
      { path: "/manage-products/:id?", exact: true, element: <ManageProduct /> },
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
      { path: "/employee-master", exact: true, element: <EmployeeMaster /> },
      { path: "/user-access", exact: true, element: <UserAccess /> },
      { path: "/management", exact: true, element: <Tables /> },
      { path: "/loan-products", exact: true, element: <LoanProducts /> },
      { path: "/bank-master", exact: true, element: <BankMaster /> },
      { path: "/loan-chart-master", exact: true, element: <LoanChartMaster /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/collections", exact: true, element: <Collections /> },
      { path: "/arrear-collection", exact: true, element: <ArrearCollection /> },
      { path: "/arrear-clients", exact: true, element: <ArrearClients /> },
      { path: "/day-close", exact: true, element: <DayClose /> },
      { path: "/credit-report", exact: true, element: <CreditReport /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      { path: "/print-documents", exact: true, element: <PrintDocs /> },
      { path: "/download-documents", exact: true, element: <PreviewDocs /> },
    ],
  },
];

export default ThemeRoutes;

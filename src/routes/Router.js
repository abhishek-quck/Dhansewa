import { lazy } from "react";
import { Navigate } from "react-router-dom"; 
import { ProtectedRoute } from './../middleware/ProtectedRoute.js'
import * as constant from "../constansts/permission.js";
/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/
const AddEnrollment = lazy(()=>import("../views/ui/enrollment/AddEnrollment.js"))
const ClientGRT = lazy(()=>import("../views/ui/centers/ClientGRT.js"))
const SpeedLoanDisburse = lazy(()=>import("../views/ui/group-loan/SpeedLoanDisburse.js"))
const InitLoan = lazy(()=>import("../views/ui/group-loan/InitLoan.js"))
const LedgerRevise = lazy(()=>import("../views/ui/advance-settings/LedgerRevise.js"))
const DataTruncate = lazy(()=>import("../views/ui/advance-settings/DataTruncate.js"))
const CreditReport = lazy(()=>import("../views/ui/CreditReport.js"))
const Collections = lazy(()=>import("../views/ui/activity/Collections.js"))
const PartialCollection = lazy(()=>import("../views/ui/activity/PartialCollection.js"))
const CenterCollection = lazy(()=>import("../views/ui/activity/CenterCollection.js"))
const DayInit = lazy(()=>import("../views/ui/activity/DayInit.js"))
const DayClose = lazy(()=>import("../views/ui/activity/DayClose.js"))
const CenterMaster = lazy(()=>import("../views/ui/centers/CenterMaster.js"))
const MeetingHandover = lazy(()=>import("../views/ui/centers/MeetingHandover.js"))
const Visit = lazy(()=>import("../views/ui/centers/Visit.js"))
const ADVUpdate = lazy(()=>import("../views/ui/centers/ADVUpdate.js"))
const ClientADV = lazy(()=>import("../views/ui/centers/ClientADV.js"))
const AccountHead = lazy(()=>import("../views/ui/accounts/AccountHead.js"))
const AccountMaster = lazy(()=>import("../views/ui/accounts/AccountMaster.js"))
const VoucherEntry = lazy(()=>import("../views/ui/accounts/VoucherEntry.js"))
const MultiVoucherEntry = lazy(()=>import("../views/ui/accounts/MultiVoucherEntry.js"))
const SaleProducts = lazy(()=>import("../views/ui/management/SaleProducts.js"))
const Auth = lazy(()=>import("../views/Auth.js"))
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
const UpdateCIS = lazy(()=>import("../views/ui/enrollment/UpdateCIS.js"))
const ManagePassbook = lazy(()=>import("../views/ui/enrollment/ManagePassbook.js"))
const ManageProduct = lazy(()=>import("../views/ui/management/ManageProduct.js"))
const AccountLedger = lazy(()=> import("../views/ui/accounts/AccountLedger.js"))
const Dashboard = lazy(() => import("../views/Dashboard.js"));
const Enrollment = lazy(() => import("../views/ui/enrollment/Enrollment"));
const EditEnrollment = lazy(()=>import("../views/ui/enrollment/EditEnrollment.js"))
const AddEnrolledCGT = lazy(() => import("../views/ui/enrollment/AddEnrolledCGT.js"));
const CGTEntry = lazy(() => import("../views/ui/enrollment/CGTEntry"));
const CibilUpload = lazy(() => import("../views/ui/enrollment/CibilUpload.js"));
const CreditAppraisal = lazy(() => import("../views/ui/enrollment/CreditAppraisal.js"));
const ManageClient = lazy(() => import("../views/ui/enrollment/ManageClient.js"));
const PrintSanctionLetter = lazy(() => import("../views/PrintSanctionLetter.js"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/login", exact: true, element:<Auth />},
      { path: "/edit-profile", exact: true, element: <EditProfile /> },
      { path: "/landing", exact: true, element: <Landing /> },
      { path: "/dashboard", 
        exact: true, 
        element: (
          <ProtectedRoute permission={constant.DASHBOARD}>
            <Dashboard />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "/new-enrollment", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.NEW_ENROLL}>
          <Enrollment />
        </ProtectedRoute>
        )
      },
      { 
        path: "/search-enrolled", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.SEARCH_ENROLL}>
          <Enrollment />
        </ProtectedRoute>
        )
      },
      { 
        path: "/cgt-entry", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.CGT_ENRTY}>
          <CGTEntry />
        </ProtectedRoute>
        )
      },
      { 
        path: "/manage-enrolled-cgt/:enroll_id", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.EDIT_ENROLL}>
          <AddEnrolledCGT />
        </ProtectedRoute>
        )
      },
      { 
        path: "/add-enrollment", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.ADD_ENROLL}>
          <AddEnrollment />
        </ProtectedRoute>
        )
      },
      { 
        path: "/update-cis", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.EDIT_ENROLL}>
          <EditEnrollment />
        </ProtectedRoute>
        )
      },
      { 
        path: "/cibil-upload", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.EDIT_ENROLL}>
          <CibilUpload />
        </ProtectedRoute>
        )
      },
      { 
        path: "/credit-appraisal", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.EDIT_ENROLL}>
          <CreditAppraisal />
        </ProtectedRoute>
        )
      },
      { 
        path: "/manage-client/:id", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.EDIT_ENROLL}>
          <ManageClient />
        </ProtectedRoute>
        )
      },
      { 
        path: "/print-sanction-letter/:loanId", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.EDIT_ENROLL}>
          <PrintSanctionLetter />
        </ProtectedRoute>
        )
      },
      { 
        path: "/edit-enrolled/:id", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.EDIT_ENROLL}>
          <UpdateCIS />
        </ProtectedRoute>
        )
      },
      { 
        path: "/manage-client-passbook", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.EDIT_ENROLL}>
          <ManagePassbook />
        </ProtectedRoute>
        )
      },
      { 
        path: "/center-master", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.MASTER_CENTER}>
          <CenterMaster />
        </ProtectedRoute>
        )
      },
      { 
        path: "/meeting-handover", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.MEETING_HANDOVER}>
          <MeetingHandover />
        </ProtectedRoute>
        )
      },
      { 
        path: "/center-visit", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.CENTER_VISIT}>
          <Visit />
        </ProtectedRoute>
        )
      },
      { 
        path: "/center-adv-update", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.ADV_UPDATE}>
          <ADVUpdate />
        </ProtectedRoute>
        )
      },
      { 
        path: "/client-adv-update", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.CLIENT_ADV_UPDATE}>
          <ClientADV />
        </ProtectedRoute>
        )
      },
      { 
        path: "/client-grt", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.CLIENT_GRT}>
          <ClientGRT />
        </ProtectedRoute>
        )
      },
      { 
        path: "/review-client/:id", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.ADD_GRT}>
          <AddGRT />
        </ProtectedRoute>
        )
      },
      { 
        path: "/manage-products/:id?", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.MANAGE_PRODUCT}>
          <ManageProduct />
        </ProtectedRoute>
        )
      },
      { 
        path: "/client-disbursement", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.CLIENT_DISB}>
          <ClientDisbursement />
        </ProtectedRoute>
        )
      },
      { 
        path: "/speed-loan-disburse", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.SPEED_LOAN_DISB}>
          <SpeedLoanDisburse />
        </ProtectedRoute>
        )
      },
      { 
        path: "/initiate-loan", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.SPEED_LOAN_DISB}>
          <InitLoan />
        </ProtectedRoute>
        )
      },
      { 
        path: "/ledger-revise", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.LEDGER}>
          <LedgerRevise />
        </ProtectedRoute>
        )
      },
      { 
        path: "/data-truncate", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.TRUNCATE}>
          <DataTruncate />
        </ProtectedRoute>
        )
      },
      { 
        path: "/branches-master", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.BRANCH_MASTER}>
          <BranchMaster />
        </ProtectedRoute>
        )
      },
      { 
        path: "/account-head", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.ACCOUNT}>
          <AccountHead />
        </ProtectedRoute>
        )
      },
      { 
        path: "/accounts-master", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.MASTER_ACCOUNT}>
          <AccountMaster />
        </ProtectedRoute>
        )
      },
      { 
        path: "/accounts-ledger-view", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.LEDGER}>
          <AccountLedger />
        </ProtectedRoute>
        )
      },
      { 
        path: "/trial-balance", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.TRIAL_BAL}>
          <TrialBalance />
        </ProtectedRoute>
        )
      },
      { 
        path: "/voucher-entry", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.VOUCHER_ENT}>
          <VoucherEntry />
        </ProtectedRoute>
        )
      },
      { 
        path: "/multi-voucher-entry", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.MUL_VOUCHER_ENT}>
          <MultiVoucherEntry />
        </ProtectedRoute>
        )
      },
      { 
        path: "/sale-products", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.SALE_PRODUCT}>
          <SaleProducts />
        </ProtectedRoute>
        )
      },
      { 
        path: "/employee-master", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.MASTER_EMPLOYEE}>
          <EmployeeMaster />
        </ProtectedRoute>
        )
      },
      { 
        path: "/user-access", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.USER_ACCESS}>
          <UserAccess />
        </ProtectedRoute>
        )
      },
      { 
        path: "/loan-products", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.LOAN_PRODUCT}>
          <LoanProducts />
        </ProtectedRoute>
        )
      },
      { 
        path: "/bank-master", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.MASTER_BANK}>
          <BankMaster />
        </ProtectedRoute>
        )
      },
      { 
        path: "/loan-chart-master", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.MASTER_LOAN}>
          <LoanChartMaster />
        </ProtectedRoute>
        )
      },
      { 
        path: "/collections", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.COLLECT}>
          <Collections />
        </ProtectedRoute>
        )
      },
      { 
        path: "/partial-collection", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.COLLECT}>
          <PartialCollection />
        </ProtectedRoute>
        )
      },
      { 
        path: "/view-center-collections/:branch_id?", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.CENTER_COLLECT}>
          <CenterCollection />
        </ProtectedRoute>
        )
      },
      { 
        path: "/arrear-collection", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.ARREAR_COLLECT}>
          <ArrearCollection />
        </ProtectedRoute>
        )
      },
      { 
        path: "/arrear-clients", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.ARREAR_CLIENT}>
          <ArrearClients />
        </ProtectedRoute>
        )
      },
      { 
        path: "/day-init", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.DAY_INIT}>
          <DayInit />
        </ProtectedRoute>
        )
      },
      { 
        path: "/day-close", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.DAY_CLOSE}>
          <DayClose />
        </ProtectedRoute>
        )
      },
      { 
        path: "/credit-report", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.CREDIT_REPORT}>
          <CreditReport />
        </ProtectedRoute>
        )
      },
      { 
        path: "/print-documents", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.PRINT_DOC}>
          <PrintDocs />
        </ProtectedRoute>
        )
      },
      { 
        path: "/download-documents", 
        exact: true, 
        element: (
        <ProtectedRoute permission={constant.DOWNLOAD_DOC}>
          <PreviewDocs />
        </ProtectedRoute>
        )
      },
    ],
  },
];

export default ThemeRoutes;

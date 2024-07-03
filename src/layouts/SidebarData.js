export const navigation= [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "bi bi-speedometer2",
    },
    {
      title: "Enrollment",
      href: "#",
      icon: "bi bi-person",
      name:'enroll',
      sub:[
        {
          title: "New Enrollment",
          href: "/new-enrollment",
        },
        {
          title: "Update CIS",
          href: "#",
        },
        {
          title: "Speed Enrollments",
          href: "#",
        },
      ],
      links:["/new-enrollment"]
    },
    {
      title: "Centers Info",
      href: "#",
      icon: "fa-solid bi-building -circle-arrow-right",
      name:'center',
      sub:[
        {
          title: "Center Master",
          href: "/center-master",
        },
        {
          title: "Client GRT",
          href: "/client-grt",
        },
        {
          title: "Meeting Handover",
          href: "/meeting-handover",
        },
        {
            title: "Center Visit",
            href: "/center-visit",
        },
        {
            title: "Center ADV Update",
            href: "/center-adv-update",
        },
        {
            title: "Client ADV Update",
            href: "/client-adv-update",
        },
      ],
      links:["/center-master","/client-grt","/meeting-handover","/center-visit","/center-adv-update","/client-adv-update"]
    },
    {
      title: "Accounts",
      href: "#", //   /buttons
      icon: "bi bi-book",
      name:'accounts',
      sub:[
        {
          title: 'Account Head',
          href:'/account-head'
        },
        {
          title: 'Accounts Master',
          href:'/accounts-master'
        },
        {
          title: 'Voucher Entry',
          href:'#'
        },
        {
          title: 'Multi Voucher Entry',
          href:'/voucher-entry'
        },
        {
          title: 'Voucher Editor',
          href:'#'
        }
      ],
      links:['/account-head','/accounts-master','/voucher-entry']
    },
    {
      title: "Group Loan",
      href: "#",
      icon: "bi bi-people",
      name:'group',
      sub:[
        {
          title: "Loan Proposal",
          href: "#",
        }, 
        {
            title: "Loan Approve",
            href: "#",
        },
        {
            title: "Cash Disbursement",
            href: "#",
        },
        {
            title: "Speed Loan Disburse",
            href: "/speed-loan-disburse",
        },
        {
            title: "Proposal Revise",
            href: "#",
        },
        {
            title: "Loan Switching",
            href: "#",
        } 
      ],
      links:["/speed-loan-disburse",]
    },
    {
      title: "Today Activity",
      href: "#",
      icon: "bi-clipboard-check",//fa-cart-shopping
      name:'activity',
      sub:[
        {
          title:'Center Collection',
          href:'/collections',
        },
        {
          title:'Partial Collection',
          href:'#',
        },
        {
          title:'Send DCR',
          href:'#',
        },
        {
          title:'Arrear Collection',
          href:'/arrear-collection',
        },
        {
          title:'Day Initialization',
          href:'#',
        },
        {
          title:'Day Close',
          href:'/day-close',
        }
      ],
      links:['/collections','/arrear-collection','/day-close',]
    },
    {
      title: "Management",
      href: "#", //  /management
      icon: "fa-solid bi-calendar-check",
      name:'management',
      sub:[
        {
          title:'Branches Master',
          href:'/branches-master'
        },
        {
          title:'Funding Agency',
          href:'#'
        },
        {
          title:'Funding Tranche',
          href:'#'
        },
        {
          title:'Utilization Master',
          href:'#'
        },
        {
          title:'Loan Products',
          href:'/loan-products'
        },
        {
          title:'Loan Chart Master',
          href:'/loan-chart-master'
        },
        {
          title:'Our Bank A/C',
          href:'/bank-master'
        },
        {
          title:'Bank IFSC Master',
          href:'#'
        },
        {
          title:'Sale Products',
          href:'/sale-products'
        },
        {
          title:'Notice Display',
          href:'#'
        }
      ],
      links:['/loan-products', '/sale-products']      
    },
    {
      title: "HR & Payroll",
      href: "#",
      icon: "bi bi-textarea-resize",
      name:'payroll',
      sub:[
        {
          title:'Employee Master',
          href:'#'
        },
        {
          title:'User Access',
          href:'#'
        },
        {
          title:'Salary Upload',
          href:'#'
        },
      ]
    },
    {
      title: "Credit Report",
      href: "/credit-report",
      icon: "fa-regular bi-folder2-open",
      name:''
    },
    {
      title: "Advance Setting",
      href: "#",
      icon: "bi-gear",
      sub:[
        {
          title: "Ledger Revise",
          href: "/ledger-revise",
        },
        {
          title: "Branch Go Back",
          href: "#",
        },
        {
          title: "Edit Loaning Info",
          href: "#",
        }, 
        {
          title: "Data Truncate",
          href: "#",
        }, 
        {
          title: "System Setup",
          href: "#",
        }, 
        {
          title: "Company Profile",
          href: "#",
        }, 
      ],
      name:'setting',
      links:["/ledger-revise",]
    },
    {
      title: "Insurance",
      href: "#", //about
      icon: "fa-brands fa-windows",
      name:'insurance',
      sub:[
        {
          title:'Client Claim',
          href:'#'
        },
        {
          title:'Hospi Cash Update',
          href:'#'
        },
        {
          title:'Policy Update',
          href:'#'
        }
      ]
    },
  ];
  
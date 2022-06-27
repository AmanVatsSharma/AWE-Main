// 'use client'
// import React, { useState } from "react";

// import HomeIcon from "@mui/icons-material/Home";
// import InboxIcon from "@mui/icons-material/Inbox";
// import SellRoundedIcon from "@mui/icons-material/SellRounded";
// import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
// import PermMediaRoundedIcon from "@mui/icons-material/PermMediaRounded";
// import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";
// import AdsClickRoundedIcon from "@mui/icons-material/AdsClickRounded";
// import PercentRoundedIcon from "@mui/icons-material/PercentRounded";
// import { Box, Typography } from "@mui/material";
// import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
// import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
// import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
// import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
// import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
// import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
// import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
// import InventoryIcon from '@mui/icons-material/Inventory';

// import { Sidebar, SidebarBody, SidebarLink, MobileSidebar } from '../ui/sidebar';

// import Link from "next/link";


// const sidebarMainListLinks = [
//     {
//         label: 'Home',
//         href: '/dashboard/home',
//         icon: (<HomeIcon fontSize="small" />)
//     },
//     {
//         label: 'Orders',
//         href: '/dashboard/orders',
//         icon: (<InboxIcon fontSize="small" />),
//         subLinks: [
//             {
//                 label: "Recent Orders",
//                 href: "/dashboard/orders/recent-orders",
//             },
//             {
//                 label: "All Orders",
//                 href: "/dashboard/orders",
//             },
//         ],
//     },
//     {
//         label: 'Products',
//         href: '/dashboard/products',
//         icon: (<SellRoundedIcon fontSize="small" />),
//         subLinks: [
//             {
//                 label: "All Products",
//                 href: "/dashboard/products",
//             },
//             {
//                 label: "Categories",
//                 href: "/dashboard/products/categories",
//             },
//         ],
//     },
//     {
//         label: 'Inventory',
//         href: '/dashboard/inventory',
//         icon: (<InventoryIcon fontSize="small" />)
//     },
//     {
//         label: 'Customers',
//         href: '/dashboard/customers',
//         icon: (<PersonRoundedIcon fontSize="small" />)
//     },
//     {
//         label: 'Content',
//         href: '/dashboard/content',
//         icon: (<PermMediaRoundedIcon fontSize="small" />)
//     },
//     {
//         label: 'Analytics',
//         href: '/dashboard/analytics',
//         icon: (<LeaderboardRoundedIcon fontSize="small" />)
//     },
//     {
//         label: 'Marketing',
//         href: '/dashboard/marketing',
//         icon: (<AdsClickRoundedIcon fontSize="small" />)
//     },
//     {
//         label: 'Discounts',
//         href: '/dashboard/discounts',
//         icon: (<PercentRoundedIcon fontSize="small" />)
//     },
// ]

// const sidebarSalesChannelsListLinks = [
//     {
//         label: 'Online Store',
//         href: '/dashboard/home',
//         icon: (<StoreRoundedIcon fontSize="small" />)
//     },
//     {
//         label: 'Inbox',
//         href: '/dashboard/home',
//         icon: (<ForwardToInboxRoundedIcon fontSize="small" />)
//     },
//     {
//         label: 'Meta Manager',
//         href: '/dashboard/home',
//         icon: (<FacebookRoundedIcon fontSize="small" />)
//     },
//     {
//         label: 'Campaign Manager',
//         href: '/dashboard/home',
//         icon: (<CampaignRoundedIcon fontSize="small" />)
//     },

// ]

// const sidebarAppsListLinks = [
//     {
//         label: 'Reveiws',
//         href: '/dashboard/home',
//         icon: (<RateReviewRoundedIcon fontSize="small" />)
//     },
// ]


// const DashboardSidebar = () => {

//     const [isActive, setIsActive] = useState()
//     const [open, setOpen] = useState(false);

//     return (
//         <div className="absolute left-1 top-1 md:left-0 md:top-0 md:relative">
//             <Sidebar open={open} setOpen={setOpen}>

//                 <SidebarBody className="bg-slate-200">

//                     <div className="mainList  mb-2">

//                         {sidebarMainListLinks.map((link, idx) => (
//                             <SidebarLink
//                                 className={`hover:bg-slate-100 rounded-md cursor-pointer gap-2 font-medium p-1 ${isActive ? 'bg-slate-50' : ''}`} key={idx}
//                                 link={link} />
//                         ))}
//                     </div>

//                     <Box className={`flex items-center justify-between p-2 cursor-pointer ${!open ? 'hidden' : ''}`}>
//                         <Typography variant="h6" fontSize={18} fontWeight={600}>
//                             Sales Channels
//                         </Typography>
//                         <ArrowForwardIosRoundedIcon fontSize="small" />
//                     </Box>

//                     {sidebarSalesChannelsListLinks.map((link, idx) => (
//                         <SidebarLink
//                             className={`hover:bg-slate-100 rounded-md cursor-pointer gap-2 font-medium p-1 ${isActive ? 'bg-slate-50' : ''}`}
//                             key={idx}
//                             link={link} />
//                     ))}

//                     <Box className={`flex items-center justify-between p-2 cursor-pointer ${!open ? 'hidden' : ''}`}>
//                         <Typography variant="h6" fontSize={18} fontWeight={600}>
//                             Apps
//                         </Typography>
//                         <ArrowForwardIosRoundedIcon fontSize="small" />
//                     </Box>

//                     {sidebarAppsListLinks.map((link, idx) => (
//                         <SidebarLink
//                             className={`hover:bg-slate-100 rounded-md cursor-pointer gap-2 font-medium p-1 ${isActive ? 'bg-slate-50' : ''}`}
//                             key={idx} link={link} />
//                     ))}

//                     <SidebarLink
//                         className={`flex items-center hover:bg-slate-100 rounded-md cursor-pointer gap-2 font-medium p-1 ${isActive ? 'bg-slate-50' : ''}`}
//                         link={{
//                             label: "Settings",
//                             href: "/dashboard/settings",
//                             icon: (
//                                 <SettingsRoundedIcon fontSize="small" />
//                             ),
//                         }}
//                     />

//                 </SidebarBody>
//             </Sidebar>
//         </div>

//     );
// };

// export default DashboardSidebar;


'use client'
import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import InboxIcon from "@mui/icons-material/Inbox";
import SellRoundedIcon from "@mui/icons-material/SellRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PermMediaRoundedIcon from "@mui/icons-material/PermMediaRounded";
import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";
import AdsClickRoundedIcon from "@mui/icons-material/AdsClickRounded";
import PercentRoundedIcon from "@mui/icons-material/PercentRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Box, Typography } from "@mui/material";

import { Sidebar, SidebarBody, SidebarLink } from '../ui/sidebar';
import { CalculatorIcon, PlusIcon, SearchIcon, TruckIcon, ChartPie, FilePieChartIcon } from "lucide-react";
import { IconInvoice } from "@tabler/icons-react";

const sidebarMainListLinks = [
    {
        label: 'Home',
        href: '/dashboard/home',
        icon: (<HomeIcon fontSize="small" />)
    },
    {
        label: 'Orders',
        href: '/dashboard/orders',
        icon: (<InboxIcon fontSize="small" />),
        subLinks: [
            {
                label: "Recent Orders",
                href: "/dashboard/orders/recent-orders",
            },
            {
                label: "All Orders",
                href: "/dashboard/orders",
            },
        ],
    },
    {
        label: 'Products',
        href: '/dashboard/products',
        icon: (<SellRoundedIcon fontSize="small" />),
        subLinks: [
            {
                label: "All Products",
                href: "/dashboard/products",
            },
            {
                label: "Categories",
                href: "/dashboard/products/categories",
            },
            {
                label: "Collections",
                href: "/dashboard/products/collections",
            },
        ],
    },
    {
        label: 'Inventory',
        href: '/dashboard/inventory',
        icon: (<InventoryIcon fontSize="small" />)
    },
    {
        label: 'Customers',
        href: '/dashboard/customers',
        icon: (<PersonRoundedIcon fontSize="small" />)
    },
    {
        label: 'Content',
        href: '/dashboard/content',
        icon: (<PermMediaRoundedIcon fontSize="small" />)
    },
    {
        label: 'Analytics',
        href: '/dashboard/analytics',
        icon: (<LeaderboardRoundedIcon fontSize="small" />)
    },
    {
        label: 'Marketing',
        href: '/dashboard/marketing',
        icon: (<AdsClickRoundedIcon fontSize="small" />)
    },
    {
        label: 'Discounts',
        href: '/dashboard/discounts',
        icon: (<PercentRoundedIcon fontSize="small" />)
    },
]

const sidebarSalesChannelsListLinks = [
    {
        label: 'Online Store',
        href: '/dashboard/home',
        icon: (<StoreRoundedIcon fontSize="small" />)
    },
    {
        label: 'Inbox',
        href: '/dashboard/home',
        icon: (<ForwardToInboxRoundedIcon fontSize="small" />)
    },
    {
        label: 'Meta Manager',
        href: '/dashboard/home',
        icon: (<FacebookRoundedIcon fontSize="small" />)
    },
    {
        label: 'Campaign Manager',
        href: '/dashboard/home',
        icon: (<CampaignRoundedIcon fontSize="small" />)
    },

]

const sidebarAppsListLinks = [
    {
        label: 'Reveiws',
        href: '/dashboard/home',
        icon: (<RateReviewRoundedIcon fontSize="small" />)
    },
    {
        label: 'Shipments',
        href: '/dashboard/shipments',
        icon: (<LocalShippingIcon fontSize="small" />),
        subLinks: [        
            { 
                icon: (<PlusIcon/>), 
                label: 'Create Shipment', 
                href: '/dashboard/shipments/shipment-management' 
            },
            { 
                icon: (<TruckIcon/>), 
                label: 'Track Shipment', 
                href: '/dashboard/shipments/track-shipments' 
            },
            { 
                icon: (<CalculatorIcon/>), 
                label: 'Calculate Rates', 
                href: '/dashboard/shipments/rate-calculation' 
            },
            { 
                icon: (<SearchIcon/>), 
                label: 'Search Orders', 
                href: '/dashboard/shipments/order-management' 
            },
            { 
                icon: (<FilePieChartIcon/>), 
                label: 'Analytics', 
                href: '/dashboard/shipments/reports-and-analytics' 
            },
            { 
                icon: (<IconInvoice/>), 
                label: 'Billings', 
                href: '/dashboard/shipments/billings' 
            },
    ]
    }
]

const DashboardSidebar = () => {
    const [isActive, setIsActive] = useState(null);

    return (
        <Sidebar>
            <SidebarBody className="bg-slate-200 flex flex-col h-full">
                <div className="flex-grow overflow-y-auto overflow-x-hidden">
                    <div className="mainList mb-2">
                        {sidebarMainListLinks.map((link, idx) => (
                            <SidebarLink
                                key={idx}
                                className={`hover:bg-slate-100 rounded-md cursor-pointer gap-2 font-medium p-1 ${isActive === idx ? 'bg-slate-50' : ''}`}
                                link={link}
                                onClick={() => setIsActive(idx)}
                            />
                        ))}
                    </div>

                    <SidebarMenu
                        title="Sales Channels"
                        links={sidebarSalesChannelsListLinks}
                        isActive={isActive}
                        setIsActive={setIsActive}
                        startIndex={sidebarMainListLinks.length}
                    />

                    <SidebarMenu
                        title="Apps"
                        links={sidebarAppsListLinks}
                        isActive={isActive}
                        setIsActive={setIsActive}
                        startIndex={sidebarMainListLinks.length + sidebarSalesChannelsListLinks.length}
                    />
                </div>

                <div className="mt-auto">
                    <SidebarLink
                        className={`flex items-center hover:bg-slate-100 rounded-md cursor-pointer gap-2 font-medium p-1 ${isActive === 'settings' ? 'bg-slate-50' : ''}`}
                        link={{
                            label: "Settings",
                            href: "/dashboard/settings",
                            icon: <SettingsRoundedIcon fontSize="small" />
                        }}
                        onClick={() => setIsActive('settings')}
                    />
                </div>
            </SidebarBody>
        </Sidebar>
    );
};

// New SidebarMenu component
const SidebarMenu = ({ title, links, isActive, setIsActive, startIndex }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="mb-2">
            <Box
                className="flex items-center justify-between p-2 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Typography variant="h6" fontSize={18} fontWeight={600}>
                    {title}
                </Typography>
                <ArrowForwardIosRoundedIcon
                    fontSize="small"
                    className={`transform transition-transform ${isOpen ? 'rotate-90' : ''}`}
                />
            </Box>
            {isOpen && links.map((link, idx) => (
                <SidebarLink
                    key={idx}
                    className={`hover:bg-slate-100 rounded-md cursor-pointer gap-2 font-medium p-1 ${isActive === startIndex + idx ? 'bg-slate-50' : ''}`}
                    link={link}
                    onClick={() => setIsActive(startIndex + idx)}
                />
            ))}
        </div>
    );
};

export default DashboardSidebar;
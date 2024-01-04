import React, { useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as FaIcon from "react-icons/fa";
import * as GrIcon from "react-icons/gr";
import * as BsIcon from "react-icons/bs";
import * as MdIcon from "react-icons/md";
import * as SiIcon from "react-icons/si";
import * as BiIcons from "react-icons/bi";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { BiFoodMenu } from "react-icons/bi";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { HiUsers } from "react-icons/hi";
import { TbPackage } from "react-icons/tb";
import { TbFileInvoice } from "react-icons/tb";
import { MdBackupTable } from "react-icons/md";
import { RiFileInfoLine } from "react-icons/ri";
import { RiArrowGoBackFill } from "react-icons/ri";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import { MdMiscellaneousServices } from "react-icons/md";
import { SiEquinixmetal } from "react-icons/si";
import { FiSliders } from "react-icons/fi";
import { TiFlowSwitch } from "react-icons/ti";
import { TbListDetails } from "react-icons/tb";
import { MdArrowDropDown } from "react-icons/md";
import { FaRegDotCircle } from "react-icons/fa";

export const PakingInvSidebar = [
  {
    title: "Inspection",
    icon: <RiFileInfoLine />,
    subNav: [
      {
        title: "Profile/Fabrication/Services",
        // path: "/PackingAndInvoices/Inspection/Main",
        icon: <TiFlowSwitch />,
        subNav: [
          {
            title: "ScheduleList",
            path: "/PackingAndInvoices/Inspection/ScheduleList",
            icon: <BsReverseLayoutTextWindowReverse />,
          },
          {
            title: "FindSchedule",
            path: "/PackingAndInvoices/Inspection/FindSchedule",
            icon: <TbListDetails />,
          },
        ],
      },

      // {
      //   title: "Fabrication",

      //   icon: <AiIcons.AiOutlineDeploymentUnit />,

      //   subNav: [
      //     {
      //       title: "ScheduleList",
      //       path: "/PackingAndInvoices/fabrication/ScheduleList",
      //       icon: <AiIcons.AiOutlineArrowRight />,
      //     },

      //     {
      //       title: "FindSchedule",
      //       path: "/PackingAndInvoices/fabrication/FindSchedule",
      //       icon: <AiIcons.AiOutlineArrowRight />,
      //     },
      //   ],
      // },

      // {
      //   title: "Services",
      //   icon: <MdIcon.MdOutlineOtherHouses />,
      //   subNav: [
      //     {
      //       title: "ScheduleList",
      //       path: "/PackingAndInvoices/service/ScheduleList",
      //       icon: <AiIcons.AiOutlineArrowRight />,
      //     },

      //     {
      //       title: "FindSchedule",

      //       path: "/PackingAndInvoices/service/FindSchedule",

      //       icon: <AiIcons.AiOutlineArrowRight />,
      //     },
      //   ],
      // },
    ],
  },
  {
    title: "Packing Note",
    icon: <TbPackage />,
    // icon: <BiIcons.BiPurchaseTag />,

    subNav: [
      {
        title: "Fabrication",
        icon: <AiOutlineDeploymentUnit />,

        path: "/PackingAndInvoices/PackingNote/FabricationOpenForm",
      },

      {
        title: "Services",

        icon: <MdMiscellaneousServices />,

        path: "/PackingAndInvoices/PackingNote/ServicesOpenForm",
      },

      {
        title: "Profile",

        icon: <FiSliders />,

        path: "/PackingAndInvoices/PackingNote/ProfileOpenForm",
      },

      {
        title: "Misc",

        icon: <SiEquinixmetal />,

        path: "/PackingAndInvoices/PackingNote/MiscOpenForm",
      },
    ],
  },

  {
    title: "Invoice",
    icon: <TbFileInvoice />,
    subNav: [
      {
        title: "Misc Invoice ",
        icon: <TbFileInvoice />,
        subNav: [
          {
            title: "Create New",
            icon: <AiIcons.AiOutlineArrowRight />,
            path: "/PackingAndInvoices/Invoice/MiscInvoice/CreateNew",
          },
          {
            title: "PN List",
            icon: <AiIcons.AiOutlineArrowRight />,
            path: "/PackingAndInvoices/Invoice/MiscInvoice/PNList",
          },
          {
            title: "Invoice List",
            icon: <AiIcons.AiOutlineArrowRight />,
            path: "/PackingAndInvoices/Invoice/MiscInvoice/InvoiceList",
          },
        ],
      },
      {
        title: "Material Scrap Invoice",
        icon: <TbFileInvoice />,
        subNav: [
          {
            title: "Scrap",
            icon: <AiIcons.AiOutlineArrowRight />,
            path: "/PackingAndInvoices/Invoice/MaterialScrapInvoice/Scrap",
          },
          {
            title: "Material Return",
            icon: <AiIcons.AiOutlineArrowRight />,
            path: "/PackingAndInvoices/Invoice/MaterialScrapInvoice/MaterialReturn",
          },
          {
            title: "PN List",
            icon: <AiIcons.AiOutlineArrowRight />,
            subNav: [
              {
                title: "Scrap",
                icon: <FaRegDotCircle />,
                path: "/PackingAndInvoices/Invoice/MaterialScrapInvoice/PNList/Scrap",
              },
              {
                title: "Material",
                icon: <FaRegDotCircle />,
                path: "/PackingAndInvoices/Invoice/MaterialScrapInvoice/PNList/Material",
              },
            ],
          },
          {
            title: "Invoice List",
            icon: <AiIcons.AiOutlineArrowRight />,
            path: "/PackingAndInvoices/Invoice/MaterialScrapInvoice/InvoiceList",
          },
          {
            title: "Create New",
            icon: <AiIcons.AiOutlineArrowRight />,
            path: "/PackingAndInvoices/Invoice/MaterialScrapInvoice/CreateNew",
          },
        ],
      },
      {
        title: "Services Invoice",
        icon: <TbFileInvoice />,
        path: "/PackingAndInvoices/Invoice/ServicesInvoice",
      },
      {
        title: "Sales Invoice",
        icon: <TbFileInvoice />,
        path: "/PackingAndInvoices/Invoice/SalesInvoice",
        // path:''
      },
      {
        title: "Fabrication Invoice",
        icon: <TbFileInvoice />,
        path: "/PackingAndInvoices/Invoice/FabricationInvoice",
        // path:''
      },
    ],
    // path:''
  },

  // {
  //   title: "SetUp",

  //   // path: "/materialmanagement/receipt/branchtransfer",

  //   icon: <AiIcons.AiOutlineBranches />,
  // },

  {
    title: "ReturnableDC",
    icon: <MdBackupTable />,
    subNav: [
      {
        title: "Create New",
        icon: <VscGitPullRequestCreate />,
        path: "/PackingAndInvoices/ReturnableDC/DCCreateNew",
      },

      {
        title: "DC List",
        icon: <BsReverseLayoutTextWindowReverse />,
        // path: "/PackingAndInvoices/ReturnableDC/DCList",
        subNav: [
          {
            title: "Created",
            icon: <AiIcons.AiOutlineArrowRight />,
            path: "/PackingAndInvoices/ReturnableDC/DCList/DCListCreated",
          },

          {
            title: "Dispatched",
            icon: <AiIcons.AiOutlineArrowRight />,
            path: "/PackingAndInvoices/ReturnableDC/DCList/DCListDispatched",
          },

          {
            title: "Closed",
            icon: <AiIcons.AiOutlineArrowRight />,
            path: "/PackingAndInvoices/ReturnableDC/DCList/DCListClosed",
          },

          {
            title: "All",
            icon: <AiIcons.AiOutlineArrowRight />,
            path: "/PackingAndInvoices/ReturnableDC/DCList/DCListAll",
          },
        ],
      },
    ],
  },

  {
    title: "Previous Menu",

    path: "/salesHome",

    icon: <RiArrowGoBackFill />,

    iconClosed: <RiIcons.RiArrowDownSFill />,

    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
];

export const adminSidebar = [
  {
    title: "Users",
    // path: "/customer",
    icon: <FaIcon.FaUsers />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Roles",
        path: "/admin/roles",
        icon: <VscTypeHierarchySub />,
      },
      {
        title: "Users",
        path: "/admin/users",
        icon: <HiUsers />,
      },
    ],
  },
  {
    title: "Access",
    // path: "/customer",
    icon: <FaIcon.FaUsers />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Role Mapping",
        path: "/admin/mapping",
        icon: <VscTypeHierarchySub />,
      },
    ],
  },
  {
    title: "Previous Menu",
    path: "/home",
    icon: <MdIcon.MdPreview />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
];

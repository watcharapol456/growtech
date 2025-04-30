import { ISidebarItemAdmin } from "@/types/share";
import { ISidebarItem } from "@/types/share";

export const Sidebar_Menu = [
    {
        imgURL : "/assets/layout-dashboard.svg",
        route : "/dashboard",
        label : "Dashboard"
    },
    {
        imgURL : "/assets/file.svg",
        route : "/report",
        label : "Report"
    },

    {
        imgURL : "/assets/cctv.svg",
        route : "https://cmmlab.kmutt.ac.th/ESP32CAM/",
        label : "Camera Feed"
    },
    {
        imgURL : "/assets/clipboard-plus.svg",
        route : "/userreport",
        label : "User report"
    },
    
] as ISidebarItem [];
export const Sidebar_General = [
    {
        imgURL : "/assets/sliders-horizontal.svg",
        route : "/",
        label : "Settings"
    },


    
]as ISidebarItem [];

export const Sidebar_Menu_Admin = [
    {
        imgURL : "/assets/layout-dashboard.svg",
        route : "/admin/dashboard",
        label : "Dashboard"
    },
    {
        imgURL : "/assets/file.svg",
        route : "/admin/report",
        label : "Report"
    },
    {
        imgURL : "/assets/clipboard-plus.svg",
        route : "/admin/userreport",
        label : "User report"
    },
    {
        imgURL : "/assets/picture-in-picture-2.svg",
        route : "http://localhost:1880/ui",
        label : "Remote",
    
    },
    {
        imgURL : "/assets/cctv.svg",
        route : "https://cmmlab.kmutt.ac.th/ESP32CAM/",
        label : "Camera Feed"
    },
    {
        imgURL : "/assets/user.svg",
        route : "/admin/member",
        label : "Member"
    },
    
] as ISidebarItemAdmin [];
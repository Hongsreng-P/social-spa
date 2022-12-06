import { NavItemData } from "~/constants/types";

export const leftNavItemData: NavItemData[] = [
    {
        route: "/",
        itemName: "Home"
    },
    {
        route: "/favorite",
        itemName: "Favorite"
    },
    {
        route: "/menu",
        itemName: "Menu"
    },
    {
        route: "/message",
        itemName: "!Direct Message"
    },
    {
        route: "/posts/admin",
        itemName: "Manage Posts"
    },
    {
        route: "/messenger",
        itemName: "Messenger"
    },
    {
        route: "/video",
        itemName: "Video"
    },
    {
        route: "/profile",
        itemName: "My profile"
    },
];

export const unAuthenticatedNavItem: NavItemData[] = [
    {
        route: "/login",
        itemName: "Login",
    }, 
    {
        route: "/signup",
        itemName: "Sign up",
    }
];
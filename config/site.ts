export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Minesweeper",
    description: "Fun game",
    navItems: [
        {
            label: "Minesweeper",
            href: "/",
        },
        {
            label: "Results",
            href: "/results",
        },
    ],
    navMenuItems: [
        {
            label: "Logout",
            href: "/logout",
        },
    ],
    navMenuItemsMobile: [
        {
            label: "Minesweeper",
            href: "/",
        },
        {
            label: "Results",
            href: "/results",
        },
        {
            label: "Logout",
            href: "/logout",
        },
    ]
};

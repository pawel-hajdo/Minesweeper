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
            label: "Ranking",
            href: "/ranking",
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
            label: "Ranking",
            href: "/ranking",
        },
        {
            label: "Logout",
            href: "/logout",
        },
    ]
};

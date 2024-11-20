"use client"
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarItem,
    NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/dropdown";
import {Avatar} from "@nextui-org/avatar";
import {usePathname} from "next/navigation";
import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";
import {getUsername} from "@/lib/utils";

export const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [username, setUsername] = useState('');

    useEffect(() => {
        setUsername(getUsername());
    }, [getUsername()]);

    const handleLogout = async () => {
        try {
            await fetch("/api/logout", {
                method: "POST",
                credentials: "include",
            });
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const hiddenPaths = ["/login", "/register"];
    if (hiddenPaths.includes(pathname)) {
        return null;
    }

    return (
        <NextUINavbar maxWidth="xl" position="sticky" isBordered className="p-1">
            <NavbarContent className="basis-1/5 sm:basis-full " >
                <ul className="hidden lg:flex gap-4 justify-start ml-2">
                    {siteConfig.navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <NavbarItem key={item.href}>
                                <NextLink
                                    className={clsx(
                                        linkStyles({ color: isActive ? "primary" : "foreground" }),
                                        "data-[active=true]:text-primary data-[active=true]:font-medium",
                                        isActive && "font-medium text-primary"
                                    )}
                                    href={item.href}
                                >
                                    {item.label}
                                </NextLink>
                            </NavbarItem>
                        );
                    })}
                </ul>
            </NavbarContent>

            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <span className="text-sm">{username}</span>
                <Dropdown placement="bottom-start">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name={username || "User"}
                            size="sm"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile menu">
                        {siteConfig.navMenuItems.map((item) => (
                            item.label === "Logout" ? (
                                <DropdownItem
                                    key={item.href}
                                    color="danger"
                                    onClick={handleLogout}
                                    className="text-danger"
                                >
                                    {item.label}
                                </DropdownItem>
                            ) : (
                                <DropdownItem key={item.href} href={item.href}>
                                    {item.label}
                                </DropdownItem>
                            )
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>

            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarMenu>
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navMenuItemsMobile.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            {item.label === "Logout" ? (
                                <Link
                                    color="danger"
                                    onClick={handleLogout}
                                    size="lg"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <Link
                                    color="foreground"
                                    href={item.href}
                                    size="lg"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </NextUINavbar>
    );
};

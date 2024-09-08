"use client"
import React from 'react'
import Header from "@/components/header/Header";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { ApolloProvider } from '@apollo/client';
import client from '@/ApolloClient/apolloClient';

type Props = {}

const navItems = [
    {
        name: "Home",
        link: "/",
        icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
        name: "About",
        link: "/about",
        icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
        name: "Contact",
        link: "/contact",
        icon: (
            <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
        ),
    },
];

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <ApolloProvider client={client}>

                <Header />
                <FloatingNav navItems={navItems} />
                {children}
            </ApolloProvider>
        </div>
    )
}

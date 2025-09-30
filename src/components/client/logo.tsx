'use client';
import React from 'react';
import Logo from "public/Finaa-Logo.svg"
import DarkLogo from "public/finaa-black.svg"
import Image from 'next/image';
import { useTheme } from '@payloadcms/ui';

const Component = () => {

    const { theme } = useTheme()

    return (
        <div style={{ color: "black" }} >
            <Image
                src={theme == "dark" ? Logo : DarkLogo}
                alt={'SVG Image'}
                width={200}
                height={100}
            />
        </div>
    );
};

export default Component;

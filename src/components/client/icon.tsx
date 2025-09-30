'use client';
import React from 'react';
import DarkLogo from "public/Finaa-letter-icon.svg"
import Image from 'next/image';
import { useTheme } from '@payloadcms/ui';

const Logo = () => {

    const { theme } = useTheme()

    return (
        <Image
            src={theme == "dark" ? DarkLogo : DarkLogo}
            alt={'SVG Image'}

        />
    );
};

export default Logo;

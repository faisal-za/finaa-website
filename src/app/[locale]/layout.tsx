import React from 'react'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../globals.css'

const latinoGothicLight = localFont({
  src: '../../../public/fonts/Latino-Gothic-Font/LatinoGothic-Light.otf',
  variable: '--font-latino-light',
  weight: '300',
})

const latinoGothicRegular = localFont({
  src: '../../../public/fonts/Latino-Gothic-Font/LatinoGothic-Regular.otf',
  variable: '--font-latino-regular',
  weight: '400',
})

const latinoGothicMedium = localFont({
  src: '../../../public/fonts/Latino-Gothic-Font/LatinoGothic-Medium.otf',
  variable: '--font-latino-medium',
  weight: '500',
})

const latinoGothicBold = localFont({
  src: '../../../public/fonts/Latino-Gothic-Font/LatinoGothic-Bold.otf',
  variable: '--font-latino-bold',
  weight: '700',
})

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'metadata'});

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: ['/Finaa-Logo.svg'],
      locale: locale,
      alternateLocale: locale === 'ar' ? 'en' : 'ar',
    },
    alternates: {
      languages: {
        'ar': '/ar',
        'en': '/en',
        'x-default': '/ar'
      }
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const {locale} = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body
        className={`${latinoGothicRegular.variable} ${latinoGothicLight.variable} ${latinoGothicMedium.variable} ${latinoGothicBold.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
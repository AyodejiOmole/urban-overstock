import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();


import NotificationProvider from '@/context/NotificationContext';
import ClientProvider from '@/components/ClientProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Urban Overstock',
  description: 'Urban Overstock',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js"></Script>
      <body className={inter.className}>
        <ClientProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </ClientProvider>
      </body>
      {/* <script type="text/javascript">
        (function(){
            emailjs.init({
              publicKey: "YbrQltdijHhFWYz8S",
            })
        })();
      </script> */}
    </html>
  );
}

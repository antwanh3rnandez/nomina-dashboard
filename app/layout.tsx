import { title } from 'process';
import { poppins } from './ui/fonts';
import './ui/global.css';
import { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from './lib/context-session';
import { ThemeProvider } from './lib/context-theme';

export const metadata: Metadata = {
  title: {
    template: '%s | Nomina Dashboard',
    default: 'Nomina Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  /* metadataBase: new URL('https://nomina-dashboard.vercel.app'), */
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${poppins.className} antialiased dark:bg-[#606060] dark:bg-opacity-20`}
      >
        <ThemeProvider>
          <SessionProvider>
            <Toaster position="bottom-right" />
            {children}
            {/* <footer className='py-10 flex justify-center items-center'>Nomina Dashboard by ❤️ Gethy</footer> */}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

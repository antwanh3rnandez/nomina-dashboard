import { poppins } from './ui/fonts';
import './ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${poppins.className} antialiased`}>
        {children}
        <footer className='py-10 flex justify-center items-center'>Nomina Dashboard by ❤️ Gethy</footer>
      </body>
    </html>
  );
}

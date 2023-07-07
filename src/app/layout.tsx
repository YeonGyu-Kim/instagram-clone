import Navbar from '@/components/Navbar';
import './globals.css';
import { Open_Sans } from 'next/font/google';
import AuthContext from '@/context/AuthContext';
import SWRConfigContext from '@/context/SWRConfigContext';
import { Metadata } from 'next';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Stargram',
    template: 'Stargram | %s',
  },
  description: 'Stargram Photos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${openSans.className} bg-bg-gray text-font-white`}>
        <AuthContext>
          <div className='flex'>
            <Navbar />
            <main className='w-full'>
              <SWRConfigContext>{children}</SWRConfigContext>
            </main>
          </div>
        </AuthContext>
        <div id='portal'></div>
      </body>
    </html>
  );
}

import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';
import Image from 'next/image';
import { lusitana, poppins } from '../ui/fonts';
import { phrases } from '../lib/phrases';

export const metadata: Metadata = {
  title: 'Login',
}
 
export default function LoginPage() {

  const isOpen = true;

  const phrase = phrases[Math.floor(Math.random() * phrases.length)];

  return (
    <main className="flex h-screen items-center justify-center bg-gradient-to-b from-zinc-200 to-gray-400">
      <div className="mx-6 flex h-[80%] w-full max-w-6xl rounded-xl bg-white shadow-2xl md:mx-0">
        <div className="relative hidden flex-1 md:block">
          <Image
            className="absolute z-0 h-full w-full rounded-s-xl object-cover"
            src="/login.gif"
            width={550}
            height={530}
            alt="Login"
            unoptimized
          />
          <div className="absolute bottom-0 right-0 z-10 w-full rounded-bl-xl bg-black bg-opacity-60 px-5 py-3 text-end">
            <h1 className={`font-light italic text-white`}>
              {`"${phrase.phrase}"`}
            </h1>
            <h2 className="mt-0 text-white">{phrase.author}</h2>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <div className="mb-8">
              {/* <Logo color="black" /> */}
              <div
                className={`${poppins.className} flex ${
                  isOpen ? 'text-md flex-row' : 'flex-col'
                } items-center justify-center leading-none text-black`}
              >
                <Image
                  src="/logo.png"
                  alt="Hola"
                  width={10}
                  height={10}
                  className={`${isOpen ? 'mr-2 h-10 w-10' : 'mb-2 w-10'}`}
                />
                <p className={`${isOpen ? 'text-3xl' : 'text-lg'}`}>Gethy</p>
              </div>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
import { auth } from '@/configs/firebase';
import { signOut } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
        router.push('/login');
        console.log('Signed out successfully');

        localStorage.removeItem('email');
        localStorage.removeItem('token');
      })
      .catch((error) => {
        console.log('can nou sign out' + error);
      });
  };
  const localStoredEmail = localStorage.getItem('email');
  return (
    <div className="bg-black">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <header className="flex items-center justify-between py-4 md:py-8">
          {/* logo - start */}
          <a
            href="/"
            className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
            aria-label="logo"
          >
            <Image
              width={55}
              height={45}
              className='rounded-full'
              alt='unable to load logo'
             src='/logo.jpg'
            >
            </Image>
            Blog
          </a>
          {/* logo - end */}

          {/* buttons - start */}
          <div className="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
          <p className='text-white'>{localStoredEmail}</p>

            <button
              onClick={handleLogout}
              className="inline-block rounded-lg px-4  text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:text-indigo-500 focus-visible:ring active:text-indigo-600 md:text-base"
            >
              Logout
            </button>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Menu
          </button>
          {/* buttons - end */}
        </header>
      </div>
    </div>
  );
};

export default Navbar;

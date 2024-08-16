'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

export default function Example() {

  const router = useRouter();  
  function singout() {    
    axios
      .post(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/logout") // Fixed the request payload
      .then((res) => {  
        sessionStorage.removeItem("token")
        router.push('/');
      })
      .catch((err) => {
        console.error("Error sing out:", err);
        toast.error(
          "An error occurred during Sign out. Please try again later."
        );
      });
  }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-1 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <img className="h-12 rounded-full" src="/admin.png" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <button
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              onClick={singout}
            >
              Sign out
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}

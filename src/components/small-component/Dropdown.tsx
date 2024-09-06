'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import axios from "@/app/apis/axios";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";

interface Authority {
  authority: string;
}

interface UserInfoInterface {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  name?: string;
  lastName?: string;
  role?: string;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
  enabled?: boolean;
  authorities?: Authority[];
}

interface Props {
  userInfo: UserInfoInterface;
}

export default function Dropdown({ userInfo }: Props) {
  const router = useRouter();  

  const [modalShow, setModalShow] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function singout() {    
    axios
      .post(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/logout") // Fixed the request payload
      .then((res) => {  
        sessionStorage.removeItem("token")
        if (typeof window !== "undefined") {
          router.push('/')
        }
      })
      .catch((err) => {
        console.error("Error sing out:", err);
        toast.error(
          "An error occurred during Sign out. Please try again later."
        );
      });
  }
  function changePassword(){
    if (!currentPassword) {
      toast.error("Current Password is required");
      return;
    }
    if (!newPassword) {
      toast.error("New Password field is required");
      return;
    }
    if (!confirmPassword) {
      toast.error("Confirm password field is required");
      return;
    }
    if (confirmPassword != newPassword) {
      toast.error("Please confirm your password correctly");
      return;
    }
    axios
      .post('/user/reset', {
        currentPassword: currentPassword,
        newPassword: newPassword
      })
      .then(res => {
        toast.success('Password is updated successfully!');
        setModalShow(false)
      })
      .catch(error => {
        toast.error(error?.response?.data);
      })
  }
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-1 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 items-center">
            <img className="h-12 rounded-full" src="/admin.png" />
            {
              userInfo.name && <span className="font-bold px-2">{userInfo.name}</span>
            }            
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
                onClick={() => setModalShow(true)}
              >
                Change Password
              </button>
            </MenuItem>
          </div>
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
      {modalShow && (
        <Modal open={modalShow} onClose={() => setModalShow(false)} className=''>
          <div className="text-start">
            <div className=" my-4">
              <label>
                Current Password:
                </label>
                <input
                  onChange={(e) =>
                    setCurrentPassword(e.target.value)
                  }
                  type="password"
                  value={currentPassword}
                  placeholder="Current Password"
                  className="my-2 border-gray-500 rounded-md p-2 border w-full text-black"
                  required
                />
              <label>
                New Password:
                <input
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  type="password"
                  value={newPassword}
                  placeholder="New Password"
                  className="my-2 border-gray-500 rounded-md p-2 border w-full text-black"
                  required
                />
              </label>
              <label>
                Confirm Password:
                <input
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  className="my-2 border-gray-500 rounded-md p-2 border w-full text-black"
                  required
                />
              </label>
            </div>
            <div className="flex justify-end gap-4">
              <button className="text-white bg-blue-500 rounded-md px-2 py-1" onClick={changePassword}>
                Change
              </button>
              <button
                className="bg-gray-400 rounded-md px-2 py-1 text-white"
                onClick={() => setModalShow(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

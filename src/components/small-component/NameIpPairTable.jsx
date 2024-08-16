"use client";

import Modal from "./Modal";
import { useEffect, useState } from "react";
import {
  ArchiveBoxXMarkIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import axios from "@/app/apis/axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NameIpPairTable() {
  const router = useRouter();
  const columns = ["id", "name", "IP address", "Action"];
  const [datas, setDatas] = useState([]);
  const [addData, setAddData] = useState({ name: "", ipAddress: "" });
  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    ipAddress: "",
  });
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [chooseItem, setItem] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    getPairs();
  }, []);

  function getPairs() {
    axios
      .get('/api/setting/list')
      .then(res => {
        setDatas(res.data)
      })
      .catch(error => {
    })
  }  

  if (!mounted || !datas) {
    return null;
  }
  function deleteItem() {
    axios
      .delete('/api/setting/ip/' + chooseItem, {
        ipAddress: addData.ipAddress,
        userName: addData.name
      })
      .then(res => {
        toast.success('User name and IP address are deleted successfully!');
        setOpen(false)
        window.location.reload();
      })
      .catch(error => {
        toast.error(error?.response.data);
      })
  }

  function addItem() {
    if (!addData.name) {
      toast.error("Name field is required");
      return;
    }
    if (!addData.ipAddress) {
      toast.error("IP Address field is required");
      return;
    }
    axios
      .post('/api/setting/ip', {
        ipAddress: addData.ipAddress,
        userName: addData.name
      })
      .then(res => {
        toast.success('User name and IP address are created successfully!');
        setAddOpen(false)
        window.location.reload();
      })
      .catch(error => {
        toast.error(error?.response.data);
      })
  }

  function updateItem() {
    if (!updateData.name) {
      toast.error("Name field is required");
      return;
    }
    if (!updateData.ipAddress) {
      toast.error("IP Address field is required");
      return;
    }
    axios
      .put('/api/setting/ip/' + updateData.id, {
        ipAddress: updateData.ipAddress,
        userName: updateData.name
      })
      .then(res => {
        toast.success('User name and IP address are updated successfully!');
        setUpdateOpen(false)
        window.location.reload();
      })
      .catch(error => {
        toast.error(error?.response.data);
      })
  }

  return (
    <div className="items-center`">
      <div className="items-center  ">
        <button
          id="Add"
          className="bg-blue-500 text-white px-2 py-2 rounded font-bold w-1/4 mb-4"
          onClick={() => setAddOpen(true)}
        >
          Add
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((item, index) => (
              <th key={index} scope="col" className="px-3 py-3">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={data.id}>
              <td className="px-3 py-3">{index + 1}</td>
              <td className="px-3 py-3">{data.userName}</td>
              <td className="px-3 py-3">{data.ipAddress}</td>
              <td className="px-2 py-2 flex items-center">
                <PencilSquareIcon
                  className="h-6 w-6 text-blue-500 gap-3 cursor-pointer"
                  onClick={() => {
                    setUpdateOpen(true);
                    setUpdateData({
                      id: data.id,
                      name: data.userName,
                      ipAddress: data.ipAddress,
                    });
                  }}
                />
                <ArchiveBoxXMarkIcon
                  className="h-6 w-6 text-black-500 cursor-pointer"
                  onClick={() => {
                    setOpen(true);
                    setItem(data.id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {open && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="text-center">
            <div className="mx-auto my-4">
              <h3 className="text-lg font-black text-gray-800">
                Confirm Delete
              </h3>
              <p className="text-sm text-gray-500">
                {" "}
                Are you sure you want to delete this item
              </p>
            </div>
            <div className="flex gap-4 justify-end">
              <button className="text-white bg-red-500 rounded-md px-2 py-1" onClick={deleteItem}>
                Delete
              </button>
              <button
                className="bg-gray-400 rounded-md px-2 py-1 text-white"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
      {addOpen && (
        <Modal open={addOpen} onClose={() => setAddOpen(false)}>
          <div className="text-start">
            <div className=" my-4">
              <label>
                Name:
                <input
                  onChange={(e) =>
                    setAddData({ ...addData, name: e.target.value })
                  }
                  name="name"
                  type="text"
                  id="name"
                  placeholder="name"
                  className="my-2 border-gray-500 rounded-md p-2 border w-full"
                  required
                />
              </label>
              <label>
                Ip address:
                <input
                  onChange={(e) =>
                    setAddData({ ...addData, ipAddress: e.target.value })
                  }
                  name="Ip address"
                  id="ipAddress"
                  placeholder="Ip address"
                  className="my-2 border-gray-500 rounded-md p-2 border w-full"
                  required
                />
              </label>
            </div>
            <div className="flex gap-4 justify-end">
              <button className="text-white bg-blue-500 rounded-md px-2 py-1" onClick={addItem}>
                Save
              </button>
              <button
                className="bg-gray-400 rounded-md px-2 py-1 text-white"
                onClick={() => setAddOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
      {updateOpen && (
        <Modal open={updateOpen} onClose={() => setUpdateOpen(false)}>
          <div className="text-start">
            <div className=" my-4">
              <label>
                Name:
                <input
                  onChange={(e) =>
                    setUpdateData({ ...updateData, name: e.target.value })
                  }
                  name="name"
                  type="text"
                  id="name"
                  value={updateData.name}
                  placeholder="name"
                  className="my-2 border-gray-500 rounded-md p-2 border w-full"
                  required
                />
              </label>
              <label>
                Ip address:
                <input
                  onChange={(e) =>
                    setUpdateData({ ...updateData, ipAddress: e.target.value })
                  }
                  name="Ip address"
                  id="ipAddress"
                  value={updateData.ipAddress}
                  placeholder="Ip address"
                  className="my-2 border-gray-500 rounded-md p-2 border w-full"
                  required
                />
              </label>
            </div>
            <div className="flex gap-4 justify-end">
              <button className="text-white bg-blue-500 rounded-md px-2 py-1" onClick={updateItem}>
                Update
              </button>
              <button
                className="bg-gray-400 rounded-md px-2 py-1 text-white"
                onClick={() => setUpdateOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
}

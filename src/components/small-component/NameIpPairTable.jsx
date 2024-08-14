"use client";

import Modal from "./Modal";
import { useState } from "react";
import {
  ArchiveBoxXMarkIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NameIpPairTable() {
  const router = useRouter();
  const columns = ["id", "name", "IP address", "Action"];
  // const [datas, setDatas] = useState([]);
  const datas = [
    {
      id: 1,
      name: "ad",
      ip: "192.168.0.2",
    },
    {
      id: 2,
      name: "dae",
      ip: "198.165.45.56",
    },
    {
      id: 3,
      name: "dae",
      ip: "198.165.45.56",
    },
    {
      id: 4,
      name: "dae",
      ip: "198.165.45.56",
    },
    {
      id: 5,
      name: "dae",
      ip: "198.165.45.56",
    },
  ];
  const [addData, setAddData] = useState({ name: "", ipAddress: "" });
  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    ipAddress: "",
  });
  const [chooseItem, setItem] = useState("");

  function deleteItem() {
    // axios
    //   .post("http://localhost:3001/api/delete", { id: chooseItem })
    //   .then((res) => {
    //     if (res.data === "success") {
    //       router.push('/dashboard');
    //     } else {
    //       console.error("Failed to delete:", res.data);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error("An error occurred:", err);
    //   });
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
    // axios
    // .post("http://localhost:3001/api/add", { data: addData })
    // .then((res) => {
    //   if (res.data === "success") {
    //     // router.push('/dashboard');
    //   } else {
    //     console.error("Failed to add:", res.data);
    //   }
    // })
    // .catch((err) => {
    //   console.error("An error occurred:", err);
    // });
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
    // axios
    //   .post("http://localhost:3001/api/update", {
    //     data: updateData,
    //   })
    //   .then((res) => {
    //     if (res.data === "success") {
    //       // router.push('/dashboard');
    //     } else {
    //       console.error("Failed to add:", res.data);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error("An error occurred:", err);
    //   });
  }
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  console.log(addData)

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
          {datas.map((data) => (
            <tr key={data.id}>
              <td className="px-3 py-3">{data.id}</td>
              <td className="px-3 py-3">{data.name}</td>
              <td className="px-3 py-3">{data.ip}</td>
              <td className="px-2 py-2 flex items-center">
                <PencilSquareIcon
                  className="h-6 w-6 text-blue-500 gap-3"
                  onClick={() => {
                    setUpdateOpen(true);
                    setUpdateData({
                      id: data.id,
                      name: data.name,
                      ipAddress: data.ip,
                    });
                  }}
                />
                <ArchiveBoxXMarkIcon
                  className="h-6 w-6 text-black-500 "
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
          <div className="text-center w-56">
            <div className="mx-auto my-4 w-48">
              <h3 className="text-lg font-black text-gray-800">
                Confirm Delete
              </h3>
              <p className="text-sm text-gray-500">
                {" "}
                Are you sure you want to delete this item
              </p>
            </div>
            <div className="flex gap-4">
              <button className="btn btn-danger w-full" onClick={deleteItem}>
                Delete
              </button>
              <button
                className="btn btn-light w-full"
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
          <div className="text-center w-56">
            <div className=" my-4 w-48">
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
                  className="my-2 mx-2 border-blue-500 border"
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
                  className="my-2 mx-2 border-blue-500 border"
                  required
                />
              </label>
            </div>
            <div className="flex gap-4">
              <button className="btn btn-danger w-full" onClick={addItem}>
                Save
              </button>
              <button
                className="btn btn-light w-full"
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
          <div className="text-center w-56">
            <div className=" my-4 w-48">
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
                  className="my-2 mx-2 border-blue-500 border"
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
                  className="my-2 mx-2 border-blue-500 border"
                  required
                />
              </label>
            </div>
            <div className="flex gap-4">
              <button className="btn btn-danger w-full" onClick={updateItem}>
                Update
              </button>
              <button
                className="btn btn-light w-full"
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

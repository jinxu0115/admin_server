"use client";

import React from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, onClose, children }) {
  if (typeof document !== "undefined") {
    return createPortal(
      <div
        className={`fixed flex items-center justify-center inset-0 z-50 ${
          open ? "" : "pointer-events-none"
        }`}
      >
        {/* backdrop */}
        <div
          className={`fixed inset-0 bg-black ${
            open ? "opacity-40" : "pointer-events-none opacity-0"
          } transition-opacity duration-300 ease-in-out`}
          onClick={onClose}
        />
        {/* content */}
        <div
          className={`fixed md:flex rounded-md h-auto w-1/5 bg-white shadow-lg max-w-full p-0 ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          } transition-opacity duration-300 ease-in-out`}
        >
          <div className="text-center py-4 block mx-auto font-poppins">
            {children}
          </div>
        </div>
      </div>,
      document.body
    );
  } else {
    return null;
  }
}

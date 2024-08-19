"use client";

import React from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, onClose, className, children }) {
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
          className={`fixed md:flex p-4 rounded-md h-auto ${className} w-96 bg-white shadow-lg max-w-full ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          } transition-opacity duration-300 ease-in-out`}
        >
          <div className="text-center block mx-auto font-poppins w-full text-black">
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

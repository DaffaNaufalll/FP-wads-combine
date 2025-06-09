import React from "react";

export function Input({ className, ...props }) {
  return (
    <input
      {...props}
      className={`border rounded-md px-4 py-2 w-full ${className}`}
    />
  );
}

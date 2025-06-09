import React from "react";

export function Textarea({ className, ...props }) {
  return (
    <textarea
      {...props}
      className={`border rounded-md px-4 py-2 w-full ${className}`}
    />
  );
}

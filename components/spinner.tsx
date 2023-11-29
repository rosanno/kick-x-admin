"use client";

import { Loader } from "lucide-react";

export const Spinner = () => {
  return (
    <>
      <Loader
        className="
         h-4 
         w-4 
         animate-spin 
         transition-all 
         duration-1000
        "
      />
    </>
  );
};

import React from "react";

export const CopyRight = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="text-center mb-16 dark:text-white  w-full">
      Copyright © {currentYear} Santhosh.S , All rights
      reserved.
    </div>
  );
};

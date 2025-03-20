import React from 'react';

const UserBlueSpinner = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="pt-10">
        <div className="border-t-transparent border-solid animate-spin  rounded-full border-logo-blue border-3 h-8 w-8"></div>
      </div>
      <div className="pt-2">
        <p className="font-semibold text-logo-blue text-base">Loading</p>
      </div>
    </div>
  );
};

export default UserBlueSpinner;

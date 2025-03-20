import { Spinner } from "@heroui/react";
import React from 'react';

const BlueLoading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="pb-40">
        <Spinner label="Loading..." color="primary" labelColor="primary" />
      </div>
    </div>
  );
};

export default BlueLoading;

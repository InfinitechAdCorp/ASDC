import React from 'react';
import { Toaster } from 'react-hot-toast';

import MyCalendar from './dive-calendar';

const page = () => {
  return (
    <div>
      <Toaster position="top-center" />
      <MyCalendar />
    </div>
  );
};

export default page;

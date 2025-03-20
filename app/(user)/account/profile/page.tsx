'use client';

import React from 'react';

import { ProfileCard } from './profile-card';

const ProfilePage = () => {
  return (
    <div>
      <div className="flex h-screen items-center justify-center">
        <ProfileCard />
      </div>
    </div>
  );
};

export default ProfilePage;

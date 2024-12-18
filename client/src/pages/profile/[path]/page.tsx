import React, { Suspense, lazy } from 'react';

const ProfileScreen = lazy(() => import('../page'));

const Path = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileScreen />
      </Suspense>
    </div>
  );
};

export default Path;

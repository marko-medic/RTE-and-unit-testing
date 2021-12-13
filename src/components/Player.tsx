import React, { useEffect } from 'react';

import { useGlobalHook } from '../hooks/useGlobal';

function Player() {
  const [globalState, globalActions] = useGlobalHook();

  useEffect(() => {
    // console.log("@globalState!", globalState);
  }, [globalState]);

  return (
    <div>
      <h1>Player</h1>
    </div>
  );
}

export default Player;

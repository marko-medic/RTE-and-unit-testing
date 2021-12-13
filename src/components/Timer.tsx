/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import { useGlobalHook } from '../hooks/useGlobal';

function Timer() {
  let timer: NodeJS.Timer;

  const [globalState, globalActions] = useGlobalHook();

  useEffect(() => {
    timer = setTimeout(() => {
      console.log("@time is up");
      (globalActions as any).updateAppName("appName new");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log("@globalState!", globalState);
  }, [globalState]);

  return (
    <div>
      <p>Timer component</p>
    </div>
  );
}

export default Timer;

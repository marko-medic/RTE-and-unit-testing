import { useCallback, useEffect, useState } from 'react';

import { TargetElement } from '@testing-library/user-event';

export const useCustom = (name: string) => {
  const fn = useCallback(
    (param: TargetElement) => {
      console.log("called", name, param);
    },
    [name]
  );
  const [state, setState] = useState(() => fn);

  useEffect(() => {
    setState(() => fn);
    console.log("fn gets new res");
  }, [fn]);

  return state;
};

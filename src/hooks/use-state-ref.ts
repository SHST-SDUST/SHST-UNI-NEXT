import { useRef, useState } from "react";

export const useStateRef = <T>(initialState: T) => {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(initialState);

  const setStateWithRef = (newState: T) => {
    stateRef.current = newState;
    setState(newState);
  };

  return [state, setStateWithRef, stateRef] as const;
};

import { useState } from 'react';

export const useToggle = (initialValue: boolean) => {
  const [toggleValue, setToggleValue] = useState<boolean>(initialValue);
  const toggler = () => setToggleValue(!toggleValue);
  return {
    toggler,
    toggleValue,
    setToggleValue,
  };
};

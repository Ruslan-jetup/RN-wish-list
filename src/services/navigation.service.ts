import React from 'react';

export const navigationRef = React.createRef<any>();

export function navigate(name: string, params: any) {
  if (navigationRef.current && navigationRef.current.isReady()) {
    navigationRef.current.navigate(name, params);
  }
}

export const NavigationService = {
  navigate,
};

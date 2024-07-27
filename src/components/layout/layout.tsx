import React from 'react';
import { AppHeader } from '../app-header';

export const Layout = ({ children }: React.PropsWithChildren) => (
  <>
    <AppHeader />
    {children}
  </>
);

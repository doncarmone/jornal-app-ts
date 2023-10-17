import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { theme } from './purple';

interface Props {
    children: React.ReactElement | React.ReactElement[]
}

export const AppTheme = ({ children } : Props) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

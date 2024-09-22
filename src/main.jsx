import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './utils/ThemeProvider.jsx';
import { UserProvider } from './utils/UserProvider.jsx';
import React from "react";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      <UserProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </UserProvider>
    </NextUIProvider>
  </QueryClientProvider>
)

import React from 'react';
import './main.scss';
import { createRoot } from 'react-dom/client';

function NavigationBar() {
  return <h1>Hello from React!</h1>;
}

const domNode = document.body;
const root = createRoot(domNode);
root.render(<NavigationBar />);

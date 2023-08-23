import React from 'react';
import { Header } from '../header/header';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { linksArr, loginArr } from '../header/header';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          {linksArr.map((item, index) => (
            <Route path={item.path} element={item.element} key={index} />
          ))}
          {loginArr.map((item, index) => (
            <Route path={item.path} element={item.element} key={index} />
          ))}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

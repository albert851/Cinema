import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavBar />} >
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

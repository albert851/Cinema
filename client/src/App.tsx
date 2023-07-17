import React, { useState } from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import NavBar from './components/NavBar/NavBar';
import Admin from "./views/Admin/Admin";
import UpdateFilm from "./components/UpdateFilm/UpdateFilm";
import FilmPage from "./views/FilmPage/FilmPage";
import { FilmsType } from "./types/films";

function App() {
  const [film, setFilm] = useState<any>()
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/film/:id" element={<FilmPage /> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Admin from "./views/Admin/Admin";
import UpdateFilm from "./components/UpdateFilm/UpdateFilm";
import FilmPage from "./views/FilmPage/FilmPage";
import { FilmsType } from "./types/films";
import axios from "axios";
import OrderPage from "./views/OrderPage/OrderPage";

function App() {
  const [film, setFilm] = useState<any>();
  const [films, setFilms] = useState<FilmsType[]>([]);
  const [filmsToDisp, setFilmsToDisp] = useState<FilmsType[]>(films);

  async function handleGetFilms() {
    try {
      const { data } = await axios.get("/api/film/allFilms");

      if (data) {
        setFilms(data.filmsDB);
        setFilmsToDisp(data.filmsDB);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleGetFilms();
  }, []);

  return (
    <BrowserRouter>
      <NavBar
        films={films}
        filmsToDisp={filmsToDisp}
        setFilmsToDisp={setFilmsToDisp}
      />
      <Routes>
        <Route
          path="/"
          element={<Home films={films} filmsToDisp={filmsToDisp} />}
        />
        <Route
          path="/admin"
          element={<Admin films={films} filmsToDisp={filmsToDisp} />}
        />
        <Route path="/film/:id" element={<FilmPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

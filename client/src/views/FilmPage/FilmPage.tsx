import React, { FC, useEffect, useState } from "react";
import { FilmsType } from "../../types/films";
import { useParams } from "react-router-dom";
import axios from "axios";

const FilmPage = () => {
  const [age, setAge] = useState<string>();
  const [film, setFilm] = useState<FilmsType>();

  const { id } = useParams();

  const handleGetMovie = async () => {
    try {
      const { data } = await axios.get(`/api/film/oneFilm/${id}`);

      setFilm(data.filmsDB);
    } catch (error) {
      console.error(error);
    }
  };

  const getScreenings = async () => {
    try {
      const { data } = await axios.get(`/api/screening/allScreenings`);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetMovie()
    getScreenings();
  }, []);

  useEffect(() => {
    if (film) {
      if (film.age == "0+") {
        setAge("no limit");
      } else {
        setAge(film.age);
      }
    }
  }, [film]);

  return (
    <div className="filmPage">
      <div className="filmPage__data">
        <h1>{film?.title}</h1>
        <h2>{`Genree: ${film?.genree}`}</h2>
        <h2>{`Cast: ${film?.cast}`}</h2>
        <h2>{`Director: ${film?.director}`}</h2>
        <h2 className="filmPage__data__age">{age}</h2>
        <h3>{film?.summary}</h3>
      </div>
      <div className="filmPage__pic">
        <img className="filmPage__pic__img" src={film?.pic}></img>
      </div>
    </div>
  );
};

export default FilmPage;

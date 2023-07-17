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
      const { data } = await axios.get(`/api/movies/${id}`);

      setFilm(data.filmDB);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, []);

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
    <div className="film">
      {/* <div className="film__data">
        <h1>{film.title}</h1>
        <h2>{`Genree: ${film.genree}`}</h2>
        <h2>{`Cast: ${film.cast}`}</h2>
        <h2>{`Director: ${film.director}`}</h2>
        <h2 className="film__data__age">{age}</h2>
      </div>
      <div className="film__pic">
        <img className="film__pic__img" src={film.pic}></img>
      </div> */}
    </div>
  );
};

export default FilmPage;

import React, { FC, useEffect, useState } from "react";
import { FilmsType } from "../../types/films";
import { useParams } from "react-router-dom";
import axios from "axios";
import Order2 from "../../components/Order2/Order2";

const FilmPage = () => {
  const [age, setAge] = useState<string>();
  const [film, setFilm] = useState<FilmsType>();
  const [orderDisp, setOrderDisp] = useState("none");

  const { id } = useParams();

  const handleGetMovie = async () => {
    try {
      const { data } = await axios.get(`/api/film/oneFilm/${id}`);

      setFilm(data.filmsDB);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetMovie();
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
        <Order2 filmId={id || ""} classType="filmPageOrder" setOrderDisp={setOrderDisp} />
      </div>
      <div className="filmPage__pic">
        <img className="filmPage__pic__img" src={film?.pic}></img>
      </div>
    </div>
  );
};

export default FilmPage;

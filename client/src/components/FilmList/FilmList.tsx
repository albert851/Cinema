import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import FilmCard from "../FilmCard/FilmCard";

interface FilmListProps {
  setUpdate: CallableFunction;
}

const FilmList: FC<FilmListProps> = ({ setUpdate }) => {
  const [films, setFilms] = useState([]);

  async function handleGetFilms() {
    try {
      const { data } = await axios.get("/api/film/allFilms");

      if (data) {
        setFilms(data.filmsDB);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleGetFilms();
  }, []);

  return (
    <div className="films">
      {films.map((film: any, index: React.Key | null | undefined) => {
        return <FilmCard key={index} film={film} setUpdate={setUpdate} />;
      })}
    </div>
  );
};

export default FilmList;

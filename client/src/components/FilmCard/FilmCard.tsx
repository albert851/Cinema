import React, { FC, useEffect, useState } from "react";
import { adminSelector } from "../../features/admin/adminSlise";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeFilm } from "../../features/film/selectedFilm";
import { error } from 'console';
import axios from "axios";

interface FilmCardProps {
  film: any;
  setUpdate: CallableFunction;
}

const FilmCard: FC<FilmCardProps> = ({ film, setUpdate }) => {
  const [pic, setPic] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [summary, setSummary] = useState<string>();
  const [filmId, setFilmId] = useState<string>();
  const admin = useAppSelector(adminSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleUpdateFilm = () => {
    dispatch(
      changeFilm({
        id: film._id,
        title: film.title,
        genree: film.genree,
        cast: film.cast,
        age: film.age,
        pic: film.pic,
        summary: film.summary,
      })
    );
    setUpdate(true);
  };

  async function handleDeleteFilm() {
    try {
      const {data} = await axios.delete(`/api/film/${filmId}`)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setPic(film.pic);
    setTitle(film.title);
    setSummary(film.summary);
    setFilmId(film._id);
  }, []);

  return (
    <div className="film">
      <span className="film__description">
        <h2 className="film__description__titele">{title}</h2>
        <h3 className="film__description__summary">{summary}</h3>
        {admin ? (
          <div className="film__description__buttons">
            <button
              className="description__buttons__btn"
              onClick={handleUpdateFilm}
            >
              Edit Film
            </button>
            <button
              className="description__buttons__btn btn__delete"
              onClick={handleDeleteFilm}
            >
              Delete Film
            </button>
          </div>
        ) : (
          <div className="film__description__buttons">
            <button className="description__buttons__btn">Order</button>
            <button className="description__buttons__btn">Film Page</button>
          </div>
        )}
      </span>
      <img className="film__pic" src={pic}></img>
    </div>
  );
};

export default FilmCard;

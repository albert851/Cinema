import React, { FC, useEffect, useState } from "react";
import { adminSelector } from "../../features/admin/adminSlise";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeFilm } from "../../features/film/selectedFilm";
import { Console, error } from "console";
import axios from "axios";
import { FilmsType } from "../../types/films";

interface FilmCardProps {
  film: FilmsType;
  setUpdate: CallableFunction;
}

const FilmCard: FC<FilmCardProps> = ({ film, setUpdate }) => {
  const [ageRestriction, setAgeRestriction] = useState<string>(
    film.age == "14+" || film.age == "18+" ? film.age : ""
  );
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
      const { data } = await axios.delete(`/api/film/${film._id}`);

      if (data) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleFilmPage = () => {
    navigate(`/film/${film._id}`);
  };

  return (
    <div className="film">
      <span className="film__description">
        <h2 className="film__description__titele">{film.title}</h2>
        <h3 className="film__description__summary">{film.summary}</h3>
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
            <button
              className="description__buttons__btn"
              onClick={handleFilmPage}
            >
              Film Page
            </button>
          </div>
        )}
      </span>
      <img className="film__pic" src={film.pic}></img>
      {ageRestriction ? (
        <div className="film__pic__ageRestriction">
          <h3>{ageRestriction}</h3>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FilmCard;

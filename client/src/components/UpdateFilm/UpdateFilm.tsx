import React, { FC, useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { filmSelector } from "../../features/film/selectedFilm";
import axios from "axios";

interface FilmUpdateProps {
  setUpdate: CallableFunction;
}

const UpdateFilm: FC<FilmUpdateProps> = ({ setUpdate }) => {
  const [filmId, setFilmId] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [genree, setGenree] = useState<string>();
  const [cast, setCast] = useState<string>();
  const [age, setAge] = useState<string>();
  const [pic, setPic] = useState<string>();
  const [summary, setSummary] = useState<string>();
  const film = useAppSelector(filmSelector);
  const dispatch = useAppDispatch();

  async function handleUpdateFilm(ev: any) {
    ev.preventDefault();

    try {
      const { data } = await axios.patch(`/api/film/update/${filmId}`, {
        title,
        genree,
        cast,
        age,
        pic,
        summary,
      });

      if (data) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSetFilmData = () => {
    setFilmId(film.id);
    setTitle(film.title);
    setGenree(film.genree);
    setCast(film.cast);
    setAge(film.age);
    setPic(film.pic);
    setSummary(film.summary);
  };

  useEffect(() => {
    handleSetFilmData();
  }, [film]);

  return (
    <div className="update">
      <div className="update__container">
        <form className="update__container__form" onSubmit={handleUpdateFilm}>
          <div className="container__form__title">
            <legend>UpdateFilm film</legend>
            <CloseIcon
              className="update__close"
              onClick={() => setUpdate(false)}
            />
          </div>
          <h4>{`Title: ${title}`}</h4>
          <p>New title:</p>
          <input
            className="form__input"
            value={title}
            type="text"
            placeholder="Title"
            required
            onInput={(ev: any) => {
              setTitle(ev.target.value);
            }}
          />
          <h4>{`Genree: ${genree}`}</h4>
          <p>New genree:</p>
          <input
            className="form__input"
            value={genree}
            type="text"
            placeholder="Genre"
            required
            onInput={(ev: any) => {
              setGenree(ev.target.value);
            }}
          />
          <h4>{`Cast: ${cast}`}</h4>
          <p>New cast:</p>
          <input
            className="form__input"
            value={cast}
            type="text"
            placeholder="Cast"
            required
            onInput={(ev: any) => {
              setCast(ev.target.value);
            }}
          />
          <h4>{`Age restrictions: ${age}`}</h4>
          <p>New age restrictions:</p>
          <input
            className="form__input"
            value={age}
            type="text"
            placeholder="Age restrictions:"
            required
            onInput={(ev: any) => {
              setAge(ev.target.value);
            }}
          />
          <h4>{`PicUrl: ${pic}`}</h4>
          <p>New PicUrl:</p>
          <input
            className="form__input"
            value={pic}
            type="text"
            placeholder="Film Pic"
            required
            onInput={(ev: any) => {
              setPic(ev.target.value);
            }}
          />
          <h4>Summary:</h4>
          <p>{summary}</p>
          <p>New summary:</p>
          <textarea
            className="form__textArea"
            value={summary}
            placeholder="Film summary"
            required
            onInput={(ev: any) => {
              setSummary(ev.target.value);
            }}
          />
          <button className="form__submit" type="submit">
            Update Film
          </button>
        </form>
      </div>
      <div className="update__filmPic">
        <img className="update__filmPic__img" src={pic ? pic : ""}></img>
      </div>
    </div>
  );
};

export default UpdateFilm;

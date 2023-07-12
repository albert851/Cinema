import axios from "axios";
import React, { FC, useEffect, useState } from "react";

interface MovieDayTime {
  day: string;
  times: String[];
}

const AddFilm = () => {
  const [age, setAge] = useState();
  const [title, setTitle] = useState();
  const [genre, setGenre] = useState();
  const [cast, setCast] = useState();
  const [director, setDirector] = useState();
  const [summary, setSummary] = useState();
  const [url, setUrl] = useState();
  const [editTime, setEditTime] = useState<string[]>([]);
  const [editDay, setEditDay] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [dayTime, setDayTime] = useState<MovieDayTime[]>([]);
  const [seats, setSeats] = useState<boolean[]>(Array(100).fill(false));
  const [film, setFilm] = useState<any>();

  const filmTime = (ev: any) => {};

  async function handleAddNewFilm(ev: any) {
    ev.preventDefault();

    try {
      const { data } = await axios.post("/api/film/newFilm", {
        title: title,
        genree: genre,
        cast: cast,
        director: director,
        age: age,
        pic: url,
        screeningTimes: dayTime,
        summary: summary,
      });

      if (data) {
        setFilm(data.filmDB);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleScreeningByTime = () => {
    if(film){
      const filmId = film._id;
      const dayList = film.screeningTimes;

      dayList.map((currentDay: any) => {
        const dayId = currentDay._id;
        const day = currentDay.day;
        const timesList = currentDay.times;

        timesList.map((currentTime: any) => {
          const time = currentTime;
          handleAddScreening(filmId, dayId, day, time)
        })
      })
    }
  }

  async function handleAddScreening(filmId: string, dayId: string, day: string, time: string) {
    try {
      const { data } = await axios.post("/api/screening/newScreening", {
        filmId,
        dayId,
        day,
        time,
        seats
      });

      if (data) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleAddDay(ev: React.ChangeEvent<HTMLSelectElement>) {
    setEditDay(ev.target.value);
  }

  function handleSaveTimeToArray(ev: any) {
    ev.preventDefault();

    setEditTime([...editTime, timeInput]);
    setTimeInput("");
  }

  function handleAddTimeToDay(ev: any) {
    ev.preventDefault();

    setDayTime([...dayTime, { day: editDay, times: editTime }]);
    setEditDay("");
    setEditTime([]);
  }

  function removeTime(removeTime: any) {
    setEditTime(editTime.filter((time) => time != removeTime));
  }

  useEffect(() => {
    handleScreeningByTime()
  }, [film]);

  return (
    <div className="addFilm">
      <div className="addFilm__add__filmConteiner">
        <form className="filmConteiner__form " onSubmit={handleAddNewFilm}>
          <legend>Add new film</legend>
          <h4>Title</h4>
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
          <h4>Genree</h4>
          <input
            className="form__input"
            value={genre}
            type="text"
            placeholder="Genre"
            required
            onInput={(ev: any) => {
              setGenre(ev.target.value);
            }}
          />
          <h4>Cast</h4>
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
          <h4>Director</h4>
          <input
            className="form__input"
            value={director}
            type="text"
            placeholder="Director"
            required
            onInput={(ev: any) => {
              setDirector(ev.target.value);
            }}
          />
          <h4>Age restrictions:</h4>
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
          <h4>PicUrl</h4>
          <input
            className="form__input"
            value={url}
            type="text"
            placeholder="Film Pic"
            required
            onInput={(ev: any) => {
              setUrl(ev.target.value);
            }}
          />
          <div className="form__dayTimeSelect">
            <div className="form__dayTimeData">
              <h4>Screening Day</h4>
              {editDay !== "" ? (
                <div>
                  <h5 className="form__dayTimeData__daySelected">{editDay}:</h5>
                  <h5 className="form__dayTimeData__message">Add times:</h5>
                  <input
                    className="form__dayTimeData__timeInput"
                    type="time"
                    value={timeInput}
                    onInput={(ev: any) => {
                      setTimeInput(ev.target.value);
                    }}
                  />
                  <button
                    className="form__dayTimeData__addBtn"
                    onClick={handleSaveTimeToArray}
                  >
                    ADD
                  </button>
                  <button
                    className="form__dayTimeData__submit"
                    onClick={handleAddTimeToDay}
                  >
                    Add Day and Times
                  </button>
                </div>
              ) : (
                <div>
                  <h5 className="form__dayTimeData__message">
                    No days selected yet
                  </h5>
                  <select
                    value={editDay}
                    onChange={handleAddDay}
                    className="form__dayTimeData__select"
                  >
                    <option value={""}>Day</option>
                    <option value={"Sunday"}>sunday</option>
                    <option value={"Monday"}>monday</option>
                    <option value={"Tuesday"}>Tuesday</option>
                    <option value={"Wednesday"}>Wednesday</option>
                    <option value={"Thursday"}>Thursday</option>
                    <option value={"Friday"}>Friday</option>
                    <option value={"Saturday"}>Saturday</option>
                  </select>
                </div>
              )}
            </div>
            <div className="form__dayTimeDisplay">
              <div className="form__dayTimeDisplay__box">
                {dayTime.map((day) => (
                  <div className="dayTimeDisplay__box___day">{`${day.day}: ${day.times}`}</div>
                ))}
              </div>
              <div className="form__dayTimeDisplay__box">
                {editTime.map((time) => (
                  <div
                    className="dayTimeDisplay__box___time"
                    onClick={() => removeTime(time)}
                  >{`${time},`}</div>
                ))}
              </div>
            </div>
          </div>
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
            Add Film
          </button>
        </form>
      </div>
      <div className="addFilm__filmPic">
        <img className="addFilm__filmPic__img" src={url ? url : ""}></img>
      </div>
    </div>
  );
};

export default AddFilm;

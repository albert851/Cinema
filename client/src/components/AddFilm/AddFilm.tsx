import React, { FC, useEffect, useState } from "react";

interface MovieDayTime {
  day: string;
  times: string[];
}

const AddFilm = () => {
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

  const filmTime = (ev: any) => {};

  async function handleAddNewFilm() {}

  function handleAddDay(ev: React.ChangeEvent<HTMLSelectElement>) {
    setEditDay(ev.target.value);
  }

  async function handleSaveTimeToArray() {
    setEditTime([...editTime, timeInput]);

    setTimeInput("");
  }
  async function handleAddTimeToDay() {
    setDayTime([...dayTime, { day: editDay, times: editTime }]);
    setEditDay("");
    setEditTime([]);
  }

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
                    <div className="dayTimeDisplay__box___day">{`${day.day}:, ${day.times}`}</div>
                ))}</div>
              <div className="form__dayTimeDisplay__box">
                {editTime.map((time) => (
                  <div className="dayTimeDisplay__box___time">{`${time},`}</div>
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

import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { FilmsType } from "../../types/films";
import { ScreeningType } from "../../types/creeningType";
import { useNavigate } from "react-router-dom";

interface Order2Props {
  filmId: string;
  classType: string;
}

const Order2: FC<Order2Props> = ({ filmId, classType }) => {
  const navigate = useNavigate();
  const [day, setDay] = useState("");
  const [dayId, setDayId] = useState("");
  const [times, setTimes] = useState<string[]>();
  const [screenings, setScreenings] = useState<ScreeningType[]>();
  const [film, setFilm] = useState<FilmsType>();

  const handleGetSreenings = async () => {
    try {
      const { data } = await axios.get(`/api/screening/films/${filmId}`);

      setScreenings(data.sreeningsDB);
      setFilm(data.sreeningsDB[0].filmId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDaySelect = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setDay(ev.target.value);
    setDayId(ev.target.id);
  };

  const handleTimes = () => {
    film?.screeningTimes.map((e) => {
      if (e.day === day) {
        setTimes(e.times);
      }
    });
  };

  const handleTimeSelect = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const sceeningByTime = screenings?.filter(
      (e) => e.day == day && e.time == ev.target.value
    );

    if (sceeningByTime) {
      navigate(`/order/${sceeningByTime[0]._id}`);
    }
  };

  useEffect(() => {
    handleGetSreenings();
  }, []);

  useEffect(() => {
    handleTimes();
  }, [day]);

  return (
    <div className={classType}>
      <select
        value={day}
        onChange={handleDaySelect}
        className={`${classType}__select`}
      >
        <option value={""}>Day</option>
        {film?.screeningTimes.map((e) => (
          <option id={`${e._id}`} value={`${e.day}`}>
            {e.day}
          </option>
        ))}
      </select>
      <select
        value={day}
        onChange={handleTimeSelect}
        className={`${classType}__select`}
      >
        <option value={""}>Time</option>
        {times?.map((e) => (
          <option value={`${e}`}>{e}</option>
        ))}
      </select>
    </div>
  );
};

export default Order2;

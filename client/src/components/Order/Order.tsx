import React, { FC, useState, useEffect } from "react";
import { FilmsType } from "../../types/films";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { FilmsToOrderType } from "../../types/filmToOrder";

interface OrderProps {
  orderType: string;
  orderDisp: string;
  setOrderDisp: CallableFunction;
}

const Order: FC<OrderProps> = ({ orderType, orderDisp, setOrderDisp }) => {
  const [daySelected, setDaySeleted] = useState<string>();
  const [films, setFilms] = useState<FilmsType[]>();
  const [filmsList, setFilmsList] = useState<FilmsToOrderType[]>([]);
  const [filterdFilms, setFilterdFilms] = useState<FilmsType[]>();
  const [filmsByDay, setFilmsByDay] = useState<FilmsType>();
  const [option, setOption] = useState<string>();

  const handleSubmit = () => {};

  const handleDay = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setDaySeleted(ev.target.value);
  };

  const handleOption = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(ev.target.value)
  };

  async function handleGetFilms() {
    try {
      const { data } = await axios.get("/api/film/allFilms");

      if (data) {
        setFilms(data.filmsDB);
        setFilterdFilms(data.filmsDB)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleCreateFilmsList = () => {
    films?.map((e) => {
      let id = e._id;
      let title = e.title;
      let genree = e.genree;

      e.screeningTimes.map((d) => {
        let day = d.day;
        let dayId = d._id;
        d.times.map((t) => {
          let time = t;

          setFilmsList([...filmsList, {id, title, genree, day, dayId, time}])
        })
      })
    })
  }

  const filmsBySelectedDay = () => {
    console.log(filmsList)
  };

  useEffect(() => {
    handleGetFilms();
  }, []);

  useEffect(() => {
    handleCreateFilmsList();
  }, [films]);

  useEffect(() => {
    if(option == ""){
      setFilterdFilms(films)
    } else {
      if(option){
        setFilterdFilms(films?.filter((e) => e.genree.includes(option)))
      }
    }
  }, [option]);

  useEffect(() => {
    filmsBySelectedDay();
  }, [daySelected]);

  return (
    <div className={orderType} style={{ display: orderDisp }}>
      {(orderType=="navBarOrder") ? <CloseIcon
        className={`${orderType}__close`}
        onClick={() => setOrderDisp("none")}
      /> : <></>}
      <form className={`${orderType}__form`} onSubmit={handleSubmit}>
        <div className="form__select">
          {(orderType=="homeOrder") ? <h1>Order a ticket</h1> : <></>}
          <select
            value={daySelected}
            onChange={handleDay}
            className="form__dayOption__select"
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
          <select
            value={option}
            onChange={handleOption}
            className="form__dayOption__select"
          >
            <option value={""}>Option</option>
            <option value={"Comedy"}>Comedy</option>
            <option value={"Horror"}>Horror</option>
            <option value={"Action"}>Action</option>
          </select>
        </div>
        <div className="form__films">
          <div className="form__films__list"></div>
          <div className="form__films__pic"></div>
        </div>
      </form>
    </div>
  );
};

export default Order;

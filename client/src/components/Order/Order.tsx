import React, { FC, useState, useEffect } from "react";
import { FilmsType } from "../../types/films";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { FilmsToOrderType } from "../../types/filmToOrder";
import { useNavigate } from "react-router-dom";
import FilmList from "./../FilmList/FilmList";
import { Value } from 'sass';

interface OrderProps {
  orderType: string;
  orderDisp: string;
  setOrderDisp: CallableFunction;
}

const Order: FC<OrderProps> = ({ orderType, orderDisp, setOrderDisp }) => {
  const [daySelected, setDaySeleted] = useState<string>();
  const [films, setFilms] = useState<FilmsType[]>();
  const [filmsList, setFilmsList] = useState<FilmsToOrderType[]>([]);
  const [filterdFilms, setFilterdFilms] = useState<FilmsToOrderType[]>([]);
  const [option, setOption] = useState<string>();
  const [filmOrder, setFilmOrder] = useState<FilmsToOrderType[]>([]);
  const [pic, setPic] = useState<string>();
  const navigate = useNavigate();

  const handleClick = (ev: any) => {
    try {
      setOrderDisp("none")
      navigate(`/order/${ev.target.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDay = async () => {
    try {
      const { data } = await axios.get(`/api/screening/${daySelected}`);
      setFilmsList(data.screeningsDB);
      setFilterdFilms(data.screeningsDB);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOption = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterdFilms(
      filmsList.filter((e) => e.filmId.genree.includes(ev.target.value))
    );
  };

  const daySelect = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setDaySeleted(ev.target.value);
  };

  useEffect(() => {
    handleDay();
  }, [daySelected]);

  return (
    <div className={orderType} style={{ display: orderDisp }}>
      {orderType == "navBarOrder" ? (
        <CloseIcon
          className={`${orderType}__close`}
          onClick={() => setOrderDisp("none")}
        />
      ) : (
        <></>
      )}
      <form className={`${orderType}__form`}>
        <div className="form__select">
          {orderType == "homeOrder" ? <h1>Order a ticket</h1> : <></>}
          <select
            value={daySelected}
            onChange={daySelect}
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
          <div className="form__films__list">
            {filterdFilms.map((e) => (
              <h3
                className="films__list__filmTime"
                onClick={handleClick}
                onMouseMove={() => setPic(e.filmId.pic)}
                id={e._id}
              >{`${e.time}:  ${e.filmId.title}`}</h3>
            ))}
          </div>
          <div className="form__films__pic">
            <img className="films__pic__img" src={pic}></img>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Order;

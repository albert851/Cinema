import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FilmsToOrderType } from "../../types/filmToOrder";
import Order from "./../../components/Order/Order";

const OrderPage = () => {
  const { id } = useParams();
  const [screening, setScreening] = useState<FilmsToOrderType>();
  const [seats, setSeats] = useState<boolean[]>(Array(100).fill(false));
  const [seatIndexes, setSeatIndexes] = useState<number[]>([]);
  const [email, setEmail] = useState();
  const [order, setOrder] = useState();

  const handleScreening = async () => {
    try {
      const { data } = await axios.get(`/api/screening/time/${id}`);
      setScreening(data.sreeningsDB);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCoiseSeat = (ev: any) => {
    const newArr = seats.map((e, idx) => {
      if (idx == ev.target.id) {
        return !e;
      } else {
        return e;
      }
    });

    setSeats(newArr);
  };

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();

    try {
      const { data } = await axios.patch(`/api/screening/${screening?._id}`, {
        seats: seats,
      });

      if (data) {
        setOrder(data.screeningsDB);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostSeats = async (index: number) => {
    try {
      const { data } = await axios.post("/api/seats/newSeat", {
        screeningId: screening?._id,
        filmId: screening?.filmId._id,
        index: index,
        email: email,
      });

      if (data) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewSeats = () => {
    seats.map((e, idx) => {
      if (e == true) {
        const index = idx + 1;

        handlePostSeats(index);
      }
    });
  };

  useEffect(() => {
    handleNewSeats();
  }, [order]);

  useEffect(() => {
    handleScreening();
  }, []);

  return (
    <div className="orderPage">
      <h1>
        {screening ? `${screening.filmId.title}:  ${screening.time}` : ""}
      </h1>
      <div className="orderPage__container">
        <div className="container__filmPic">
          {screening ? (
            <img
              className="container__filmPic__img"
              src={screening.filmId.pic}
            ></img>
          ) : (
            <></>
          )}
        </div>
        <div className="container__seats">
          <div className="container__seats__screen"></div>
          <div className="container__seats__choice">
            {seats.map((e, idx) => (
              <div
                className="choice__seat"
                id={`${idx}`}
                style={
                  e
                    ? { backgroundColor: "red" }
                    : { backgroundColor: "rgb(62, 1, 106)" }
                }
                onClick={handleCoiseSeat}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <form className="orderPage__form" onSubmit={handleSubmit}>
        <h2>Enter email to order:</h2>
        <input
          className="orderPage__form__input"
          value={email}
          type="email"
          placeholder="email"
          // required
          onInput={(ev: any) => {
            setEmail(ev.target.value);
          }}
        />
        <button className="orderPage__form__submit" type="submit">
          Order
        </button>
      </form>
    </div>
  );
};

export default OrderPage;

import React, { FC, useState } from "react";
import Cinema from "../../assets/cinema.jpg"
import FilmList from "../../components/FilmList/FilmList";
import Order from "../../components/Order/Order";
import { FilmsType } from "../../types/films";

interface HomeProps {
  films: FilmsType[]
  filmsToDisp: FilmsType[]
}

const Home: FC<HomeProps> = ({films, filmsToDisp}) => {
  const [update, setUpdate] = useState<boolean>(false);
  const [orderDisp, setOrderDisp] = useState<string>("")

  return (
    <div className="home">
      <img
      src={Cinema}
        className="home__pic"
      ></img>
      <Order orderType={"homeOrder"} orderDisp={orderDisp} setOrderDisp={setOrderDisp} />
      <FilmList setUpdate={setUpdate} films={films} filmsToDisp={filmsToDisp}/>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import Cinema from "../../assets/cinema.jpg"
import FilmList from "../../components/FilmList/FilmList";
import Order from "../../components/Order/Order";

const Home = () => {
  const [update, setUpdate] = useState<boolean>(false);
  const [orderDisp, setOrderDisp] = useState<string>("")

  return (
    <div className="home">
      <img
      src={Cinema}
        // src="https://open-stand.org/wp-content/uploads/2016/04/International-Union-of-Cinemas-Calls-for-Open-Standards-in-the-Cinema-Industry.jpg"
        className="home__pic"
      ></img>
      <Order orderType={"homeOrder"} orderDisp={orderDisp} setOrderDisp={setOrderDisp} />
      <FilmList setUpdate={setUpdate}/>
    </div>
  );
};

export default Home;

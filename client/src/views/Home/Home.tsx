import React from "react";
import Cinema from "../../assets/cinema.jpg"

const Home = () => {
  return (
    <div className="home">
      <img
      src={Cinema}
        // src="https://open-stand.org/wp-content/uploads/2016/04/International-Union-of-Cinemas-Calls-for-Open-Standards-in-the-Cinema-Industry.jpg"
        className="home__pic"
      ></img>
    </div>
  );
};

export default Home;

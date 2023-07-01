import React, { useState, useEffect } from "react";
import MovieCreationTwoToneIcon from "@mui/icons-material/MovieCreationTwoTone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const NavBar = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [adminDisp, setAdminDisp] = useState("none");

  async function handleSubmit(ev: any) {
    try {
      ev.preventDefault();
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });
      if(data.login){
        setAdminDisp("none")
        navigate("/admin")
      }
        
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="navBar">
      <div className="navBar__icon">
        <MovieCreationTwoToneIcon className="navBar__cinemaIcon" />
        <h2 className="navBar__icon__title__1">C</h2>
        <h2 className="navBar__icon__title__2">nema</h2>
      </div>
      <div className="navBar__btns">
        <div className="navBar__btns__search"></div>
        <div className="navBar__btns__options">
          <PersonOutlineIcon className="navBar__btns__admin" onClick={() => setAdminDisp("block")}/>
        </div>
      </div>
      <div className="navBar__admin__logIn" style={{ display: adminDisp }}>
        <CloseIcon
          className="admin__logIn__close"
          onClick={() => setAdminDisp("none")}
        />
        <form className="admin__login__form" onSubmit={handleSubmit}>
          <div className="login__form__box">
            <h4>Email:</h4>
            <input
              className="login__input"
              value={email}
              type="email"
              placeholder="email"
              required
              onInput={(ev: any) => {
                setEmail(ev.target.value);
              }}
            />
          </div>
          <div className="login__form__box">
            <h4>Password:</h4>
            <input
              className="login__input"
              value={password}
              type="password"
              placeholder="password"
              required
              onInput={(ev: any) => {
                setPassword(ev.target.value);
              }}
            />
          </div>
          <button className="login__form__submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NavBar;
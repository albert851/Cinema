import React, { useState, useEffect } from "react";
import MovieCreationTwoToneIcon from "@mui/icons-material/MovieCreationTwoTone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { adminSelector } from "../../features/admin/adminSlise";
import { getByCookie } from "../../features/admin/adminApi";
import CloseIcon from "@mui/icons-material/Close";
import { search } from "../../features/search/search";
import Search from "../Search/Search";
import Order from "../Order/Order";

const NavBar = () => {
  const navigate = useNavigate();
  const admin = useAppSelector(adminSelector);
  const orderType = "navBarOrder";
  const [orderDisp, setOrderDisp]= useState("block");
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [adminDisp, setAdminDisp] = useState("none");
  const [logInOutDisp, setLogInOutDisp] = useState<boolean>(false);
  const [smallNav, setSmallNav] = useState(false);
  const [ageSearch, setAgeSearch] = useState("0+");
  const [genreeSearch, setGenreeSearch] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  async function handleSubmit(ev: any) {
    try {
      ev.preventDefault();
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });
      if (data.login) {
        dispatch(getByCookie());
        setAdminDisp("none");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function hanfleLogOut() {
    try {
      console.log("trying to logout");
      const { data } = await axios.get("/api/admin/logout");
      const { logout } = data;
      if (logout) {
        setLogInOutDisp(false);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const displaySmallNavBar = () => {
    if (window.scrollY > 50) {
      setSmallNav(true);
    } else {
      setSmallNav(false);
    }
  };

  useEffect(() => {
    dispatch(getByCookie());
  }, []);

  useEffect(() => {
    if (admin) {
      setLogInOutDisp(true);
      navigate("/admin");
    } else {
      setLogInOutDisp(false);
    }
  }, [admin]);

  useEffect(() => {
    window.addEventListener("scroll", displaySmallNavBar);

    return () => {
      window.removeEventListener("scroll", displaySmallNavBar);
    };
  }, []);

  useEffect(() => {
    console.log(searchValue)
    dispatch(
      search({
        searchValue,
        ageSearch,
        genreeSearch,
      })
    );
  }, [searchValue, genreeSearch, ageSearch]);

  return (
    <div className="navBar" style={smallNav ? { opacity: "0.9" } : {}}>
      <h2 className="navBar__order" onClick={()=>setOrderDisp("block")}>Order a ticket</h2>
      <Search
        setSearchValue={setSearchValue}
        setGenreeSearch={setGenreeSearch}
      />
      <div className="navBar__icon">
        <MovieCreationTwoToneIcon className="navBar__cinemaIcon" />
        <h1 className="navBar__icon__title__1">C</h1>
        <h1 className="navBar__icon__title__2">nema</h1>
      </div>
      <div className="navBar__btns">
        <div className="navBar__btns__search">
          <h2 onClick={() => setAgeSearch("all")}>All Films</h2>
          <h2 onClick={() => setAgeSearch("14+")}>14+</h2>
          <h2 onClick={() => setAgeSearch("18+")}>18+</h2>
        </div>
        <div className="navBar__btns__options">
          {!logInOutDisp ? (
            <PersonOutlineIcon
              className="navBar__btns__admin"
              onClick={() => setAdminDisp("block")}
            />
          ) : (
            <ExitToAppIcon
              className="navBar__btns__admin"
              onClick={hanfleLogOut}
            />
          )}
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
      <Order orderType={orderType} orderDisp={orderDisp}  setOrderDisp={setOrderDisp} />
    </div>
  );
};

export default NavBar;

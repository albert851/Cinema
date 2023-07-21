import React, { FC, useEffect, useState } from "react";
import AddFilm from "../../components/AddFilm/AddFilm";
import FilmList from "../../components/FilmList/FilmList";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { adminSelector } from "../../features/admin/adminSlise";
import { getByCookie } from "../../features/admin/adminApi";
import { useNavigate } from "react-router-dom";
import UpdateFilm from "../../components/UpdateFilm/UpdateFilm";
import { FilmsType } from "../../types/films";

interface AdminProps {
  films: FilmsType[],
  filmsToDisp: FilmsType[]
}

const Admin:FC<AdminProps> = ({films, filmsToDisp}) => {
  const navigate = useNavigate();
  const admin = useAppSelector(adminSelector);
  const dispatch = useAppDispatch();
  const [update, setUpdate] = useState<boolean>(false);

  const checkAdminConnected = () => {
    if (!admin) navigate("/");
  };

  useEffect(() => {
    dispatch(getByCookie());
    checkAdminConnected();
  }, []);

  return (
    <div className="admin">
      {update? <UpdateFilm setUpdate={setUpdate}/> : <AddFilm />}
      <FilmList setUpdate={setUpdate} films={films} filmsToDisp={filmsToDisp}/>
    </div>
  );
}

export default Admin;

import React, { FC, useEffect, useState } from "react";
import AddFilm from "../../components/AddFilm/AddFilm";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { adminSelector } from "../../features/admin/adminSlise";
import { getByCookie } from "../../features/admin/adminApi";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const admin = useAppSelector(adminSelector);
  const dispatch = useAppDispatch();

  const checkAdminConnected = () => {
    if(!admin)
      navigate("/")
  }

  useEffect(() => {
    dispatch(getByCookie());
    checkAdminConnected();
  }, []);
  
  return (
    <div className="admin">
      <AddFilm />
    </div>
  );
}

export default Admin;

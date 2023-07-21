import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import FilmCard from "../FilmCard/FilmCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { searchSelector } from "../../features/search/search";
import { FilmsType } from "../../types/films";

interface FilmListProps {
  setUpdate: CallableFunction;
  films: FilmsType[],
  filmsToDisp: FilmsType[]
}

const FilmList: FC<FilmListProps> = ({ setUpdate, films, filmsToDisp }) => {
  const dispatch = useAppDispatch();
  const search = useAppSelector(searchSelector)

  return (
    <div className="films">
      {filmsToDisp.map((film: FilmsType, index: React.Key | null | undefined) => {
        return <FilmCard key={index} film={film} setUpdate={setUpdate} />;
      })}
    </div>
  );
};

export default FilmList;

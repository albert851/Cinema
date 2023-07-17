import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import FilmCard from "../FilmCard/FilmCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { searchSelector } from "../../features/search/search";
import { FilmsType } from "../../types/films";

interface FilmListProps {
  setUpdate: CallableFunction;
}

const FilmList: FC<FilmListProps> = ({ setUpdate }) => {
  const [films, setFilms] = useState<FilmsType[]>([]);
  const [filmsToDisp, setFilmsToDisp] = useState<FilmsType[]>([])
  const dispatch = useAppDispatch();
  const search = useAppSelector(searchSelector)

  async function handleGetFilms() {
    try {
      const { data } = await axios.get("/api/film/allFilms");

      if (data) {
        setFilms(data.filmsDB);
        setFilmsToDisp(data.filmsDB)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearch = () => {
    const regex = new RegExp(`^${search.searchValue}`, "i");
    
    let newFilmArr = films.filter((e) => e.title.match(regex));

    if(search.ageSearch != "all")
    if(search.ageSearch != "0+") {
      if(search.ageSearch == "14+"){
        newFilmArr = newFilmArr.filter((e:FilmsType) => e.age !== "0+");
      } else {
        newFilmArr = newFilmArr.filter((e:FilmsType) => e.age == search.ageSearch);
      }
    } 
    if(search.genreeSearch != "all") {
      newFilmArr = newFilmArr.filter((e) => e.genree.includes(`${search.genreeSearch}`));
    }
    
    console.log(newFilmArr)
    setFilmsToDisp(newFilmArr)
  }

  useEffect(() => {
    handleGetFilms();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <div className="films">
      {filmsToDisp.map((film: FilmsType, index: React.Key | null | undefined) => {
        return <FilmCard key={index} film={film} setUpdate={setUpdate} />;
      })}
    </div>
  );
};

export default FilmList;

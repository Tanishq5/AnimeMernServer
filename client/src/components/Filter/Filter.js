import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


import Header from "../Header/Header";

import List from "./List/List";

export default function Filter() {
  const filter = useParams().type;

  const anime = useSelector((state) => state.anime);
  const actionanime = useSelector((state) => state.actionanime);
  const childanime = useSelector((state) => state.childanime);

  return (
    <div className="container">
      
      <Header />
      {filter === "anime" ? (
        <List filter="Anime" data={anime} />
      ) : null}
      {filter === "actionanime" ? (
        <List filter="Action Anime" data={actionanime} />
      ) : null}
      {filter === "childanime" ? (
        <List filter="Child Anime" data={childanime} />
      ) : null}
    </div>
  );
}

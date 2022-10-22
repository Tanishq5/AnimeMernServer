import React, { useState } from "react";
import Axios from "axios";
import { StatusAlertService } from "react-status-alert";

import "./Add.css";

export default function Add() {

  const [name, setname] = useState("");

  const [wood, setwood] = useState("Bollywood");

  const [thumblainImg, setthumblainImg] = useState("");
  const [trailerVideoId, settrailerVideoId] = useState("");

  const submitData = async () => {
    if (
      name &&
      wood &&
      thumblainImg &&
      trailerVideoId
    ) {
      const secret = localStorage.getItem("Site_New_Tokken");
      const trailerUrl = `https://www.youtube.com/embed/${trailerVideoId}`;

      const timestamp = await Date.now();

      const res = await Axios.post("/movie_data/add", {
        secret,
        name,
        wood,
        thumblainImg,
        trailerUrl,
        timestamp,
      });

      console.log(res);

      if (res.data.msg) {
        await StatusAlertService.showError("Something Want Wrong");
        console.log(res.data);
      } else {
        await StatusAlertService.showSuccess("Successfully Added");
        var time = setTimeout(() => {
          window.location.reload();
          clearTimeout(time);
        }, 2000);
      }
    } else {
      await StatusAlertService.showError("Please Enter All Data");
    }
  };

  return (
    <div className="mt-5 container text-center">
      <h1 className="mb-4">Add</h1>
      <hr className="bg-light mb-5" />
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <h4>Name</h4>

          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Anime Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        
        <h4>Genre</h4>
        <div className="form-group d-flex mt-5">
          <select
          
            value={wood}
            onChange={(e) => setwood(e.target.value)}
            className="browser-default custom-select"
          >
            <option value="Series">Anime</option>
            <option value="Bollywood">Action anime</option>
            <option value="Hollywood">Child anime</option>
          </select>
        </div>

        <div className="form-group">
          <h4 className="mt-5">Thumbnail</h4>
          <input
            className="form-control mr-1"
            aria-describedby="emailHelp"
            placeholder="Enter Url Of Thumblain Img"
            value={thumblainImg}
            onChange={(e) => setthumblainImg(e.target.value)}
          />

          <h4 className="mt-5">Trailer Id</h4>
          <input
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Id Of Trailer"
            value={trailerVideoId}
            onChange={(e) => settrailerVideoId(e.target.value)}
          />
        </div>
      </form>

      <button
        onClick={() => submitData()}
        className="btn my-5 btn-block btn-outline-light"
      >
        Submit
      </button>
    </div>
  );
}
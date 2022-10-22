import React, { useState } from "react";
import Axios from "axios";
import { StatusAlertService } from "react-status-alert";

export default function Edit({ data }) {

  const [name, setname] = useState(data.Name);

  const [wood, setwood] = useState(data.Wood);

  const [thumblainImg, setthumblainImg] = useState(data.Img);
  const [trailerUrl, settrailerUrl] = useState(data.Trailer);

  console.log(data.Timestamp);
  const [timestamp, settimestamp] = useState(data.TimeStamp);
  const [uid, setuid] = useState(data._id);


  const deleteData = async () => {
    try {
      const confirm = window.confirm("Are You Sure To Delete?");

      if (!confirm) {
        return;
      }

      const res = await Axios.delete(`/movie_data/delete/${uid}`);
      if (res.data.msg) {
        await StatusAlertService.showError("Something Want Wrong");
      } else {
        await StatusAlertService.showSuccess("delete Successfully");
        var time = setTimeout(() => {
          window.location.reload();
          clearTimeout(time);
        }, 2000);
      }
    } catch (err) {
      await StatusAlertService.showError(err);
    }
  };

  const updateData = async () => {
    try {
      if (
        name &&
        wood &&
        thumblainImg &&
        trailerUrl
      ) {
        const secret = localStorage.getItem("Site_New_Tokken");

        const res = await Axios.post("/movie_data/update", {
          uid,
          secret,
          name,
          wood,
          thumblainImg,
          trailerUrl,
          timestamp
        });

        console.log(res.data);

        if (res.data.msg) {
          await StatusAlertService.showError("Something Want Wrong");
          console.log(res.data);
        } else {
          await StatusAlertService.showSuccess("Successfully Updated");

          var time = setTimeout(() => {
            window.location.reload();
            clearTimeout(time);
          }, 2000);
        }
      } else {
        await StatusAlertService.showError("Please Enter All Data");
      }
    } catch (err) {
      await StatusAlertService.showError(err);
    }
  };

  return (
    <div className="mt-5 container text-center">
      <h1>Edit</h1>
      <hr className="bg-light mb-5" />
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group ">
          <h4>Name</h4>

          <input
            type="text"
            className="form-control mr-1"
            aria-describedby="emailHelp"
            placeholder="Anime Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="form-group d-flex mt-5">
          <select
            value={wood}
            onChange={(e) => setwood(e.target.value)}
            className="browser-default custom-select"
          >
            <option value="Bollywood">Action Anime</option>
            <option value="Hollywood">Child Anime</option>
            <option value="Series">Anime</option>
          </select>
        </div>

        <div className="form-group ">
          <h4 className="mt-5">Thumbnail</h4>
          <input
            className="form-control mr-1"
            aria-describedby="emailHelp"
            placeholder="Enter Url Of Thumblain Img"
            value={thumblainImg}
            onChange={(e) => setthumblainImg(e.target.value)}
          />

          <h4 className="mt-5">Trailer Url</h4>
          <input
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Url Of Trailer"
            value={trailerUrl}
            onChange={(e) => settrailerUrl(e.target.value)}
          />
        </div>

        <h4 className="mt-5">Timestamp</h4>

        <input
          className="form-control"
          aria-describedby="emailHelp"
          placeholder="Timestamp"
          value={timestamp}
          onChange={(e) => settimestamp(e.target.value)}
        />
      </form>

      <button
        onClick={() => deleteData()}
        className="btn my-5 btn-block btn-outline-light"
      >
        Delete
      </button>

      <button
        onClick={() => updateData()}
        className="btn my-5 btn-block btn-outline-light"
      >
        Submit
      </button>
    </div>
  );
}

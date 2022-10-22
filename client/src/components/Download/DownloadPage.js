import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

import "./DownloadPage.css";
import Header from "../Header/Header";

export default function DownloadPage() {
  const id = useParams().id;

  const [data, setdata] = useState("");

  const [seasonsNumberCount, setSeasonsNumberCount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dt = await (await Axios.post(`/movie_data/fetch/${id}`)).data;

        await setdata(dt[0]);
        document.title = dt[0].Name;

        if (dt[0].Wood === "Series") {
          setSeasonAndEpisod(dt[0].SeriesList);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

    return () => {
      document.title = "AnimeVerse";
    };
  },);

  const setSeasonAndEpisod = async (list) => {
    try {
      const seasonCount = [];

      list.map((ls) => {
        if (!seasonCount.includes(ls.Season)) {
          seasonCount.push(ls.Season);
        }
      });

      setSeasonsNumberCount(seasonCount);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <div className="div-border container text-light my-5 text-center">
        <div>
          <div className="div-border mt-3">
            <h1>{data.Name}</h1>
          </div>
          <div className="row my-5">
            <div className="col-lg-6">
              {/* <h4>One-Punch Man (Japanese: ワンパンマン, Hepburn: Wanpanman) is a Japanese superhero manga series created by One. It tells the story of Saitama, a superhero who, because he can defeat any opponent with a single punch, grows bored from a lack of challenge. One wrote the original webcomic manga version in early 2009.</h4> */}
            </div>
          </div>
          <div className="trailer mb-5">
            <h2 className="mb-2">Trailer On Youtube</h2>

            <center>
              <div className="iframe-container">
                <iframe
                  width="560"
                  height="315"
                  src={data.Trailer}
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen={true}
                ></iframe>
              </div>
            </center>
          </div>
        </div>
    </div>
    </div>
  );
}

import { useEffect, useState } from "react";

//components
import YouTubeVideo from "./Videos/YouTubeVideo";

//youtube credentials
import APIURL from "../../helpers/environment";

//styles
import "./styles/Home.css";
import YouTubeExplorer from "./Videos/YouTubeExplorer";
import YouTubeSubscribe from "../YoutubeSubscribe";

const Home = () => {
  const [videos, setVideos] = useState();
  const [nowPlaying, setNowPlaying] = useState();
  const [nowPlayingIndex, setNowPlayingIndex] = useState();
  const [totalResults, setTotalResults] = useState();
  const [nextPageToken, setNextPageToken] = useState();

  const fetchData = () => {
    fetch(`${APIURL}/youtube/videos`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setVideos(json.items);
        setNowPlaying(json.items[0]);
        setNowPlayingIndex(json.items[0].id.videoId);
        setTotalResults(json.pageInfo.totalResults);
        setNextPageToken(json.nextPageToken);
      })
      .catch((err) => console.log());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content-home">
      {/* <div className="videos">
        <YouTubeSubscribe />
      </div> */}
      <div className="videos">
        <YouTubeVideo
          embedId={nowPlaying ? nowPlaying.id.videoId : "R-fCZKdcJLY"}
        />
      </div>
      <YouTubeExplorer
        videos={videos}
        setVideos={setVideos}
        totalResults={totalResults}
        nextPageToken={nextPageToken}
        setNextPageToken={setNextPageToken}
        nowPlaying={nowPlaying}
        setNowPlaying={setNowPlaying}
        nowPlayingIndex={nowPlayingIndex}
        setNowPlayingIndex={setNowPlayingIndex}
      />
    </div>
  );
};

export default Home;

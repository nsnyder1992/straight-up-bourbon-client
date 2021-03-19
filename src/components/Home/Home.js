import { useEffect, useState } from "react";

//material ui
import { Typography } from "@material-ui/core";
//components
import YouTubeVideo from "./Videos/YouTubeVideo";

//youtube credentials
import { YOUTUBE_API_KEY, CHANNEL_ID } from "../../helpers/environment";

//styles
import "./styles/Home.css";
import YouTubeExplorer from "./Videos/YouTubeExplorer";

const Home = () => {
  const [videos, setVideos] = useState();
  const [nowPlaying, setNowPlaying] = useState();
  const [nowPlayingIndex, setNowPlayingIndex] = useState();
  const [totalResults, setTotalResults] = useState();
  const [nextPageToken, setNextPageToken] = useState();

  const fetchData = () => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=50&order=date&type=video&key=${YOUTUBE_API_KEY}`,
      {
        method: "GET",
        headers: new Headers({
          authorization: YOUTUBE_API_KEY,
          Accept: "application/json",
        }),
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setVideos(json.items);
        setNowPlaying(json.items[0]);
        setNowPlayingIndex(json.items[0].id.videoId);
        setTotalResults(json.pageInfo.totalResults);
        setNextPageToken(json.nextPageToken);
        console.log(json.items);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content-home">
      {/* <Typography variant="h4" id="title">
        {nowPlaying ? nowPlaying.snippet.title.replaceAll("&#39;", "'") : ""}
      </Typography> */}
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

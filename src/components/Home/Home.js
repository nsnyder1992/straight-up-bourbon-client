import { useEffect, useState } from "react";

//components
import YouTubeVideo from "./Videos/YouTubeVideo";

//youtube credentials
import APIURL from "../../helpers/environment";

//styles
import "./styles/Home.css";
import YouTubeExplorer from "./Videos/YouTubeExplorer";
import MetaSection from "../MetaSection";
import Suggestions from "./Suggestions/Suggestions";

import BackgroundVideo from "./Videos/BackgroundVideo";
import LinkSection from "./LinkSection";
import YouTubeSubscribe from "../Utils/YoutubeSubscribe";

const Home = ({ sections }) => {
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
    <div style={{ marginBottom: "100px" }}>
      <MetaSection sectionId={"background-video"}>
        {(title, description, image, link) => {
          return (
            <BackgroundVideo
              title={title}
              description={description}
              image={image}
              link={link}
            />
          );
        }}
      </MetaSection>
      <MetaSection sectionId={"videos"}>
        {(title, description, image) => {
          return (
            <div className="content-home">
              <div className="videos">
                <YouTubeVideo
                  embedId={nowPlaying ? nowPlaying.id.videoId : "R-fCZKdcJLY"}
                />
              </div>
              {/* <Box margin={2}>
        <YouTubeSubscribe
          channelId={process.env.REACT_APP_YOUTUBE_CHANNEL_ID}
        />
      </Box> */}
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
              <YouTubeSubscribe />
            </div>
          );
        }}
      </MetaSection>

      <div>
        <MetaSection sectionId={"link-section"}>
          {(title, description, image, link) => {
            return (
              <LinkSection
                description={description}
                title={title}
                image={image}
                link={link}
              />
            );
          }}
        </MetaSection>
      </div>

      <div className="content-home">
        <MetaSection sectionId={"suggestions"}>
          {(title, description, image) => {
            return (
              <Suggestions
                description={description}
                title={title}
                image={image}
              />
            );
          }}
        </MetaSection>
      </div>
    </div>
  );
};

export default Home;

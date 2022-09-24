import { useEffect, useState } from "react";

//material components
import { IconButton, CircularProgress, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

//hooks
import useWindowDimensions from "../../../helpers/hooks/windowResizeHooks";

//youtube credentials
import APIURL from "../../../helpers/environment";

//styles
import "./styles/YouTubeExplorer.css";

const YouTubeExplorer = ({
  videos,
  totalResults,
  setVideos,
  nextPageToken,
  setNextPageToken,
  setNowPlaying,
  nowPlayingIndex,
  setNowPlayingIndex,
}) => {
  //display states
  const [display, setDisplay] = useState();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState((page - 1) * limit);
  const { width } = useWindowDimensions();

  //loading states
  const [loading, setLoading] = useState(false);

  const handleDecPage = () => {
    if (page >= 1) {
      setOffset((page - 2) * limit);
      setPage(page - 1);
    }
  };

  const handleIncPage = async () => {
    await setOffset(page * limit);
    await setPage(page + 1);

    if (offset + limit >= videos.length) {
      setLoading(true);
      fetch(`${APIURL}/youtube/videos/page/${nextPageToken}`, {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setVideos([...videos, ...json.items]);
          setNextPageToken(json.nextPageToken);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  const handleNowPlaying = (e, video, key) => {
    setNowPlaying(video);
    setNowPlayingIndex(key);
  };

  const preventDefault = (e) => e.preventDefault();

  //handle updating display videos
  useEffect(() => {
    setDisplay(videos?.slice(offset, offset + limit));
  }, [videos, page, limit]);

  //handle updating the number of videos displayed on window size change
  useEffect(() => {
    let tempLimit = 5;
    if (width < 800) tempLimit = 4;
    if (width < 700) tempLimit = 3;
    if (width < 600) tempLimit = 2;
    if (width < 400) tempLimit = 1;
    setLimit(tempLimit);
  }, [width]);

  return (
    <div className="explorer">
      <IconButton disabled={page === 1 || loading} onClick={handleDecPage}>
        <ArrowBackIosIcon />
      </IconButton>
      {loading ? (
        <CircularProgress />
      ) : (
        display?.map((video, key) => {
          return (
            <div
              className="image-container"
              key={key}
              onClick={
                video.id.videoId === nowPlayingIndex
                  ? preventDefault
                  : (e) => handleNowPlaying(e, video, video.id.videoId)
              }
            >
              <img
                src={video?.snippet.thumbnails.default.url}
                key={key}
                className="thumbnails"
                alt="video-thumbnail"
              />
              {video.id.videoId === nowPlayingIndex ? (
                <div className="now-playing">
                  <Typography>Now Playing</Typography>
                </div>
              ) : (
                <div className="play">
                  <PlayCircleOutlineIcon style={{ fontSize: 50 }} />
                </div>
              )}
            </div>
          );
        })
      )}
      <IconButton
        disabled={offset + (limit - 1) >= totalResults || loading}
        onClick={handleIncPage}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
};

export default YouTubeExplorer;

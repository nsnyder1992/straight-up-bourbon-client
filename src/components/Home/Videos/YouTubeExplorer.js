import { useEffect, useState } from "react";

//material components
import { CircularProgress, Typography, Box, Button } from "@material-ui/core";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

//hooks
import useWindowDimensions from "../../../helpers/hooks/windowResizeHooks";

//youtube credentials
import APIURL from "../../../helpers/environment";

//styles
import "./styles/YouTubeExplorer.css";
import "../../Utils/styles/CustomScrollbar.css";

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
  const [display, setDisplay] = useState([]);
  const [limit, setLimit] = useState(20);
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

    if (offset + limit >= videos?.length) {
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

  const updateDisplay = () => {
    let tempArray = [...display];
    for (let video of videos?.slice(offset, offset + limit)) {
      tempArray.push(video);
    }
    setDisplay(tempArray);
  };
  //handle updating display videos
  useEffect(() => {
    if (videos) updateDisplay();
  }, [videos, page, limit]);

  //handle updating the number of videos displayed on window size change
  // useEffect(() => {
  //   let tempLimit = 5;
  //   if (width < 800) tempLimit = 4;
  //   if (width < 700) tempLimit = 3;
  //   if (width < 600) tempLimit = 2;
  //   if (width < 400) tempLimit = 1;
  //   setLimit(tempLimit);
  // }, [width]);

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      component="div"
      overflow="auto"
      width="100%"
      maxWidth="900px"
      margin={1}
    >
      {/* <CustomScrollbar> */}
      {display ? (
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
      ) : (
        <Typography>
          We Must have had a busy day. Youtube only allows us 10,000 requests a
          day. Please come back tomorrow and Videos will populate
        </Typography>
      )}

      <Button
        disabled={loading}
        style={{
          width: "100%",
          height: "100%",
          minHeight: "90px",
          margin: "0px 2px",
        }}
        onClick={handleIncPage}
      >
        {loading ? <CircularProgress /> : "Load More"}
      </Button>
      {/* </CustomScrollbar> */}
    </Box>
  );
};

export default YouTubeExplorer;

import { useEffect, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  makeStyles,
  Typography,
} from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

//youtube credentials
import APIURL from "../../../helpers/environment";

//styles
import "./styles/YouTubeExplorer.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    marginTop: 10,
    width: "100%",
    maxWidth: 700,
  },
  imageList: {
    flexWrap: "nowrap",
    //Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    maxWidth: 700,
    margin: 0,
  },
  title: {
    color: "white",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  image: {
    cursor: "pointer",
    margin: 0,
  },
  playing: {
    color: "white",
    cursor: "rgba(0, 0, 0, 0.6)",
  },
}));

const YoutubeList = ({
  videos,
  totalResults,
  setVideos,
  nextPageToken,
  setNextPageToken,
  setNowPlaying,
  nowPlayingIndex,
  setNowPlayingIndex,
}) => {
  const classes = useStyles();

  //display states
  const [display, setDisplay] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState((page - 1) * limit);

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

  const updateDisplay = () => {
    let tempArray = [...display];
    for (let video of videos?.slice(offset, offset + limit)) {
      tempArray.push(video);
    }
    setDisplay(tempArray);
  };

  useEffect(() => {
    if (videos) updateDisplay();
  }, [videos, page, limit]);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        {loading ? (
          <CircularProgress />
        ) : (
          <ImageList className={classes.imageList} cols={2.5}>
            {display?.map((video, key) => {
              return (
                <ImageListItem
                  className={classes.image}
                  key={video?.snippet}
                  onClick={
                    video.id.videoId === nowPlayingIndex
                      ? preventDefault
                      : (e) => handleNowPlaying(e, video, video.id.videoId)
                  }
                >
                  <img
                    src={video?.snippet.thumbnails.default.url}
                    key={key}
                    //   className="thumbnails"
                    alt="video-thumbnail"
                  />
                  <ImageListItemBar
                    title={
                      video.id.videoId === nowPlayingIndex
                        ? "Now Playing"
                        : null
                    }
                    classes={{
                      root:
                        video.id.videoId === nowPlayingIndex
                          ? classes.playing
                          : classes.titleBar,
                      title: classes.title,
                    }}
                  />
                </ImageListItem>
              );
            })}
            <Button onClick={handleIncPage}>Load more</Button>
          </ImageList>
        )}
      </Grid>
    </Grid>
  );
};

export default YoutubeList;

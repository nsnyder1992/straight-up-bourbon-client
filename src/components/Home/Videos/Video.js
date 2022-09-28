import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";

const Video = () => {
  const [showImage, setShowImage] = useState(false);
  const videoParentRef = useRef();

  const isSafari = () => {
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 0;
  };

  useEffect(() => {
    if (isSafari() && videoParentRef?.current) {
      const player = videoParentRef.current.children[0];

      if (player) {
        player.controls = false;
        player.playinline = true;
        player.muted = true;
        player.setAttribute("muted", "");
        player.autoplay = true;

        setTimeout(async () => {
          const promise = await player.play();

          if (promise.then) {
            promise
              .then((e) => {
                console.log(e);
              })
              .catch(() => {
                videoParentRef.current.style.display = "none";
                setShowImage(true);
              });
          }
        });
      }
    }
  }, [videoParentRef]);

  return (
    <>
      {showImage ? (
        <img
          src="/web_intro_Moment.jpg"
          alt="Poster of Video"
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <div
          ref={videoParentRef}
          style={{ height: "100%" }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(`
            <video autoplay loop muted playsinline poster="/web_intro_Moment.jpg" style="width: 100%; height: 100%;">
                <source src="/web_intro.mp4" type="video/mp4" />
            </video>
        `),
          }}
        />
      )}
    </>
  );
};

export default Video;

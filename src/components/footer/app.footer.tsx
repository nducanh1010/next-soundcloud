"use client";
import { TrackContext, useTrackContext } from "@/lib/track.wrapper";
import { useHasMounted } from "@/utils/customHook";
import { AppBar, Container } from "@mui/material";
import { useContext, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
const AppFooter = () => {
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
  console.log("check contex", currentTrack);
  const playerRef = useRef(null);
  const hasMounted = useHasMounted();

  if (!hasMounted) return <></>;
  if (playerRef?.current && currentTrack?.isPlaying === false) {
    //@ts-ignore
    playerRef?.current?.audio?.current?.pause();
  }
  if (playerRef?.current && currentTrack?.isPlaying === true) {
    //@ts-ignore
    playerRef?.current?.audio?.current?.play();
  }

  return (
    <div style={{ marginTop: 50 }}>
      <AppBar
        position="fixed"
        sx={{ top: "auto", bottom: 0, background: "#f2f2f2" }}
      >
        <Container
          sx={{
            display: "flex",
            gap: 10,
            background: "#f2f2f2",
            ".rhap_main": {
              gap: 30,
            },
          }}
        >
          <AudioPlayer
            ref={playerRef}
            layout="horizontal-reverse"
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
            volume={0.5}
            style={{ boxShadow: "unset", background: "#f2f2f2" }}
            // Try other props!
            onPlay={() => {
              setCurrentTrack({ ...currentTrack, isPlaying: true });
            }}
            onPause={() => {
              setCurrentTrack({ ...currentTrack, isPlaying: false });
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
              minWidth: 100,
            }}
          >
            <div style={{ color: "#ccc" }}>{currentTrack.description}</div>
            <div style={{ color: "black" }}>{currentTrack.title}</div>
          </div>
        </Container>
      </AppBar>
    </div>
  );
};
export default AppFooter;

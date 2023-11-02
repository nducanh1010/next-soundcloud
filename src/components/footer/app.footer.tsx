"use client";
import { TrackContext, useTrackContext } from "@/lib/track.wrapper";
import { useHasMounted } from "@/utils/customHook";
import { AppBar, Container } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
const AppFooter = () => {
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
  const playerRef = useRef(null);
  const hasMounted = useHasMounted();
  useEffect(() => {
    if (currentTrack?.isPlaying === false) {
      //@ts-ignore
      playerRef?.current?.audio?.current?.pause();
    }
    if (currentTrack?.isPlaying === true) {
      //@ts-ignore
      playerRef?.current?.audio?.current?.play();
    }
  }, [currentTrack]);
  if (!hasMounted) return <></>;

  return (
    <>
      {currentTrack._id && (
        <div style={{ marginTop: 50 }}>
          <AppBar
            position="fixed"
            sx={{ top: "auto", bottom: 0, background: "#f2f2f2" }}
          >
            <Container
              disableGutters
              sx={{
                display: "flex",
                gap: 10,
                background: "#f2f2f2",
                ".rhap_main": {
                  gap: 20,
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
                  width: "220px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    color: "#ccc",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {currentTrack.description}
                </div>
                <div
                  style={{
                    width: "100%",
                    color: "black",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {currentTrack.title}
                </div>
              </div>
            </Container>
          </AppBar>
        </div>
      )}
    </>
  );
};
export default AppFooter;

"use client";
import { useHasMounted } from "@/utils/customHook";
import { AppBar, Container } from "@mui/material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
const AppFooter = () => {
  const hasMounted = useHasMounted();
  if (!hasMounted) return <></>;
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
            layout="horizontal-reverse"
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
            volume={0.5}
            style={{ boxShadow: "unset", background: "#f2f2f2" }}
            // Try other props!
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
            <div style={{ color: "#ccc" }}>DA</div>
            <div style={{ color: "black" }}>Who i am ?</div>
          </div>
        </Container>
      </AppBar>
    </div>
  );
};
export default AppFooter;

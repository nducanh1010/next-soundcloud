"use client";
import { useHasMounted } from "@/utils/customHook";
import { AppBar, Container } from "@mui/material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
const AppFooter = () => {
  const hasMounted = useHasMounted();
  if (!hasMounted) return <></>;
  return (
    <div>
<<<<<<< HEAD
      <AppBar
        position="fixed"
        sx={{ top: "auto", bottom: 0, background: "#f2f2f2" }}
      >
        <Container
          sx={{
            display: "flex",
            gap: 10,
            background: "#f2f2f2",
          }}
        >
          <AudioPlayer
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
            volume={0.5}
            style={{ boxShadow: "unset" }}
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
=======
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Container>
          <AudioPlayer
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
            volume={0.5}
            // Try other props!
          />
>>>>>>> aebdb0a34aad65083e98fdc8628382ea0cd829be
        </Container>
      </AppBar>
    </div>
  );
};
export default AppFooter;

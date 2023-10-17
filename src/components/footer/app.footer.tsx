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
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Container>
          <AudioPlayer
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
            volume={0.5}
            // Try other props!
          />
        </Container>
      </AppBar>
    </div>
  );
};
export default AppFooter;

"use client";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useTrackContext } from "@/lib/track.wrapper";
interface IProps {
  data: ITrackTop;
}
const ProfileTrack = (props: IProps) => {
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

  const { data } = props;
  const theme = useTheme();
  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {data.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {data.uploader.name}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>

          {(data._id !== currentTrack._id ||
            (data._id === currentTrack._id &&
              currentTrack.isPlaying === false)) && (
            <IconButton
              aria-label="play/pause"
              onClick={(e) => {
                setCurrentTrack({ ...data, isPlaying: true });
              }}
            >
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
          )}
          {data._id === currentTrack._id && currentTrack.isPlaying === true && (
            <IconButton
              aria-label="play/pause"
              onClick={(e) => {
                setCurrentTrack({ ...data, isPlaying: false });
              }}
            >
              <PauseIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
          )}

          <IconButton aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151, marginLeft: "auto" }}
        image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${data.imgUrl}`}
        alt="Live from space album cover"
      />
    </Card>
  );
};
export default ProfileTrack;

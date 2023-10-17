"use client";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Divider } from "@mui/material";
<<<<<<< HEAD
interface IProps {
  data: ITrackTop[];
  title: string;
}
const MainSlider = (props: IProps) => {
  const NextArrow = (props: any) => {
    return (
      <Button
        color="inherit"
        variant="contained"
=======
const MainSlider = () => {
  const NextArrow = (props: any) => {
    return (
      <Button
        variant="outlined"
>>>>>>> aebdb0a34aad65083e98fdc8628382ea0cd829be
        onClick={props.onClick}
        sx={{
          position: "absolute",
          right: 0,
<<<<<<< HEAD
          top: "25%",
=======
          top: "50%",
>>>>>>> aebdb0a34aad65083e98fdc8628382ea0cd829be
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronRightIcon />
      </Button>
    );
  };
  const PreviousArrow = (props: any) => {
    return (
      <Button
<<<<<<< HEAD
        color="inherit"
        variant="contained"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          top: "25%",
=======
        variant="outlined"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          top: "50%",
>>>>>>> aebdb0a34aad65083e98fdc8628382ea0cd829be
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronLeftIcon />
      </Button>
    );
  };
  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
  };
  return (
    // sx cho pheps code trực tiếp css, được sport bởi next
    <Box
      sx={{
        margin: "0 50px",
<<<<<<< HEAD
        ".track": {
          padding: "0 10px",
          img: {
            height: 150,
            width: 150,
          },
=======
        ".abc": {
          padding: "0 10px",
>>>>>>> aebdb0a34aad65083e98fdc8628382ea0cd829be
        },
        h3: {
          border: "1px solid #ccc",
          padding: "20px",
          height: "200px",
        },
      }}
    >
<<<<<<< HEAD
      <h2> {props.title}</h2>
      <Slider {...settings}>
        {props.data.map((track) => {
          return (
            <div className="track" key={track._id}>
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track.imgUrl}`}
              />
              <h4>{track.title}</h4>
              <h5>{track.description}</h5>
            </div>
          );
        })}
=======
      <h2> Multiple Tracks</h2>
      <Slider {...settings}>
        <div className="abc">
          <h3>1</h3>
        </div>
        <div className="abc">
          <h3>2</h3>
        </div>
        <div className="abc">
          <h3>3</h3>
        </div>
        <div className="abc">
          <h3>4</h3>
        </div>
        <div className="abc">
          <h3>5</h3>
        </div>
        <div className="abc">
          <h3>6</h3>
        </div>
>>>>>>> aebdb0a34aad65083e98fdc8628382ea0cd829be
      </Slider>
      <Divider />
    </Box>
  );
};
export default MainSlider;

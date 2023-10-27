"use client";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function LinearWithValueLabel(props: IProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={props.trackUpload.percent} />
    </Box>
  );
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function InputFileUpload(props: any) {
  const { setInfo, info } = props;
  const { data: session } = useSession();
  const handleUpload = async (image: any) => {
    // upload ảnh
    try {
      const formData = new FormData();
      formData.append("fileUpload", image);
      const res = await axios.post(
        "http://localhost:8000/api/v1/files/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            target_type: "images",
          },
          // props.setTrackUpload({
          //     ...trackUpload, // giữ nguyên biến truyền vào, chỉ cập nhật 2bieens còn lại
          //     fileName: acceptedFiles[0].name,
          //     percent: percentCompleted
          // })
        }
      );
      console.log(res.data);
      await setInfo({
        ...info,
        imgUrl: res?.data.data.fileName,
      });
      // props.setTrackUpload({
      //     ...trackUpload, // giữ nguyên biến truyền vào, chỉ cập nhật 2bieens còn lại
      //     uploadedTrackName:res.data.data.fileName
      // })
      console.log(">>> check audio: ", res.data.data.fileName);
      console.log("info:", info);
    } catch (error) {
      //@ts-ignore
      alert(error?.response?.data?.message);
    }
  };

  return (
    <Button
      onChange={(e) => {
        const event = e.target as HTMLInputElement;
        if (event.files) {
          handleUpload(event.files[0]);
        }
      }}
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}

interface IProps {
  trackUpload: {
    fileName: string;
    percent: number;
    uploadedTrackName: string;
  };
}
interface INewTrack {
  title: string;
  description: string;
  trackUrl: string;
  imgUrl: string;
  category: string;
}
const Step2 = (props: IProps) => {
  const { data: session } = useSession();
  const [info, setInfo] = useState<INewTrack>({
    title: "",
    description: "",
    trackUrl: "",
    imgUrl: "",
    category: "",
  });
  const { trackUpload } = props;
  React.useEffect(() => {
    setInfo({ ...info, trackUrl: trackUpload.uploadedTrackName });
  }, [trackUpload]);
  const category = [
    {
      value: "CHILL",
      label: "CHILL",
    },
    {
      value: "WORKOUT",
      label: "WORKOUT",
    },
    {
      value: "PARTY",
      label: "PARTY",
    },
  ];
  const handleSubmitForm = async () => {
    const res = await axios.post("http://localhost:8000/api/v1/tracks", info, {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
        target_type: "images",
      },
    });
    console.log(res);
  };
  return (
    <div>
      <div>
        <div>{trackUpload.fileName}</div>
        <LinearWithValueLabel trackUpload={trackUpload} />
      </div>

      <Grid container spacing={2} mt={5}>
        <Grid
          item
          xs={6}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div style={{ height: 250, width: 250, background: "#ccc" }}>
            <div>
              {info.imgUrl && (
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${info.imgUrl}`}
                />
              )}
            </div>
          </div>
          <div>
            <InputFileUpload info={info} setInfo={setInfo} />
          </div>
        </Grid>
        <Grid item xs={6} md={8}>
          <TextField
            value={info?.title}
            onChange={(e) =>
              setInfo({
                ...info,
                title: e.target.value,
              })
            }
            label="Title"
            variant="standard"
            fullWidth
            margin="dense"
          />
          <TextField
            value={info?.description}
            onChange={(e) =>
              setInfo({
                ...info,
                description: e.target.value,
              })
            }
            label="Description"
            variant="standard"
            fullWidth
            margin="dense"
          />
          <TextField
            sx={{
              mt: 3,
            }}
            id="outlined-select-currency"
            select
            label="Category"
            fullWidth
            onChange={(e) =>
              setInfo({
                ...info,
                category: e.target.value,
              })
            }
            variant="standard"
            defaultValue=""
          >
            {category.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="outlined"
            sx={{
              mt: 5,
            }}
            onClick={() => {
              handleSubmitForm();
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Step2;

"use client";
import { useDropzone, FileWithPath } from "react-dropzone";
import "./theme.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useCallback } from "react";
import { sendFileRequest, sendRequest } from "@/utils/api";
import { useSession } from "next-auth/react";
import axios from "axios";
const InputFileUpload = () => {
  return (
    <Button
      onClick={(event) => event.preventDefault()} // ko bị pop up lên th cha
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>
  );
};
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

const Step1 = () => {
  const { data: session } = useSession(); // gán session vào data
  /*
  Thực hiện api upload tracks
  */
  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      // Do something with the files
      if (acceptedFiles && acceptedFiles[0]) {
        const audio = acceptedFiles[0];
        const formData = new FormData();
        console.log("session ", session?.access_token);
        formData.append("fileUpload", audio);
        // const chills = await sendFileRequest<IBackendRes<ITrackTop[]>>({
        //   headers: {
        //     Authorization: `Bearer ${session?.access_token}`,
        //     target_type: "tracks",
        //   },
        //   url: "http://localhost:8000/api/v1/files/upload",
        //   method: "POST",
        //   body: formData,
        // });
        try {
          const res = await axios.post(
            "http://localhost:8000/api/v1/files/upload",
            formData,
            {
              headers: {
                Authorization: `Bearer ${session?.access_token}`,
                target_type: "tracks",
              },
            }
          );
        } catch (error) {
          //@ts-ignore
          console.log(error?.response?.data.message);
        }
      }
    },
    [session]
  ); // hcayj khi biến session thay đổi, lúc đầu session bằng udefined
  // truyền option của file trong use Drop zone
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      audio: [".mp3", ".m4a", ".wav"],
    },
  });
  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <InputFileUpload />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
};

export default Step1;

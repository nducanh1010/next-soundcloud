import { useDropzone, FileWithPath } from "react-dropzone";
import "./theme.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useCallback } from "react";
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
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    // Do something with the files
  }, []);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
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

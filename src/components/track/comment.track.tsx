import { Box, TextField } from "@mui/material";
import { ITrackComment } from "./wave.track";
import { useState } from "react";
import { fetchDefaultImages, sendRequest } from "@/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import WaveSurfer from "wavesurfer.js";
import { useHasMounted } from "@/utils/customHook";
import Image from "next/image";
dayjs.extend(relativeTime);
interface IProps {
  comments: ITrackComment[] | null;
  track: ITrackTop | null;
  wavesurfer: WaveSurfer | null;
}
const CommmentTrack = (props: IProps) => {
  const router = useRouter();
  const hasMounted = useHasMounted(); //
  const { comments, track, wavesurfer } = props;
  // console.log("check cmt ", comments);
  const { data: session } = useSession();
  const [yourComment, setComment] = useState<string>("");
  const handleSubmit = async () => {
    const res = await sendRequest<IBackendRes<ITrackComment>>({
      url: "http://localhost:8000/api/v1/comments",
      method: "POST",
      body: {
        content: yourComment,
        moment: Math.round(wavesurfer?.getCurrentTime() ?? 0),
        track: track?._id,
      },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
    console.log("res", res);
    if (res.data) {
      setComment("");
      router.refresh();
    }
  };
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };
  const handleJumpTrack = (moment: number) => {
    if (wavesurfer) {
      const duration = wavesurfer.getDuration();
      wavesurfer.seekTo(moment / duration);
      wavesurfer.play;
    }
  };
  return (
    <>
      <div style={{ marginTop: 50, marginBottom: 25 }}>
        <TextField
          value={yourComment}
          id="standard-basic"
          label="Comments"
          variant="standard"
          fullWidth
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
      </div>
      <Box sx={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <div className="left" style={{ width: "190px" }}>
          <Image
            height={150}
            width={150}
            src={fetchDefaultImages(track?.uploader?.type!)}
          />
          <div>{track?.uploader?.email}</div>
        </div>
        <div className="right" style={{ width: "calc(100% - 200px)" }}>
          {comments?.map((item, index) => {
            return (
              <Box
                key={item._id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Image
                    alt="avatar comment"
                    height={20}
                    width={20}
                    src={fetchDefaultImages(item?.user?.type ?? "GITHUB")}
                  />

                  <div>
                    <div style={{ fontSize: "13px" }}>
                      {item?.user?.email} at
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleJumpTrack(item.moment);
                        }}
                      >
                        &nbsp;{formatTime(item.moment)}
                      </span>
                    </div>
                    <div>{item.content}</div>
                  </div>
                </Box>
                <div>{hasMounted && dayjs(item.createdAt).fromNow()}</div>
              </Box>
            );
          })}
        </div>
      </Box>
    </>
  );
};
export default CommmentTrack;

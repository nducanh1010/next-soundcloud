import Chip from "@mui/material/Chip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { sendRequest } from "@/utils/api";
interface IProps {
  track: ITrackTop | null;
}
const LikeTrack = (props: IProps) => {
  const { track } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const [trackLike, setTrackLike] = useState<ITrackLike[] | null>(null);
  const fectchData = async () => {
    if (session?.access_token) {
      const resLike = await sendRequest<
        IBackendRes<IModelPaginate<ITrackLike>>
      >({
        url: "http://localhost:8000/api/v1/likes",
        method: "GET",
        queryParams: {
          current: 1,
          pageSize: 100,
          sort: "-createdAt",
        },
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      if (resLike?.data?.result) {
        console.log("as", resLike?.data?.result);
        console.log("as2", track);
        setTrackLike(resLike?.data?.result);
      }
    }
  };
  useEffect(() => {
    fectchData();
  }, [session]);
  const handleLikeTrack = async () => {
    await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
      url: "http://localhost:8000/api/v1/likes",
      method: "POST",
      body: {
        track: track?._id,
        quantity:
          trackLike && trackLike[0]?.tracks.some((t) => t?._id === track?._id)
            ? -1
            : 1,
        // nếu bài hát đã có r thì sẽ dislike
      },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
    fectchData();
    // fetch lại dât phía sever
    router.refresh();
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <Chip
          onClick={() => handleLikeTrack()}
          sx={{ borderRadius: "5px" }}
          size="medium"
          variant="outlined"
          color={
            trackLike && trackLike[0].tracks.some((t) => t._id === track?._id)
              ? "error"
              : "default"
          }
          clickable
          icon={<FavoriteIcon />}
          label="Like"
        />
        <div
          style={{
            display: "flex",
            width: "100px",
            gap: "20px",
            color: "#999",
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            <PlayArrowIcon sx={{ fontSize: "20px" }} /> {track?.countPlay}
          </span>
          <span style={{ display: "flex", alignItems: "center" }}>
            <FavoriteIcon sx={{ fontSize: "20px" }} /> {track?.countLike}
          </span>
        </div>
      </div>
    </>
  );
};
export default LikeTrack;

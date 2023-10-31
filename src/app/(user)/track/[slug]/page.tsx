import WaveTrack, { ITrackComment } from "@/components/track/wave.track";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import { useSearchParams } from "next/navigation";

//slug dduwwocj đặt tên theo thu mục động [slug]
const DetailTrackPage = async (props: any) => {
  const { params } = props;
  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `http://localhost:8000/api/v1/tracks/${params.slug}`,
    method: "GET",
  });
  const res1 = await sendRequest<IBackendRes<IModelPaginate<ITrackComment>>>({
    url: `http://localhost:8000/api/v1/tracks/comments`,
    method: "POST",
    queryParams: {
      current: 1,
      pageSize: 1,
      trackId: params.slug,
      sort: "-createdAt",
    },
  });
  return (
    <Container>
      Detail Track Page
      <WaveTrack track={res?.data ?? null} comments={res1?.data?.result??null} />
    </Container>
  );
};
export default DetailTrackPage;

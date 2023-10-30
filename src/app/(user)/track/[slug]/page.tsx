import WaveTrack from "@/components/track/wave.track";
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

  return (
    <Container>
      Detail Track Page
      <WaveTrack track={res?.data ?? null} />
    </Container>
  );
};
export default DetailTrackPage;

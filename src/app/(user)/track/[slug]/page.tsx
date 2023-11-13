import WaveTrack, { ITrackComment } from "@/components/track/wave.track";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import { useSearchParams } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const temp = slug.split(".html") ?? [];
  const temp1 = temp[0].split("-") ?? [];
  const songId = temp1[temp1.length - 1] ?? ""; // lấy ra phần tử cuối cùng là id của bài hát
  // fetch data
  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `http://localhost:8000/api/v1/tracks/${songId}`,
    method: "GET",
  });

  return {
    title: res?.data?.title,
    description: res?.data?.description,
  };
}

//slug dduwwocj đặt tên theo thu mục động [slug]
const DetailTrackPage = async (props: any) => {
  const { params } = props;
  const slug = params.slug;
  const temp = slug.split(".html") ?? [];
  const temp1 = temp[0].split("-") ?? [];
  const songId = temp1[temp1.length - 1] ?? ""; // lấy ra phần tử cuối cùng là id của bài hát
  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `http://localhost:8000/api/v1/tracks/${songId}`,
    method: "GET",
    nextOption: {
      cache: "no-store",
    },
  });
  const res1 = await sendRequest<IBackendRes<IModelPaginate<ITrackComment>>>({
    url: `http://localhost:8000/api/v1/tracks/comments`,
    method: "POST",
    queryParams: {
      current: 1,
      pageSize: 10,
      trackId: songId,
      sort: "-createdAt",
    },
  });
  return (
    <Container>
      Detail Track Page
      <WaveTrack
        track={res?.data ?? null}
        comments={res1?.data?.result ?? null}
      />
    </Container>
  );
};
export default DetailTrackPage;

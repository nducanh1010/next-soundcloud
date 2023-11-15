import WaveTrack, { ITrackComment } from "@/components/track/wave.track";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
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
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${songId}`,
    method: "GET",
  });
  if (!res?.data) {
    notFound();
  }
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
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${songId}`,
    method: "GET",
    nextOption: {
      cache: "no-store",
      // next:{tags:['track-by-id']}   // để trigger update dât mỗi lần handle
    },
  });
  const res1 = await sendRequest<IBackendRes<IModelPaginate<ITrackComment>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/comments`,
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
      <WaveTrack
        track={res?.data ?? null}
        comments={res1?.data?.result ?? null}
      />
    </Container>
  );
};
export default DetailTrackPage;

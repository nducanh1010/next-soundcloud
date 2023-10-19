"use client";
import WaveTrack from "@/components/track/wave.track";
import { Container } from "@mui/material";
import { useSearchParams } from "next/navigation";

//slug dduwwocj đặt tên theo thu mục động [slug]
const DetailTrackPage = ({ params }: { params: { slug: string } }) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("audio"); // laays data param
  return (
    <Container>
      Detail Track Page
      <WaveTrack />
    </Container>
  );
};
export default DetailTrackPage;

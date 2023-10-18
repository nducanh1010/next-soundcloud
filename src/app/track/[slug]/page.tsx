"use client";
import WaveTrack from "@/components/track/wave.track";
import { useSearchParams } from "next/navigation";

//slug dduwwocj đặt tên theo thu mục động [slug]
const DetailTrackPage = ({ params }: { params: { slug: string } }) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("audio"); // laays data param
  return (
    <div>
      Detail Track Page
      <WaveTrack />
    </div>
  );
};
export default DetailTrackPage;

"use client";
import { useWavesurfer } from "@/utils/customHook";
import { useSearchParams } from "next/navigation";
import React, { useMemo, useRef } from "react";
const WaveTrack = () => {
  const searchParams = useSearchParams();
  const fileName = searchParams.get("audio"); // laays data param
  const containerRef = useRef<HTMLDivElement>(null);
  const optionMemo = useMemo(() => {
    return {
      container: containerRef.current,
      waveColor: "rgb(200,0,200)",
      progressColor: "rgb(100,0,100)",
      url: `/api?audio=${fileName}`,
    };
  }, []);
  const wavesurfer = useWavesurfer(containerRef, optionMemo);
  return (
    <>
      <div ref={containerRef}>wave track</div>
    </>
  );
};
export default WaveTrack;

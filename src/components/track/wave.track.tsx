"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
// WaveSurfer hook
const useWavesurfer = (containerRef: any, options: any) => {
  const [wavesurfer, setWavesurfer] = useState<any>(null);

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
    });

    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [options, containerRef]);

  return wavesurfer;
};
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
  // useEffect(() => {
  //   if (containerRef.current) {
  //     const waveSurfer = WaveSurfer.create({
  //       container: containerRef.current,
  //       waveColor: "rgb(200,0,200)",
  //       progressColor: "rgb(100,0,100)",
  //       url: `/api?audio=${fileName}`,
  //     });
  //     return () => {
  //       waveSurfer.destroy();
  //     };
  //   }
  // }, []);
  return (
    <>
      <div ref={containerRef}>wave track</div>
    </>
  );
};
export default WaveTrack;

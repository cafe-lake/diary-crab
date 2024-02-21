"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Canvas = dynamic(() => import("../../components/diary-canvas"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const divRef = useRef<HTMLInputElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  }, []);

  const onClickConfirm = () => {
    console.log("create");
    router.push("/mypage");
  };

  return (
    <main className="min-h-screen p-4 max-w-[800px] m-auto">
      <h2 className="text-2xl font-bold p-4 text-center">絵日記をかく</h2>
      <div className="w-full h-[40vh]" ref={divRef}>
        <Canvas dimensions={dimensions} />
      </div>
      <div className="mt-4">
        <textarea className="w-full h-24"></textarea>
      </div>
      <div className="text-center">
        <button
          className="border border-solid border-gray-400 rounded bg-white p-1 mb-1 m-auto"
          onClick={onClickConfirm}
        >
          かくにん
        </button>
      </div>
    </main>
  );
}

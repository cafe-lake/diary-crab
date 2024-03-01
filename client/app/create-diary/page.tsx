"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Konva from "konva";
import axios from "axios";
import CanvasItemSelectBox from "@/components/canvas-item-select-box";
import { CanvasItemOption } from "@/app/_common/types/item";

const Canvas = dynamic(() => import("../../components/diary-canvas"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const divRef = useRef<HTMLInputElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [selectedItems, setSelectedItems] = useState<CanvasItemOption[]>([]);
  const [options, setOptions] = useState<CanvasItemOption[]>([
    {
      id: 1,
      label: "アイテム1",
      url: "https://3.bp.blogspot.com/-6T6YOr6aUck/UdEenstrOOI/AAAAAAAAVzw/GCMNx0MKMGI/s718/yaoya.png",
    },
    {
      id: 2,
      label: "アイテム2",
      url: "https://3.bp.blogspot.com/-6T6YOr6aUck/UdEenstrOOI/AAAAAAAAVzw/GCMNx0MKMGI/s718/yaoya.png",
    },
    {
      id: 3,
      label: "アイテム3",
      url: "https://3.bp.blogspot.com/-6T6YOr6aUck/UdEenstrOOI/AAAAAAAAVzw/GCMNx0MKMGI/s718/yaoya.png",
    },
  ]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  }, []);

  /**
   * 追加する絵を選択した
   * @param option
   */
  const handleSelect = (option: CanvasItemOption) => {
    setSelectedItems([...selectedItems, option]);
  };

  const onClickSubmit = async () => {
    if (!stageRef.current) return;
    const img = await stageRef.current.toDataURL();
    const formData = new FormData();
    formData.append("img", img);
    formData.append("text", text);

    const res = await axios
      .post("http://localhost:4000/posts", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        if (error.response.status == 401) {
          router.push("/login");
        } else {
          alert("ネットワークエラー。。すこし待ってもういっかい！");
        }
        return;
      });
  };

  return (
    <main className="min-h-screen p-4 max-w-[800px] m-auto">
      <h2 className="text-2xl font-bold p-4 text-center">絵日記をかく</h2>
      <div className="w-full h-[40vh]" ref={divRef}>
        <Canvas
          dimensions={dimensions}
          stageRef={stageRef}
          selectedItems={selectedItems}
        />
      </div>
      <div>
        <CanvasItemSelectBox options={options} onSelect={handleSelect} />
      </div>
      <div className="mt-4">
        <textarea
          className="w-full h-24"
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className="text-center">
        <button
          className="border border-solid border-gray-400 rounded bg-white p-1 mb-1 m-auto"
          onClick={onClickSubmit}
        >
          かきおわった
        </button>
      </div>
    </main>
  );
}

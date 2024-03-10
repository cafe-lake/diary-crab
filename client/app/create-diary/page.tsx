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
  const [userInfo, setUserInfo] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [selectedItems, setSelectedItems] = useState<CanvasItemOption[]>([]);
  const [options, setOptions] = useState<CanvasItemOption[] | null>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    return () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      axios
        .get(apiUrl + "/users/my-info", { withCredentials: true })
        .then((data: any) => {
          setUserInfo(data.data.user);
          console.log("user:", data.data.user);
        })
        .catch((err) => {
          if (err.response.status == 401) {
            router.push("/login");
          } else {
            alert("ネットワークエラー。。すこし待ってもういっかい！");
          }
        });
      axios
        .get(apiUrl + "/canvas-items", { withCredentials: true })
        .then((data: any) => {
          setOptions(data.data.canvas_items);
          console.log("canvas_items:", data.data.canvas_items);
        })
        .catch((err) => {
          if (err.response.status == 401) {
            router.push("/login");
          } else {
            alert("ネットワークエラー。。すこし待ってもういっかい！");
          }
        });
      if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
        setDimensions({
          width: divRef.current.offsetWidth,
          height: divRef.current.offsetHeight,
        });
      }
    };
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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios
      .post(apiUrl + "/posts", formData, {
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
        {userInfo && (
          <Canvas
            me={userInfo}
            dimensions={dimensions}
            stageRef={stageRef}
            selectedItems={selectedItems}
          />
        )}
      </div>
      <div>
        {options && (
          <CanvasItemSelectBox options={options} onSelect={handleSelect} />
        )}
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

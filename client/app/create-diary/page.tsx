"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const onClickConfirm = () => {
    console.log("create");
    router.push("/mypage");
  };

  return (
    <main className="min-h-screen p-4 max-w-[800px] m-auto">
      <h2 className="text-2xl font-bold p-4 text-center">絵日記をかく</h2>
      <div className="h-24">

      </div>
      <div>
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

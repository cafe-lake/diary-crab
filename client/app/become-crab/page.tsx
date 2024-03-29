"use client";
import Image from "next/image";
import CrabImage from "../crab.jpg";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">
          おめでとう！カニになったよ！
        </h2>
        <Image src={CrabImage} width={200} height={200} alt="crab" />
        <button
          onClick={handleClick}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          マイページへ
        </button>
      </div>
    </main>
  );
}

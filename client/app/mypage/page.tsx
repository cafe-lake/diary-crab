"use client";
import Image from "next/image";
import CrabImage from "../crab.jpg";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const elements = Array.from({ length: 20 }, (_, index) => index + 1);
  
  const onClickCreateDiary = () => {
    router.push("/create-diary");
  }

  return (
    <main className="min-h-screen p-4 max-w-[800px] m-auto">
      <h2 className="text-2xl font-bold p-4 text-center">マイページ</h2>
      <div className="flex">
        <div>
          <div className="flex justify-center">
            <Image src={CrabImage} width={100} height={100} alt="crab" />
          </div>
          <div className="text-center">かにくぼカニ</div>
        </div>
        <div className="ml-2">
          <button className="border border-solid border-gray-400 rounded bg-white p-1 mb-1" onClick={onClickCreateDiary}>
            絵日記をかく
          </button>
          <button className="border border-solid border-gray-400 rounded bg-white p-1">
            みんなの絵日記をよむ
          </button>
        </div>
      </div>
      <div className="mt-4">将来の夢：タカアシガニ</div>
      <div className="flex mt-10 h-[50vw] bg-white">
        <div className="w-full h-full relative border border-solid border-gray-400 border-b-0">
          <Image src={CrabImage} layout="fill" objectFit="contain" alt="crab" />
        </div>
        <div className="w-full h-full relative border border-solid border-gray-400 border-b-0">
          <Image src={CrabImage} layout="fill" objectFit="contain" alt="crab" />
        </div>
      </div>
      <div className="flex h-[50vw] bg-white">
        <div className="w-full h-full relative border border-solid border-gray-400 border-t-0 overflow-hidden">
          <p className="h-6 border-b border-gray-400 mx-2">
            2回目の投稿！星かと思って手にとったらヒトデでした☆
          </p>
          {elements.map((element) => (
            <p key={element} className="h-6 border-b border-gray-400 mx-2"></p>
          ))}
        </div>
        <div className="w-full h-full relative border border-solid border-gray-400 border-t-0 overflow-hidden">
          <p className="h-6 border-b border-gray-400 mx-2">
            初投稿！よろしくね
          </p>
          {elements.map((element) => (
            <p key={element} className="h-6 border-b border-gray-400 mx-2"></p>
          ))}
        </div>
      </div>
    </main>
  );
}

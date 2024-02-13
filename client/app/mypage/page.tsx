"use client";
import Image from "next/image";
import CrabImage from "../crab.jpg";

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <h2 className="text-2xl font-bold p-4 text-center">マイページ</h2>
      <div className="flex">
        <div>
          <div className="flex justify-center">
            <Image src={CrabImage} width={100} height={100} alt="crab" />
          </div>
          <div className="text-center">かにくぼカニ</div>
        </div>
        <div>
          <div>フォロー：0</div>
          <div>フォロワー：0</div>
        </div>
      </div>
      <div className="mt-4">将来の夢：タカアシガニ</div>
      <div className="flex mt-10 h-[50vw]">
        <div className="w-full h-full relative">
          <Image src={CrabImage} layout="fill" objectFit="contain" alt="crab" />
        </div>
        <div className="w-full h-full relative">
          <Image src={CrabImage} layout="fill" objectFit="contain" alt="crab" />
        </div>
      </div>
      <div className="flex h-[50vw]">
        <div className="w-full h-full relative">
          2回目の投稿！星かと思ったらヒトデでした☆
        </div>
        <div className="w-full h-full relative">初投稿！よろしくね</div>
      </div>
    </main>
  );
}

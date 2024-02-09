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
      <div className="flex mt-10">
        <div className="w-1/2 border border-solid border-black">
          <div className="w-full relative">
            <Image
              src={CrabImage}
              width={0}
              height={0}
              sizes="100%"
              alt="crab"
            />
          </div>
          <div>2回目の投稿！将来はタカアシガニになりたいな！</div>
        </div>
        <div className="w-1/2 border border-solid border-black">
          <div className="w-full relative">
            <Image src={CrabImage} width={0} height={0} alt="crab" />
          </div>
          <div>初投稿！色々な思い出を残していくよ</div>
        </div>
      </div>
    </main>
  );
}

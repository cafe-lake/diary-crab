"use client";

import axios from "axios";
import Image from "next/image";
import CrabImage from "./crab.jpg";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserPost } from "./_common/types/user";

export default function Home() {
  const router = useRouter();
  const elements = Array.from({ length: 20 }, (_, index) => index + 1);

  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);
  const [pageNumber, setPageNumber] = useState<number | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios
      .get(apiUrl + "/users/my-info", { withCredentials: true })
      .then((data: any) => {
        setUserInfo(data);
        console.log("user:", data);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          router.push("/login");
        } else {
          alert("ネットワークエラー。。すこし待ってもういっかい！");
        }
      });

    let current_page: number = 1;
    if (localStorage.getItem("currentPage") === null) {
      localStorage.setItem("currentPage", String(current_page));
    } else {
      current_page = Number(localStorage.getItem("currentPage"));
    }

    setPageNumber(current_page);
  }, []);

  useEffect(() => {
    if (!pageNumber) return;
    axios
      .get(apiUrl + "/posts?current_page=" + pageNumber, {
        withCredentials: true,
      })
      .then((res: any) => {
        setUserPosts(res.data.posts);
        console.log("posts:", res.data.posts);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          router.push("/login");
        } else {
          alert("ネットワークエラー。。すこし待ってもういっかい！");
        }
      });
  }, [pageNumber]);

  const onClickCreateDiary = () => {
    router.push("/create-diary");
  };

  const handlePrevPage = () => {
    if (!pageNumber || pageNumber == 1) return;
    let prevPage: number = pageNumber - 1;
    localStorage.setItem("currentPage", String(prevPage));
    setPageNumber(prevPage);
    console.log(prevPage);
  };

  const handleNextPage = () => {
    if (!pageNumber) return;
    let nextPage: number = pageNumber + 1;
    localStorage.setItem("currentPage", String(nextPage));
    setPageNumber(nextPage);
    console.log(nextPage);
  };

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
          <button
            className="border border-solid border-gray-400 rounded bg-white p-1 mb-1"
            onClick={onClickCreateDiary}
          >
            絵日記をかく
          </button>
          <button className="border border-solid border-gray-400 rounded bg-white p-1">
            みんなの絵日記をよむ
          </button>
        </div>
      </div>
      <div className="mt-4">将来の夢：タカアシガニ</div>
      <div className="handlePage">
        <button
          className="border border-solid border-gray-400 rounded bg-white p-1 mb-1"
          onClick={handlePrevPage}
        >
          前のページ
        </button>
        <button
          className="border border-solid border-gray-400 rounded bg-white p-1 mb-1"
          onClick={handleNextPage}
        >
          次のページ
        </button>
      </div>
      <div className="flex">
        {userPosts?.map((post: UserPost, i) => {
          return (
            <div key={i} className="flex-1">
              <div className="mt-10 h-[50vw] bg-white">
                <div className="w-full h-full relative border border-solid border-gray-400 border-b-0">
                  <Image
                    src={post.image_url}
                    layout="fill"
                    objectFit="contain"
                    alt="crab"
                  />
                </div>
              </div>
              <div className="bg-white flex-1">
                <div className="w-full h-full relative border border-solid border-gray-400 border-t-0 overflow-hidden">
                  <p className="h-6 border-b border-gray-400 mx-2">
                    {post.text}
                  </p>
                  {elements.map((element) => (
                    <p
                      key={element}
                      className="h-6 border-b border-gray-400 mx-2"
                    ></p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

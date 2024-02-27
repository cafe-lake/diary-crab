"use client";
import Link from "next/link";
import axios from "axios";
import { User } from "../_common/types/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const onClickSubmit = async () => {
    const res = await axios
      .post<User>(
        "http://localhost:4000/auth/login",
        {
          loginId: loginId,
          password: password,
        },
        { withCredentials: true }
      )
      .then(() => {
        console.log("ログイン成功");
        router.push("/");
      })
      .catch((error) => {
        console.log("ログイン失敗");
        console.log(error);
        // TODO: error.response.data.errosが原因なので、ここでinvalidな入力フォームの下に赤い文字で原因を表示してあげる
        return;
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">ログイン</h2>
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              ログインID
            </label>
            <input
              type="id"
              id="id"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              onChange={(event) => setLoginId(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              パスワード
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={(e) => {
              e.preventDefault();
              onClickSubmit();
            }}
          >
            ログイン
          </button>
        </form>
        <div className="mt-4">
          <Link href="/register">まだカニでない方はこちらでカニになる</Link>
        </div>
      </div>
    </main>
  );
}

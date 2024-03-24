"use client";
import Link from "next/link";
import axios from "axios";
import { User } from "@/app/_common/types/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [loginIdErrorMsg, setLoginIdErrorMsg] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const onClickSubmit = async () => {
    setLoginIdErrorMsg("");
    setPasswordErrorMsg("");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios
      .post<User>(
        apiUrl + "/auth/login",
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
        const data = error.response.data[0];
        console.log(data);
        if (data.path == "loginId") {
          setLoginIdErrorMsg(data.msg);
        } else if (data.path == "password") {
          setPasswordErrorMsg(data.msg);
        }
        return;
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">ログイン</h2>

        <form className="w-full max-w-sm">
          <div>
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
          <div className="mb-4 text-red-500">{loginIdErrorMsg}</div>
          <div>
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
          <div className="mb-4 text-red-500">{passwordErrorMsg}</div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
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

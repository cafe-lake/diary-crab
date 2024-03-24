"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { User } from "@/app/_common/types/user";
import Introcuce from "@/components/introduce";

export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userNameErrorMsg, setUserNameErrorMsg] = useState("");
  const [loginId, setLoginId] = useState("");
  const [loginIdErrorMsg, setLoginIdErrorMsg] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordCheckErrorMsg, setPasswordCheckErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);

  const onClickSubmit = async () => {
    setLoginIdErrorMsg("");
    setPasswordErrorMsg("");
    if (!userName) {
      setUserNameErrorMsg("名前は必須です！");
    } else {
      setUserNameErrorMsg("");
    }
    if (password != passwordCheck) {
      setPasswordCheckErrorMsg("パスワードが一致していません");
      return;
    }
    setPasswordCheckErrorMsg("");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios
      .post<User>(
        apiUrl + "/auth/register",
        {
          userName: userName,
          loginId: loginId,
          password: password,
          passwordConfirm: passwordCheck,
        },
        { withCredentials: true }
      )
      .then(() => {
        console.log("登録成功");
        router.push("/become-crab");
      })
      .catch((error) => {
        const errors = error.response.data.errors;
        errors.forEach((err: any) => {
          if (err.path == "loginId") {
            setLoginIdErrorMsg(err.msg);
          } else if (err.path == "password") {
            setPasswordErrorMsg(err.msg);
          }
        });
        return;
      });
  };

  const introduce = () => {
    setShowModal(true); // モーダルを表示する
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">カニになる</h2>
        <div className="flex justify-end mb-4">
          <button
            className="bg-white text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            onClick={introduce}
          >
            絵日記クラブとは？
          </button>

          {/* モーダルコンポーネント */}
          <Introcuce
            showModal={showModal}
            closeModal={() => setShowModal(false)}
          />
        </div>

        <form className="w-full max-w-sm">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              名前
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
          <div className="mb-4 text-red-500">{userNameErrorMsg}</div>
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
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              パスワード確認
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              onChange={(event) => setPasswordCheck(event.target.value)}
            />
          </div>
          <div className="mb-4 text-red-500">{passwordCheckErrorMsg}</div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={(e) => {
              e.preventDefault();
              onClickSubmit();
            }}
          >
            カニになる
          </button>
        </form>
        <div className="mt-4">
          <p>
            <Link href="/login">もうカニの方はログインへ</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

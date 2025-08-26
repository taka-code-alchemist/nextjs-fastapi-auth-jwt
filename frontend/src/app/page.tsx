import { Signin } from "@/components/auth/signin";
import { auth } from "@/auth";
import { getCurrentUser, signOut } from "@/lib/auth/actions"

export default async function Home() {

  const currentUser = await getCurrentUser()

  return (
    <div>
      <div>{currentUser ? `ログイン名：${currentUser.username}` : 'ログインしていません'}</div>
      <Signin />
    </div>
  );
}

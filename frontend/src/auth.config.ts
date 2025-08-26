import type { NextAuthConfig, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const authConfig = {
    trustHost: true,
    pages: {
        signIn: "signin",
    },
    callbacks: {
        // Middlewareでユーザーの認証を行うときに呼び出される
        // NextResponseを返すことでリダイレクトやエラーを返すことができる
        authorized({
            auth,
            request: { nextUrl },
        }: {
            auth: Session | null;
            request: NextRequest;
        }) {
            console.log("authorized", auth, nextUrl.pathname);

            // /user以下のルートの保護
            const isOnAuthenticatedPage = nextUrl.pathname.startsWith("/user");

            if (isOnAuthenticatedPage) {
                const isLoggedin = !!auth?.user;
                if (!isLoggedin) {
                    // falseを返すと，Signinページにリダイレクトされる
                    return false;
                }
                return true;
            }
            return true;
        },
        // JSON Web Token が作成されたとき（サインイン時など）や更新されたとき（クライアントでセッションにアクセスしたときなど）に呼び出される。ここで返されるものはすべて JWT に保存され，session callbackに転送される。そこで、クライアントに返すべきものを制御できる。それ以外のものは、フロントエンドからは秘匿される。JWTはAUTH_SECRET環境変数によってデフォルトで暗号化される。
        // セッションに何を追加するかを決定するために使用される
        async jwt({ token, user }: { token: JWT; user: User }) {
            console.log("jwt", token, user);
            if (user) {
                token.backendToken = user.backendToken;
                token.user = user;
            }
            return token;
        },
        //セッションがチェックされるたびに呼び出される（useSessionやgetSessionを使用して/api/sessionエンドポイントを呼び出した場合など）。
        // 戻り値はクライアントに公開されるので、ここで返す値には注意が必要！
        // jwt callbackを通してトークンに追加したものをクライアントが利用できるようにしたい場合，ここでも明示的に返す必要がある
        // token引数はjwtセッションストラテジーを使用する場合にのみ利用可能で、user引数はデータベースセッションストラテジーを使用する場合にのみ利用可能
        // JWTに保存されたデータのうち，クライアントに公開したいものを返す
        async session({ session, token }: { session: Session; token: JWT }) {
            console.log("session", session, token);
            session.backendToken = token.backendToken;
            session.user = token.user;
            return session;
        },
    },
    providers: [],
} satisfies NextAuthConfig;

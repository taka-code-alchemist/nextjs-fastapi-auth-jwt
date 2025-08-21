import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import credentials from "next-auth/providers/credentials";
import { signin } from "./lib/auth/actions";

// auth: Next.jsアプリでNextAuth.jsとやりとりするための汎用メソッド。auth.ts(このファイル)でNextAuth.jsを初期化した後、Middleware、ServerComponents、Route Handler（app router）でこのメソッドを使う
//
// signIn: providerを指定してサインインすることができる。指定されていない場合、ユーザはサインインページにリダイレクトされる。デフォルトでは、ユーザはサインイン後に現在のページにリダイレクトされます。redirectToオプションに相対パスを設定することで、この動作をオーバーライドできる。
//
// signOut: ユーザーをサインアウトする。セッションがデータベース戦略を使用して作成された場合、セッションはデータベースから削除され、関連するクッキーは無効になります。セッションがJWTを使用して作成された場合、クッキーは無効になる．デフォルトでは、サインアウト後、ユーザーは現在のページにリダイレクトされます。redirectTo オプションに相対パスを設定することで、この動作をオーバーライドできます。
//
// handlers: 今回は使用しない
// NextAuth.jsのRouteHandlerメソッド。これらは、OAuth/Emailプロバイダー用のエンドポイント、および(`/api/auth/session`のような)クライアントから接続できるREST APIエンドポイントを公開するために使用されます。
export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        credentials({
            // signInが呼ばれた際にこの関数が呼び出される
            async authorize({ username, password }) {
                console.log("authorize:", username, password);
                if (typeof username !== 'string' || typeof password !== 'string') {
                    return null
                }
                console.log("authorize:", username, password);
                // 実際にはここでバックエンドにリクエストを送信して認証を行う
                const data = await signin(username, password)
                if (!data) {
                    return null
                }
                const backendToken = data.access_token;
                const user = { backendToken };

                console.log("token:", backendToken);
                if (!backendToken) {
                    // 認証に失敗した場合は nullを返すか，エラーを投げることが期待される
                    // CredentialsSignin がスローされた場合、または null が返された場合、以下の 2 つのことが起こる：
                    // 1. URL に error=CredentialsSignin&code=credentials を指定して、ユーザーをログインページにリダイレクトする。
                    // 2. フォームアクションをサーバーサイドで処理するフレームワークでこのエラーを投げる場合(例えばserver actionsでsignInを呼び出す場合)、このエラーはログインフォームアクションによって投げられるので、そこで処理する必要がある。
                    return null;
                }
                return user;
            },
        }),
    ],
});
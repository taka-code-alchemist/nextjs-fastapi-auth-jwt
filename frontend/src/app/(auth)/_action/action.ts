"use server";

import { redirect } from "next/navigation";
import { signIn } from "../../../auth";
import { AuthError } from "next-auth";
// import { isRedirectError } from "next/dist/client/components/redirect";
import { isRedirectError } from "next/dist/client/components/redirect-error";
export type LoginState = {
    errors?: {
        username?: string[];
        password?: string[];
    };
    value?: {
        username?: string;
        password?: string;
    };
    message?: string;
};

export const signin = async (
    _state: LoginState,
    formData: FormData
): Promise<LoginState> => {
    // login処理
    try {
        // NEXT_REDIRECTが投げられ，catchでリダイレクトされる
        await signIn("credentials", formData);
        return { message: "success" };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    console.error("Signin error:", error);
                    return {
                        message: "メールアドレスまたはパスワードが間違っています",
                    };
                case "CallbackRouteError":
                    // return {
                    //     message: error.cause?.err?.message, // ← ここ
                    // };
                    return {
                        message: 'エラーっす'
                    };
                default:
                    return {
                        message: "ログインに失敗しました。",
                    };
            }
        }
        // リダイレクトエラーの場合はリダイレクト
        if (isRedirectError(error)) {
            // redirect("/user");
            console.log('redirect error')
            redirect("/");
        }
        return {
            message: "An unexpected error occurred during signin",
        };
    }
};
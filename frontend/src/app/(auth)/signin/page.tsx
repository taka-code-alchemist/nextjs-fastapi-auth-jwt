"use client";

import { useFormState } from "react-dom";
import { useActionState } from "react";
import { LoginState, signin } from "../_action/action";

export default function SignInPage() {
    const initialState = {
        errors: {},
    } satisfies LoginState;

    // const [state, dispatch] = useFormState(signin, initialState);
    const [state, dispatch] = useActionState(signin, initialState);
    return (
        <div className="relative flex h-screen flex-col justify-center overflow-hidden">
            <div className="m-auto w-full rounded bg-white p-6 shadow-md md:max-w-lg">
                <h1 className="text-center text-3xl font-semibold text-primary">
                    SIGN IN
                </h1>
                {/* エラーメッセージを表示 */}
                {state.message && (
                    <div className="text-red-500 text-center">{state.message}</div>
                )}
                <form action={dispatch} className="space-y-4">
                    {/* email */}
                    <div>
                        <label className="label">
                            <span className="label-text text-base">username</span>
                        </label>
                        <input
                            className="input input-bordered input-primary w-full"
                            defaultValue={""}
                            name="username"
                            type="text"
                        />
                    </div>
                    {/* password */}
                    <div>
                        <label className="label">
                            <span className="label-text text-base">password</span>
                        </label>
                        <input
                            className="input input-bordered input-primary w-full"
                            defaultValue={""}
                            name="password"
                            type="password"
                        />
                    </div>
                    <div>
                        <button className="btn btn-primary" type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
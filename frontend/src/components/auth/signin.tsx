'use client'

import { limitedMethod, superLimitedMethod, signOut, generalMethod } from "@/lib/auth/actions"
import { useState } from "react"

export function Signin() {

    const [data, setData] = useState('')
    const handleGeneral = async () => {
        const res = await generalMethod()
        setData(JSON.stringify(res))
    }
    const handleLimited = async () => {
        const res = await limitedMethod()
        setData(JSON.stringify(res))
    }
    const handleSuperLimited = async () => {
        const res = await superLimitedMethod()
        setData(JSON.stringify(res))
    }
    const handleSignOut = async () => {
        await signOut()
    }
    return (
        <>
            <div>
                <button onClick={handleGeneral}>一般</button>
            </div>
            <div>
                <button onClick={handleLimited}>制限</button>
            </div>
            <div>
                <button onClick={handleSuperLimited}>超制限</button>
            </div>
            <div>
                {data}
            </div>
            <div>
                {/* <a href="/signin">アカウント切り替え</a> */}
                <button onClick={handleSignOut}>ログアウト</button>
            </div>
        </>
    )
}
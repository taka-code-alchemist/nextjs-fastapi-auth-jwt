'use server'

import axios, { AxiosError } from "axios"
import { auth, signOut as logout } from "@/auth"

const apiHome = `http://${process.env.API_HOST}`
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.interceptors.request.use(async config => {
    if (config.url === '/token') {
        config.headers["Content-Type"] = "application/x-www-form-urlencoded"
    } else {
        const session = await auth()
        config.headers.Authorization = `Bearer ${session?.backendToken}`
    }

    console.log('config.headers.Authorization', config.headers.Authorization)
    console.log('apiHome', apiHome)
    config.url = apiHome + config.url
    return config
})

export const signin = async (username: string, password: string) => {
    try {
        const res = await axios.post('/token', { username, password })
        return res.data
    } catch (e) {
        console.log(e)
        if (e instanceof AxiosError) {
            if (e.status === 401) {
                return { message: 'ログインしていません' }
            }
        }
    }
}

export const getCurrentUser = async () => {
    try {
        const res = await axios.get('/users/me/')
        console.log(res.data)
        return res.data
    } catch (e) {
        return null
    }
}
export const generalMethod = async () => {
    try {
        const res = await axios.get('/users/general/')
        console.log(res.data)
        return res.data
    } catch (e) {
        if (e instanceof AxiosError) {
            if (e.status === 401) {
                return { message: 'ログインしていません' }
            }
        }
    }
}

export const limitedMethod = async () => {
    try {
        const res = await axios.get('/users/limited/')
        return res.data
    } catch (e) {
        if (e instanceof AxiosError) {
            if (e.status === 401) {
                return { message: 'ログインしていません' }
            }
        }
    }
}

export const superLimitedMethod = async () => {
    try {
        const res = await axios.get('/users/super/')
        return res.data
    } catch (e) {
        if (e instanceof AxiosError) {
            if (e.status === 401) {
                return { message: 'ログインしていません' }
            }
            if (e.status === 403) {
                return { message: '権限が足りてません' }
            }
        }

        throw e
    }
}

export const signOut = async () => {
    await logout()
}
import router from "next/router";
import { deleteCookie, setCookie } from "./cookie";

const cookieName = 'adminKey';

export async function login(key: string): Promise<boolean> {
    const res = await fetch(`/api/validate`, { method: 'POST', body: JSON.stringify({ key: key }) })
    if (res.status === 200) {
        setCookie(cookieName, await res.json(), 1);
        return true;
    }
    return false;
}

export function logout() {
    deleteCookie(cookieName);
    router.push('/');
}
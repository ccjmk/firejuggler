import { useState } from 'react';
import { useRouter } from 'next/router'
import Card from '../components/card'

export default function Login(): JSX.Element {

    const [adminKey, setValue] = useState<string>('');
    const router = useRouter();

    const handleClick = async () => {
        const keyValidation = await validate(adminKey);
        setValue('');
        if (keyValidation.isValid) {
            document.cookie = `adminKey=${keyValidation.keyHash}; path=/`;
            router.push('/index');
        } else {
            alert("Invalid admin password!");
        }
    }

    return (
        <main className="align-middle">
            <p className={'m-4 text-center font-semibold'}>
                FireJuggler administration password
            </p>

            <Card>
                <form className="flex" onSubmit={handleClick}>
                    <input className="text-black flex-grow border rounded  border-gray-400 p-1.5" type="password" value={adminKey} onChange={(e) => setValue(e.target.value)} />
                    <button className="px-10 flex-grow-0 border-2 rounded border-yellow-500 font-semibold p-1.5 ml-4 text-white bg-yellow-500" type="submit">Login</button>
                </form>
            </Card>
        </main>
    )
}

async function validate(key: string) {
    const res = await fetch(`/api/validate`, { method: 'POST', body: JSON.stringify({ key: key }) })
    if (res.status === 200) {
        return { isValid: true, keyHash: await res.json() }
    }
    return { isValid: false }
}
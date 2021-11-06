import { useState } from 'react';
import Card from '../components/card'

export default function Login(): JSX.Element {

    const [adminKey, setValue] = useState<string>('');

    const handleClick = async () => {
        console.log("handling click", adminKey)
        if(await validate(adminKey)) {
            document.cookie = `adminKey=${adminKey}; path=/`;
        } else {
            alert("Invalid key!");
        }
    }

    return (
        <main className="align-middle">
            <p className={'m-4 text-center font-semibold'}>
                FireJuggler administration password
            </p>

            <Card>
                <div className="flex">
                    <input className="text-black flex-grow border rounded  border-gray-400 p-1.5" type="password" value={adminKey} onChange={(e) => setValue(e.target.value)} />
                    <button className="px-10 flex-grow-0 border-2 rounded border-yellow-500 font-semibold p-1.5 ml-4 text-white bg-yellow-500" type="button" onClick={handleClick}>Login</button>
                </div>
            </Card>
        </main>
    )
}

async function validate(key: string) {
    const res = await fetch(`/api/validate`, { method: 'POST', body: JSON.stringify({key: key}) })
    return res.status === 200;
}
import { useState } from 'react';
import Card from '../components/card'

export default function Login(): JSX.Element {

    const [value, setValue] = useState<string>('');
    const [hash, setHash] = useState<string>('');

    const handleClick = () => {
        console.log("handling click", value)

        document.cookie = `adminKey=${value}; path=/`;
        setHash(value);
    }

    return (
        <main className="align-middle">
            <p className={'m-4 text-center font-semibold'}>
                FireJuggler administration password
            </p>

            <Card>
                <div className="flex">
                    <input className="text-black flex-grow border rounded  border-gray-400 p-1.5" type="password" value={value} onChange={(e) => setValue(e.target.value)} />
                    <button className="px-10 flex-grow-0 border-2 rounded border-yellow-500 font-semibold p-1.5 ml-4 text-white bg-yellow-500" type="button" onClick={handleClick}>Login</button>
                </div>
            </Card>
        </main>
    )
}
import '../styles/globals.css'
import Head from "next/head";
import type { AppProps } from 'next/app'
import Logout from '../components/images/logout';
import { logout } from '../common/auth';
import { useRouter } from 'next/router';

function FireJuggler({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isNotLoginPath = !router.pathname.endsWith('/login');
  return <>
    <Head>
      <meta charSet="utf-8" />
      <title>FireJuggler</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    </Head>

    <div className="flex flex-col bg-indigo-900 p-4 text-white h-screen justify-between">

      <div className="flex p-4 m-4 items-center justify-between">
        <h1 className="text-4xl font-bold">
          FireJuggler for Foundry VTT
        </h1>
        {isNotLoginPath && <button onClick={logout}>
          <Logout />
        </button>}
      </div>


      <Component {...pageProps} />

      <footer className="text-center font-semibold align-bottom">
        <p>Made with <a href="https://nextjs.org/">NextJS</a>, <a href="https://tailwindcss.com/">Tailwind</a> & Love - by ccjmk (v{process.env.NEXT_PUBLIC_APP_VERSION})</p>
      </footer>
    </div>
  </>
}
export default FireJuggler

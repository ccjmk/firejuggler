import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Logout from '../components/images/logout';
import { logout } from '../common/auth';
import { useRouter } from 'next/router';
import Head from 'next/head';

function FireJuggler({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isNotLoginPath = !router.pathname.endsWith('/login');
  return <>
    <Head>
      <title>FireJuggler</title>
    </Head>
    <div className="flex flex-col bg-indigo-900 p-4 text-white h-screen justify-between">

      <div className="flex p-4 m-4 items-center justify-between">
        <h1 className="text-4xl font-bold">
          FireJuggler for Foundry VTT
        </h1>
        {isNotLoginPath && <Logout />}
      </div>


      <Component {...pageProps} />

      <footer className="text-center font-semibold align-bottom">
        <p>Made with <a href="https://nextjs.org/">NextJS</a>, <a href="https://tailwindcss.com/">Tailwind</a> & Love - by ccjmk (v{process.env.NEXT_PUBLIC_APP_VERSION})</p>
      </footer>
    </div>
  </>
}
export default FireJuggler

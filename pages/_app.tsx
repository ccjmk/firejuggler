import '../styles/globals.css'
import Head from "next/head";
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta charSet="utf-8" />
      <title>FireJuggler</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    </Head>

    <div className="flex flex-col bg-indigo-900 p-4 text-white h-screen justify-between">

      <h1 className="p-4 m-4 text-4xl font-bold">
        FireJuggler for Foundry VTT
      </h1>

      <Component {...pageProps} />

      <footer className="text-center font-semibold align-bottom">
        Made with <a href="https://nextjs.org/">NextJS</a>, <a href="https://tailwindcss.com/">Tailwind</a> & Love - by ccjmk
      </footer>
    </div>
  </>
}
export default MyApp

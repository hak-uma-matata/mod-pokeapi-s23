import '../styles/styles.css'
import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })
export default function App({ Component, pageProps }) {
    //return <Component {...pageProps} />
    return (
      <>
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </>
    )
}

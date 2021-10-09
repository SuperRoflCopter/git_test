import { useEffect } from 'react'
import '../styles/globals.css'
import { initDB } from './data/database'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    initDB()
  }, [])

  return <Component {...pageProps} />
}

export default MyApp

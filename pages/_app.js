import { useEffect } from 'react'
import '../styles/globals.css'
import { initDB } from './data/database'
import Layout from './components/Layout'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    initDB()
  }, [])

  return <Layout><Component {...pageProps} /></Layout>
}

export default MyApp

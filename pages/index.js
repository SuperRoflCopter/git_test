import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>TASKS</title>
        <meta name="description" content="Task manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href="./createTask"><a>Create new task !</a></Link>
        <Link href="./listTasks"><a>View tasks </a></Link>
      </main>
    </div>
  )
}

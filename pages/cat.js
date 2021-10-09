import { getRandomCat } from './api/cats'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

function Cat({ }) {

    console.log("HTE")

    // Cat.getInitialProps = async (ctx) => {
    //     let catUrl = ""
    //     try {
    //         catUrl = await getRandomCat() 
    //     }
    //     catch (err) {
    //         console.error('fetch fail', err)
    //     }
    //     return { catUrl }
    // }

    const [catUrl, setCatUrl] = useState(undefined)
    useEffect(() => {
        async function setCatUrlAsync() {
            const catUrl = await getRandomCat() 
            setCatUrl(catUrl)
        }
        setCatUrlAsync()

        async function getTasksAsync() {
            const tasks = await fetch('http://localhost:3000/api/tasks')
            .then(response => response.json())
            .then(data => data)
            console.log("tasks cat :", tasks)
        }
        getTasksAsync()
    }, [])

    return (
    <div>
        <Link href="./"><a>Home !</a></Link>
        <img src={catUrl?.file} style={{ width:'100%', height:'100%'}} />
        {/* {catUrl && <Image src={catUrl?.file} alt="cat" />} */}
    </div>
    )
  }
  
  export default Cat
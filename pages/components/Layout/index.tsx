import Link from 'next/link'

export default function Layout({children}) {
    return (
        <>
            <div style={{border:"solid 1px black", display:"flex", justifyContent: "center", alignContent: "center"}}>
                <Link href='./'>
                    <a>TASKS</a>
                </Link>
            </div>
            { children }
        </>
    )
}
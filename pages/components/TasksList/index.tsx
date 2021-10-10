import { ReactElement, useEffect, useState } from 'react'
import { Task } from '../../types'

export default function ListTasks(): ReactElement {

    const [tasks, setTasks] = useState<Task[]>(undefined)
    
    useEffect(() => {
        async function getTasksAsync() {
            const result = await fetch(`http://${window.location.hostname}:${window.location.port}/api/tasks`)
            .then(response => response.json())
            .then(data => data)
            setTasks(result)
        }
        getTasksAsync()
    }, [])

    return (
        <>
        {tasks?.map((task) => 
            <>
                <div>
                    {task.label} - {task.interval} - start on {task.startDate}
                </div>
                <hr />
            </>)}
        </>
    )
}
import React, { useState, useEffect } from 'react'
import { getAllRuns } from '../../api/runs'

const IndexRuns = (props) => {
    const [runs, setRuns] = useState(null)

    useEffect(() => {
        getAllRuns()
            .then(res => {
                setRuns(res.data.runs)
            })
            .catch(console.error)
    }, [])

    if (!runs) {
        return <p>loading...</p>
    } else if (runs.length === 0) {
        return <p>no runs yet, go log some</p>
    }

    let runsJsx

    if (runs.length > 0) {
        runsJsx = runs.map(run => (
            <li key={run.id}>
                {run.description}
            </li>
        ))
    }

    return (
        <>
            <h3>All of the runs</h3>
            <ul>
                {runsJsx}
            </ul>
        </>
    )
}

export default IndexRuns
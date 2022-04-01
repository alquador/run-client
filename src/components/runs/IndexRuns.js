import React, { useState, useEffect } from 'react'
import { getAllRuns } from '../../api/runs'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {indexRunsSuccess, indexRunsFailure} from '../shared/AutoDismissAlert/messages'

// I'm going to declare a style object
// this will be used to corral my cards
// we can use basic CSS, but we have to use JS syntax
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexRuns = (props) => {
    const [runs, setRuns] = useState(null)

    const {user, msgAlert} = props

    useEffect(() => {
        getAllRuns()
            .then(res => {
                setRuns(res.data.runs)
            })
            .then(() => {
                msgAlert({
                    heading: 'Index page of runs!',
                    message: indexRunsSuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'No runs logged?!!',
                    message: indexRunsFailure,
                    variant: 'danger',
                })
            })
    }, [])

    if (!runs) {
        return <p>loading...</p>
    } else if (runs.length === 0) {
        return <p>no runs yet, go add some</p>
    }

    let runCards

    if (runs.length > 0) {
        // petsJsx = pets.map(pet => (
        //     <li key={pet.id}>
        //         {pet.fullTitle}
        //     </li>
        // ))
        runCards = runs.map(run => (
            // one method of styling, usually reserved for a single style
            // we can use inline, just like in html
            <Card key={run.id} style={{ width: '30%' }} className="m-2">
                <Card.Header>Miles ran: {run.mileage}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link to={`/runs/${run.id}`}>View {run.description}</Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    }

    return (
        <>
            <h3>All of the Logged Runs</h3>
            <div style={cardContainerLayout}>
                {runCards}
            </div>
        </>
    )
}

export default IndexRuns
import React, {useState, useEffect} from 'react'
import { getOneRun, updateRun, removeRun } from '../../api/runs'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button } from 'react-bootstrap'
import {showRunSuccess, showRunFailure} from '../shared/AutoDismissAlert/messages'
import EditRunModal from './EditRunModal'
//import ShowToy from '../toys/ShowToy'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowRun = (props) => {

    const [run, setRun] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const {user, msgAlert} = props
    const { id } = useParams()
    console.log('this is the req.params.id', useParams())
    const navigate = useNavigate()
    console.log('id in showRun', id)
    // empty dependency array in useEffect to act like component did mount
    useEffect(() => {
        getOneRun(id)
            .then(res => setRun(res.data.run))
            .then(() => {
                msgAlert({
                    heading: 'Here is the run!',
                    message: showRunSuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'No run found',
                    message: showRunFailure,
                    variant: 'danger',
                })
            })
    }, [updated])

    const removeTheRun = () => {
        removeRun(user, run.id)
            .then(() => {
                msgAlert({
                    heading: 'run politely removed!',
                    message: 'theyre gone',
                    variant: 'success',
                })
            })
            .then(() => {navigate(`/`)})
            .catch(() => {
                msgAlert({
                    heading: 'something went wrong',
                    message: 'that aint it',
                    variant: 'danger',
                })
            })
    }
    //for subdocument later
    // let toyCards
    // if (pet) {
    //     if (pet.toys.length > 0) {
    //         toyCards = pet.toys.map(toy => (
    //             <ShowToy key={toy.id} toy={toy}/>
    //         ))
    //     }
    // }

    if (!run) {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="warning" >
                    <span className="visually-hidden">Loading....</span>
                </Spinner>
            </Container>
        )
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{run.date}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>description: {run.description}</small><br/>
                            <small>mileage: {run.mileage}</small><br/>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                            Edit Run
                        </Button>
                        <Button onClick={() => removeTheRun()}className="m-2" variant="danger">
                            Delete Run
                        </Button>

                    </Card.Footer>
                </Card>
            </Container>
            {/* <Container style={cardContainerLayout}>
                {toyCards}
            </Container> */}
            <EditRunModal 
                run={run}
                show={modalOpen}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                updateRun={updateRun}
                handleClose={() => setModalOpen(false)}
            />
        </>
    )
}

export default ShowRun
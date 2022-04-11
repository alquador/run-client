import React, {useState, useEffect} from 'react'
import { getOneRun, updateRun, removeRun } from '../../api/runs'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button } from 'react-bootstrap'
import {showRunSuccess, showRunFailure} from '../shared/AutoDismissAlert/messages'
import EditRunModal from './EditRunModal'

//import GiveToyModal from '../toys/GiveToyModal'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowRun = (props) => {

    const [run, setRun] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    //const [runModalOpen, setRunModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const {user, msgAlert} = props
    const { id } = useParams()
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
    }, [updated, id])

    const removeTheRun = () => {
        removeRun(user, run._id)
            .then(() => {
                msgAlert({
                    heading: 'run politely removed!',
                    message: 'theyre gone',
                    variant: 'success',
                })
            })
            .then(() => {navigate(`/runs`)})
            .catch(() => {
                msgAlert({
                    heading: 'something went wrong',
                    message: 'that aint it',
                    variant: 'danger',
                })
            })
    }

    
    // let toyCards
    
    // if (run) {
    //     if (pet.toys.length > 0) {
    //         toyCards = pet.toys.map(toy => (
    //             // need to pass all props needed for updateToy func in edit modal
    //             <ShowToy 
    //                 key={toy._id} toy={toy} pet={pet} 
    //                 user={user} msgAlert={msgAlert}
    //                 triggerRefresh={() => setUpdated(prev => !prev)}
    //             />
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

    if (run) {
    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{run.description}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Mileage: {run.mileage}</small><br/>
                            <small>Date: {run.date}</small><br/>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {/* <Button onClick={() => setToyModalOpen(true)} className="m-2" variant="info">
                            Give Pet a Toy?
                        </Button> */}
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
            {/* <GiveToyModal
                pet={pet}
                show={toyModalOpen}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setToyModalOpen(false)}
            /> */}
        </>
    )
    }
}

export default ShowRun
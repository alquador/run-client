import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import RunForm from '../shared/RunForm'

const EditRunModal = (props) => {
    const { user, show, handleClose, updateRun, triggerRefresh } = props
    const [run, setRun] = useState(props.run)

    const handleChange = (e) => {
        // e === event
        e.persist()
        //sets run to the updated value of the input fields
        setRun(prevRun => {
            const name = e.target.name
            let value = e.target.value
            // console.log('etarget type', e.target.type)
            // console.log('this is e.target checked', e.target.checked)
            if (e.target.type === 'number') {
                value = parseFloat(e.target.value)
            }

            const updatedValue = { [name]: value }

            // console.log('prevRun', prevRun)
             console.log('updatedRun', updatedValue)

            return {...prevRun, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        // console.log('the run to submit', run)
        //api call to update a run
        updateRun(user, run)
            // if create is successful, we should navigate to the show page
            .then(() => handleClose())
            .then(() => triggerRefresh())
            .catch(console.error)
        // console.log('this is the run', run)
    }

    return (
        //this is the pop up that displays the run form for editing
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <RunForm 
                    run={run}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit run!"
                />
            </Modal.Body>
        </Modal>
    )
}
    
export default EditRunModal
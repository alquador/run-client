import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { createRun } from '../../api/runs'
import {createRunSuccess, createRunFailure} from '../shared/AutoDismissAlert/messages'
import { useNavigate } from 'react-router-dom'
import RunForm from '../shared/RunForm'


const CreateRun = (props) => {
    const {user, msgAlert} = props
    console.log('user in create', user)
    const navigate = useNavigate()
    // we'll need two states
    const [run, setRun] = useState({description: '', mileage: '', date: ''})
    console.log('run in create', run)
   
    // we'll need handleChange and handleSubmit funcs
    const handleChange = (e) => {
        // e === event
        e.persist()

        setRun(prevRun => {
            const name = e.target.name
            let value = e.target.value
            console.log('etarget type', e.target.type)
            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
            }

            const updatedValue = { [name]: value }

            console.log('prevRun', prevRun)
            console.log('updatedValue', updatedValue)

            return {...prevRun, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        createRun(user, run)
            // if create is successful, we should navigate to the show page
            .then(res => {navigate(`/runs/${res.data.run.id}`)})
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Run Added! Success!',
                    message: createRunSuccess,
                    variant: 'success',
                }))
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: createRunFailure,
                    variant: 'danger',
                }))
        // console.log('this is the run', run)
    }

    return (
        <RunForm 
            run={run}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Add new run!"
        />
    )
}

export default CreateRun
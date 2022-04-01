import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const RunForm = (props) => {
    const {run, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    placeholder="what type of run did you log?"
                    value={run.description}
                    name='description'
                    onChange={handleChange}
                />
                <Form.Label>Mileage</Form.Label>
                <Form.Control 
                    placeholder="how many miles did you run today?"
                    value={run.mileage}
                    name='mileage'
                    onChange={handleChange}
                />
                <Form.Label>Date</Form.Label>
                <Form.Control 
                    placeholder="date of your run (YYYY-MM-DD)?"
                    value={run.date}
                    name='date'
                    onChange={handleChange}
                />
                {/* <Form.Check 
                    label='is this pet adoptable?'
                    name='adoptable'
                    defaultChecked={pet.adoptable}
                    onChange={handleChange}
                /> */}
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default RunForm
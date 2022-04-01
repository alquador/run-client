import apiUrl from '../apiConfig'
import axios from 'axios'

// index function
export const getAllRuns = () => {
    return axios(`${apiUrl}/runs`)
}
// show function
export const getOneRun = (runId) => {
    return axios(`${apiUrl}/runs/${runId}`)
}
// POST -> create function
export const createRun = (user, newRun) => {
    console.log('user', user)
    console.log('this is newRun', newRun)
    return axios({
        url: `${apiUrl}/runs`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { run: newRun }
    })
}

// PATCH -> update function
export const updateRun = (user, updatedRun) => {
    console.log('user', user)
    console.log('this is newRun', updatedRun)
    return axios({
        url: `${apiUrl}/runs/${updatedRun.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { run: updatedRun }
    })
}

// DELETE -> remove function
export const removeRun = (user, runId) => {
    console.log('user', user)
    return axios({
        url: `${apiUrl}/runs/${runId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}
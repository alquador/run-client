import apiUrl from '../apiConfig'
import axios from 'axios'

// index function
export const getAllRuns = () => {
    return axios(`${apiUrl}/runs`)
}
import axios from "./axios";
import useSWR from 'swr'
export const getCallLogs = () => {
    const { data: callLogs, error } = useSWR('/api/call/logs', () =>
        axios
            .post('/api/call/logs', {searchTerm: '', queryTime: ''})
            .then(res => res.data)
            .catch(error => {
            }),
    )
    return callLogs
}

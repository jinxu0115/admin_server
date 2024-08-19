import axios from "./axios";
import useSWR from 'swr'

export const useCallLogs = () => {
    const { data: callLogs, error } = useSWR('/api/call/logs', () =>
        axios
            .post('/api/call/logs', { searchTerm: '', queryTime: '' })
            .then(res => res.data)
            .catch(error => {
                console.error('Failed to fetch call logs:', error);
            }),
    );

    return { callLogs, error };
}
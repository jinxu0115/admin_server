import axios from "./axios";
import useSWR from 'swr'
export const getPairs = () => {
    const { data: pairs, error } = useSWR('/api/setting/list', () =>
        axios
            .get('/api/setting/list')
            .then(res => res.data)
            .catch(error => {
            }),
    )
    return pairs
}

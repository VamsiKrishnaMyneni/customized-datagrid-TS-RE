import { useState, useEffect } from 'react';
import axios from 'axios';

const useProductsFetch = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/productss');
            setData(response.data);
        } catch (err: any) {
            setError("oops! Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error, fetchData };
};

export default useProductsFetch;
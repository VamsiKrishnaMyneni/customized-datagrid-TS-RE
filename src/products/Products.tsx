import React from 'react'
import useProductsFetch from './useProductsFetch';
import './products.css';

function Products() {
    const { data, loading, error } = useProductsFetch();

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <><h2>{error}</h2>
                <button className='btn-refresh' onClick={() => window.location.reload()}>Try again</button></>}
            {!loading && !error && data.length === 0 && <p>No products found.</p>}
            {data && data.length > 0 && (
                <h2>Products</h2>

            )}
        </>
    )
}

export default Products;

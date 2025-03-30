import useProductsFetch from './useProductsFetch';
import './products.css';

function Products() {
    const { data, loading, error } = useProductsFetch();

    const onProductChange = (id: number) => {
        console.log(`Product with ID ${id} selected`);
    }

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <><h2>{error}</h2>
                <button className='btn-refresh' onClick={() => window.location.reload()}>Try again</button></>}
            {!loading && !error && data.length === 0 && <p>No products found.</p>}

            {data && data.length > 0 && (
                <div className='products-container'>
                    <h2>Products</h2>
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Rating</th>
                                <th>Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((product) => (
                                <tr key={product.id}>
                                    <td><input type="checkbox" onChange={() => onProductChange(product.id)} /></td>
                                    <td>
                                        <div className="product-title-container">
                                            <img src={product.image} alt={product.title} className="product-image" />
                                            <span className="product-title" title={product.title}>{product.title}</span>
                                        </div>
                                    </td>
                                    <td>{product.price}</td>
                                    <td><div className="star-rating" style={{ "--rating": `${product.rating.rate}` } as React.CSSProperties} aria-label="Rating of this product is 2.3 out of 5."></div></td>
                                    <td>{product.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default Products;

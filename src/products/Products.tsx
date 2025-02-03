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
                    <h2>Products Comparison</h2>
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Rating</th>
                                <th>Description</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((product) => (
                                <tr key={product.id}>
                                    <td><input type="checkbox" className='product-select' onChange={() => onProductChange(product.id)} /></td>
                                    <td>  <img src={product.image} alt={product.title} className="product-image" /></td>
                                    <td>
                                        <div className="product-title" title={product.title}>{product.title}</div>
                                    </td>
                                    <td>{product.price}</td>

                                    <td><div className="star-rating" style={{ "--rating": `${product.rating.rate}` } as React.CSSProperties} aria-label="Rating of this product is 2.3 out of 5."></div>
                                        <div className='ratings-count'>{product.rating.count} ratings</div>  </td>
                                    <td> <div className="product-description" title={product.description}>
                                        {product.description.length > 100 ? `${product.description.slice(0, 100)}...` : product.description} </div>
                                    </td>
                                    <td>{product.category}</td>
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

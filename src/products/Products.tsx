import useProductsFetch from './useProductsFetch';
import './products.css'
import Datagrid from '../datagrid';

function Products() {
    const { data, loading, error } = useProductsFetch();

    const onProductChange = (id: number) => {
        console.log(`Product with ID ${id} selected`);
    }


    // Usage example
    const columns = [
        {
            label: "", key: "", width: 30, render: (rowData: any) => {
                return <input type="checkbox" className='product-select' onChange={() => onProductChange(rowData)} />
            }
        },
        { label: "Image", key: "image", width: 70 },
        { label: "Title", key: "title", width: 100 },
        { label: "Price", key: "price", width: 40 },
        { label: "Rating", key: "rating.rate", width: 70 },
        { label: "Description", key: "description", width: 200 },
        { label: "Category", key: "category", width: 100 }
    ];


    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <><h2>{error}</h2>
                <button className='btn-refresh' onClick={() => window.location.reload()}>Try again</button></>}
            {!loading && !error && data.length === 0 && <p>No products found.</p>}

            {data && data.length > 0 && (
                <div className='products-container'>
                    <h2>Products Comparison</h2>
                    {/* <div className='products-table-container'>
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
                                        <td className='prodcut-select-cell'><input type="checkbox" className='product-select' onChange={() => onProductChange(product.id)} /></td>
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
                    </div> */}
                    <Datagrid data={data} columns={columns} />
                </div>
            )}
        </>
    )
}
export default Products;

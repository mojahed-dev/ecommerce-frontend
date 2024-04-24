import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext'
import ProductsUserView from '../components/ProductsUserView';
import ProductsAdminView from '../components/admin/ProductsAdminView';

function Products() {
    const { user } = useContext(UserContext);
    const [productsData, setProductsData] = useState([]); // Initialize as an empty array

    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/products/all`)
            .then(res => res.json())
            .then(data => {
                // console.log("data", data.products);
                setProductsData(data.products); // Update the state with the retrieved data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {user.isAdmin === true ?
                <ProductsAdminView productsData={productsData} fetchData={fetchData} />
                :
                <ProductsUserView productsData={productsData} />
            }
        </>
    );
}

export default Products;

import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';


function ArchiveProduct({ product, isActive, fetchData }) {

    const archiveToggle = (product) => {

        fetch(`${process.env.REACT_APP_API_URL}/products/${product}/archive`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data === true) {
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        text: 'Product successfully disabled'
                    });

                    fetchData();
                } else {
                    Swal.fire({
                        title: 'Something went wrong!',
                        icon: 'error',
                        text: 'Please try again'
                    });
                    fetchData();
                }
            });
    };

    const activateToggle = (product) => {
        console.log("isActive ba: ", isActive)
        fetch(`${process.env.REACT_APP_API_URL}/products/${product}/activate`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data === true) {
                    console.log("data here:", data)
                    Swal.fire({
                        title: 'Success!',
                        icon: 'success',
                        text: 'Product successfully enabled'
                    });

                    fetchData();
                } else {
                    console.log("data here:", data)
                    Swal.fire({
                        title: 'Error!',
                        icon: 'error',
                        text: 'Please try again'
                    });
                    fetchData();
                }
            });
    };

    return (
        <>
            {isActive ?
                <Button variant="danger" size="sm" onClick={() => archiveToggle(product)}>
                    Archive
                </Button>
                :
                <Button variant="success" size="sm" onClick={() => activateToggle(product)}>
                    Activate
                </Button>
            }

        </>
    )
}

export default ArchiveProduct
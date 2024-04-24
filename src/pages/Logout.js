import { Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Logout() {

	// clear our local storage
	// localStorage.clear()
	const { unsetUser, setUser } = useContext(UserContext);

	// Clear the local storage using the unsetUser() function from the global state
	unsetUser();

	// Bt  ading the useEfect, this will allow the Logout page torender first before triggeting the useEffect which changes the value of the "user" state.
	useEffect(() => {
		// Set the user state back to it's origninal value
		setUser({
			id: null,
			isAdmin: null
		});

        Swal.fire({
            title: "Logged out",
            icon: "success"
        });

	}, []);

	// Redirect back to login
	return (
		<Navigate to="/" />
	);
}
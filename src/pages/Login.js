import React from 'react';
import '../App.css';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoginImage from '../images/login-image.jpg'


import UserContext from '../UserContext';

function Login() {

	// Allows us to consume the User context object and it's properties to use for  user validation
	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isActive, setIsActive] = useState(false);

	const navigate = useNavigate();


	function authenticate(e) {
		e.preventDefault();
		fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
			.then((res) => {
				if (res.status === 200) {
					// Successful login
					return res.json();
				} else if (res.status === 401) {
					// Invalid credentials
					throw new Error("Invalid credentials");
				} else {
					// Other errors
					throw new Error("An error occurred during login.");
				}
			})
			.then((data) => {
				// Handle successful login here
				localStorage.setItem('token', data.access);
				retrieveUserDetails(data.access);
				console.log("is user admin? ", data.isAdmin)

				Swal.fire({
					title: "Login Successful",
					icon: "success",
					text: "Welcome to my e-Shopping Store!"
				})
				.then(() => {
					
					// if (user.isAdmin === true) {
					// 	navigate("/dashboard"); // Redirect to admin dashboard
					// } else {
					// 	navigate("/");
					// }
				});
			})
			.catch((error) => {
				// Handle error responses
				console.error(error.message); // Log the error message
				Swal.fire({
					title: "Login Failed",
					icon: "error",
					text: error.message, // Display the error message to the user
				});
			});

		setEmail("");
		setPassword("");
	}




	const retrieveUserDetails = (token) => {
		fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => res.json())
			.then(data => {
				// Changes the global "user" state to store the "id" and the "isAdmin" properties of the user which will be used for validation across the whiole application
				setUser({
					id: data._id,
					isAdmin: data.isAdmin
				});

				if (data.isAdmin === true) {
					navigate("/products"); // Redirect to admin dashboard
				} else {
					navigate("/");
				}

			})
	}

	useEffect(() => {
		if (email !== "" && password !== "") {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email, password]);

	return (
		<>
		<div className="container" style={{ height: '100vh' }}>
			<div className="row justify-content-center align-items-center" style={{ height: '70%' }}>
				<h3 className='text-center text-lg pt-3'>Brio - Where Fashion Meets Quality.</h3>
				<div className="col-md-8">
					<div className="card" id='login-card'>
						<div className="card-body login-card">
							<div className="row">
								<img src={LoginImage} alt="Login" className="col-md-5 cover-image img-fluid" />
								<div className="col-md-7 col-login">
									<h4 className="card-title">Login</h4>
									<form onSubmit={(e) => authenticate(e)}>
										<div className="mb-3">
											<label htmlFor="email" className="form-label">Email address</label>
											<input
												type="email"
												className="form-control"
												id="email"
												placeholder="name@example.com"
												value={email}
												onChange={e => setEmail(e.target.value)}
											/>
										</div>
										<div className="mb-3">
											<label htmlFor="password" className="form-label">Password</label>
											<input
												type="password"
												className="form-control"
												id="password"
												placeholder="password"
												required
												value={password}
												onChange={e => setPassword(e.target.value)}
											/>
										</div>
										{isActive ? (
											<button type="submit" className="btn btn-primary btn-block">Login</button>
										) : (
											<button type="submit" className="btn btn-primary btn-block" disabled>Login</button>
										)}
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</>
	)
}

export default Login;
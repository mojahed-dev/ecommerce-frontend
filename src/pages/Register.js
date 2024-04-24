import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Register() {

    const { user } = useContext(UserContext);

    // State hooks to store the values of the input fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(true);


    // Handler function for registering our user
    function registerUser(e) {
        // Prevents page reload everytime we submit in the form
        e.preventDefault();
        // 'fetch()' to access api
        fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data) {
                    // To reset the form field after registration
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setMobileNo("");
                    setPassword("");
                    setConfirmPassword("");

                    Swal.fire({
                        title: "Registration Successful",
                        icon: "success",
                        text: "You have successfully created an account"
                    });
                } else {
                    Swal.fire({
                        title: "Registration failed",
                        icon: "error",
                        text: "Please try again"
                    })
                }
            })

    }


    // useEffect is used to create side effects or execute  a codeblock everytime the component renders or if there are changes inthe state that is listed in the dependency array
    useEffect(() => {
        // Check if the fields are filled properly, checks if the password matches the confirm password, and checks if the lenght of mobileNo is 11.
        if (
            (firstName !== "" &&
                lastName !== "" &&
                email !== "" &&
                mobileNo !== "" &&
                password !== "" &&
                confirmPassword !== "") &&
            (password === confirmPassword) &&
            (mobileNo.length === 11)
        ) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
        // Dependency Array
    }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

    return (
        <>
            <div className="row justify-content-center align-items-center">
                <div className="col col-md-6 ">
                   
                    <Form onSubmit={(e) => registerUser(e)} id='register-form'>
                    <h3 className='py-3 text-center'>Create Account</h3>
                        <Form.Group>
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter First Name"
                                required
                                value={firstName}
                                onChange={e => { setFirstName(e.target.value) }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Last Name"
                                required
                                value={lastName}
                                onChange={e => { setLastName(e.target.value) }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                required
                                value={email}
                                onChange={e => { setEmail(e.target.value) }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mobile No:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter 11 Digit No."
                                required
                                value={mobileNo}
                                onChange={e => { setMobileNo(e.target.value) }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password."
                                required
                                value={password}
                                onChange={e => { setPassword(e.target.value) }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password."
                                required
                                value={confirmPassword}
                                onChange={e => { setConfirmPassword(e.target.value) }}
                            />
                        </Form.Group>

                        {/* conditionally render submit button based on isActive state */}

                        {isActive ?
                            <Button variant="primary" type="submit" className="mt-3">Submit</Button>
                            :
                            <Button variant="secondary" type="submit" className="mt-3">Submit</Button>

                        }
                    </Form>
                </div>
            </div>

        </>
    )
}

export default Register;
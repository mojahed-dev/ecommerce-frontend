import React, { useState, useEffect, useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import UserContext from '../../UserContext';

function MyAccount() {
  const [initialValues, setInitialValues] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem('token');
  const { user } = useContext(UserContext);

  // Simulate fetching initial values from the database
  useEffect(() => {
    const fetchInitialValues = async () => {
      // Make an API call to fetch initial values
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setInitialValues(data);
    };

    fetchInitialValues();
  }, []);

  return (
    <>
      <div>
        <h5 className='mt-3'>My Profile Account</h5>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={(values, { setSubmitting }) => {
            // Set submitting to true to indicate that the form submission is in progress
            setSubmitting(true);

            // Send a PUT request to update the user's profile
            fetch(`${process.env.REACT_APP_API_URL}/users/${user.id}/updateProfile`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Include the user's token
              },
              body: JSON.stringify(values), // Send the updated profile data
            })
              .then((response) => {
                if (response.status === 200) {
                  // Profile update was successful
                  console.log('Profile updated successfully');

                  // Update the initialValues with the updated values
                  setInitialValues(values);

                  // Toggle back to read-only mode
                  setIsEditing(false);
                } else {
                  // Handle error responses here (e.g., validation errors, server errors)
                  console.error('Profile update failed');
                }
              })
              .catch((error) => {
                // Handle network errors or other issues
                console.error('An error occurred:', error);
              })
              .finally(() => {
                // Set submitting to false to indicate that the form submission is complete
                setSubmitting(false);
              });
          }}
        >
          {() => (
            <Form>
              <div className="row mb-2">
                <label htmlFor="firstName" className="col-sm-4 col-form-label">First name:</label>
                <div className="col-sm-4">
                  {isEditing ? (
                    <Field type="text" name="firstName" id="firstName" className="form-control" />
                  ) : (
                    <div>{initialValues.firstName}</div>
                  )}
                </div>
              </div>
              <div className="row mb-2">
                <label htmlFor="lastName" className="col-sm-4 col-form-label">Last name:</label>
                <div className="col-sm-4">
                  {isEditing ? (
                    <Field type="text" name="lastName" id="lastName" className="form-control" />
                  ) : (
                    <div>{initialValues.lastName}</div>
                  )}
                </div>
              </div>
              <div className="row mb-2">
                <label htmlFor="email" className="col-sm-4 col-form-label">Email:</label>
                <div className="col-sm-4">
                  {isEditing ? (
                    <Field type="email" name="email" id="email" className="form-control" />
                  ) : (
                    <div>{initialValues.email}</div>
                  )}
                </div>
              </div>
              <div className="row mb-2">
                <label htmlFor="mobileNo" className="col-sm-4 col-form-label">Mobile No.:</label>
                <div className="col-sm-4">
                  {isEditing ? (
                    <Field type="number" name="mobileNo" id="mobileNo" className="form-control" />
                  ) : (
                    <div>{initialValues.mobileNo}</div>
                  )}
                </div>
              </div>
              <h5>Shipping Address</h5>
              <div className="row mb-2">
                <label htmlFor="street" className="col-sm-4 col-form-label">Street:</label>
                <div className="col-sm-4">
                  {isEditing ? (
                    <Field type="text" name="street" id="street" className="form-control" />
                  ) : (
                    <div>{initialValues.street}</div>
                  )}
                </div>
              </div>
              <div className="row mb-2">
                <label htmlFor="country" className="col-sm-4 col-form-label">Country:</label>
                <div className="col-sm-4">
                  {isEditing ? (
                    <Field type="text" name="country" id="country" className="form-control" />
                  ) : (
                    <div>{initialValues.country}</div>
                  )}
                </div>
              </div>
              <div className="row mb-2">
                <label htmlFor="province" className="col-sm-4 col-form-label">Province:</label>
                <div className="col-sm-4">
                  {isEditing ? (
                    <Field type="text" name="province" id="province" className="form-control" />
                  ) : (
                    <div>{initialValues.province}</div>
                  )}
                </div>
              </div>
              <div className="row mb-2">
                <label htmlFor="city" className="col-sm-4 col-form-label">City:</label>
                <div className="col-sm-4">
                  {isEditing ? (
                    <Field type="text" name="city" id="city" className="form-control" />
                  ) : (
                    <div>{initialValues.city}</div>
                  )}
                </div>
              </div>
              <div className="row mb-2">
                <label htmlFor="postalcode" className="col-sm-4 col-form-label">Postal Code:</label>
                <div className="col-sm-4">
                  {isEditing ? (
                    <Field type="text" name="postalcode" id="postalcode" className="form-control" />
                  ) : (
                    <div>{initialValues.postalcode}</div>
                  )}
                </div>
              </div>

              {isEditing && (
                <button type="submit" className="btn btn-sm btn-primary me-3">Save</button>
              )}
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="btn btn-sm btn-secondary">Edit</button>
              )}
              {isEditing && (
                <button onClick={() => setIsEditing(false)} className="btn btn-sm btn-danger">Cancel</button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default MyAccount;

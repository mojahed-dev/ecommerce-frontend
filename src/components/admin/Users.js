import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Function to fetch user data
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error('Failed to fetch users');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUsers();
    }, []); // The empty dependency array ensures this effect runs once after the initial render.

    function formatTimestamp(timestamp) {
        return moment(timestamp).format("MMM D, YYYY h:mm A");
    }

    // const toggleAdminStatus = async (userId) => {
    //     // Send an API request to update the user's admin status
    //     try {
    //         const token = localStorage.getItem('token');
    //       const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
    //         method: 'PUT',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           Authorization: `Bearer ${token}`,
    //         },
    //         body: JSON.stringify({
    //           userId
    //         }),
    //       });
      
    //       if (response.status === 200) {
    //         // Update the local state or refetch the users
    //         // This example assumes that you refetch the user data
    //       } else {
    //         console.error('Failed to update admin status');
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

    const toggleAdminStatus = async (userId) => {
        const token = localStorage.getItem('token');
      
        Swal.fire({
          title: 'Set as Admin',
          text: 'Are you sure you want to set this user as an admin?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  userId,
                }),
              });
      
              if (response.status === 200) {
                // Update the local state or refetch the users
                // This example assumes that you refetch the user data
                setUsers((prevUsers) => {
                  return prevUsers.map((user) => {
                    if (user._id === userId) {
                      return { ...user, isAdmin: true };
                    }
                    return user;
                  });
                });
              } else {
                console.error('Failed to update admin status');
              }
            } catch (error) {
              console.error(error);
            }
          }
        });
      };
      
      
      



    return (
        <div className='container-fluid'>
            <h2 className='mt-5'>Registered Users</h2>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Fullname</th>
                            <th scope="col">Email Address</th>
                            <th scope="col">Mobile No.</th>
                            <th scope="col">Address</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Updated At</th>
                            <th scope="col">isAdmin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.mobileNo}</td>
                                <td>{user.street}, {user.city}, {user.province}, {user.country}, {user.postalcode}</td>
                                <td>{formatTimestamp(user.createdAt)}</td>
                                <td>{formatTimestamp(user.updatedAt)}</td>
                                <td>
                                    {user.isAdmin ? 'Yes' : 'No'}
                                    {!user.isAdmin && (
                                        <button onClick={() => toggleAdminStatus(user._id)} className='btn btn-link btn-sm'>
                                            <small>Set as admin</small>
                                        </button>
                                    )}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;

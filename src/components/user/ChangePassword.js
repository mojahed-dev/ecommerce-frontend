import React, { useState, useContext } from 'react';
import UserContext from '../../UserContext';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { user } = useContext(UserContext);

  console.log("user id from change password: ", user.id)

  const handleChangePassword = async () => {
    // Add validation to ensure newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    // Send a request to change the password
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          userId: user.id
        }),
      });

      if (response.status === 200) {
        alert('Password changed successfully');
      } else if (response.status === 401) {
        alert('Old password is incorrect');
      } else {
        alert('Failed to change password');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while changing the password');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Change Password</h2>
      <div className="mb-3">
        <label className="form-label">Old Password:</label>
        <input
          type="password"
          className="form-control"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">New Password:</label>
        <input
          type="password"
          className="form-control"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Confirm Password:</label>
        <input
          type="password"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleChangePassword}>
        Change Password
      </button>
    </div>
  );
}

export default ChangePassword;

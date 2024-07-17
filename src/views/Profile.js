import React, { useState } from 'react';
import '../styles/Profile.css';
import DefaultProfilePic from "../assets/images/icons8-glyph-48.png";

const ProfilePage = ({ user, onLogout, orderHistory }) => {
  const [profilePic, setProfilePic] = useState(DefaultProfilePic);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <label htmlFor="profile-pic-input">
          <img src={profilePic} alt="Profile" className="profile-image" />
        </label>
        <input
          type="file"
          id="profile-pic-input"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleProfilePicChange}
        />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
        </div>
      </div>
      <div className="profile-content">
        <h3>Order History</h3>
        {orderHistory.length > 0 ? (
          <table className="order-history">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.status}</td>
                  <td>${order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No order history available.</p>
        )}
      </div>
      <button className="logout-button" onClick={onLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;

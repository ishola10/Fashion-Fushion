import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, storage } from '../firebase'; 
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [activeSection, setActiveSection] = useState('details');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
      if (newUser) {
        setNewName(newUser.displayName || '');
        setDob(newUser.dob || '');
        setAddress(newUser.address || '');
        setPhone(newUser.phone || '');
      }
    });

    return () => unsubscribe();
  }, []);

  const uploadProfilePicture = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const storagePath = `profile_pictures/${user.uid}`;
        const storageRefPath = storageRef(storage, storagePath);
        await uploadBytes(storageRefPath, file);
        const downloadURL = await getDownloadURL(storageRefPath);
        await updateProfile(user, { photoURL: downloadURL });
        setUser((prev) => ({ ...prev, photoURL: downloadURL }));
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  const saveProfile = async () => {
    if (user) {
      try {
        await updateProfile(user, {
          displayName: newName,
          dob,
          address,
          phone,
        });
        setEditing(false);
      } catch (error) {
        console.error('Error saving profile:', error);
      }
    }
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  const startEdit = () => {
    setNewName(user.displayName || '');
    setDob(user.dob || '');
    setAddress(user.address || '');
    setPhone(user.phone || '');
    setEditing(true);
  };

  const signout = async () => {
    try {
      await auth.signOut();
      navigate.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return (
      <div className="profile">
        <p>User not logged in</p>
        <Link to="/login">Login</Link>
      </div>
    );
  }

  return (
    <div className="profile">
      <h2>Profile</h2>
      <div className="container">
        <div className="sidebar">
          <button
            className={`nav-button ${activeSection === 'details' ? 'active' : ''}`}
            onClick={() => setActiveSection('details')}
          >
            User Details
          </button>
          <button
            className={`signout-btn`}
            onClick={signout}
          >
            Sign out
          </button>
        </div>

        <div className="main-content">
          {activeSection === 'details' && (
            <div className="user-info">
              <div className="profile-picture">
                <img
                  src={user.photoURL || '../assets/default-profile-picture.png'}
                  alt={user.displayName}
                />
                <input
                  className="file-input"
                  type="file"
                  accept="image/*"
                  onChange={uploadProfilePicture}
                />
              </div>
              <div className="user-details">
                {editing ? (
                  <>
                    <label htmlFor="newName">New Name:</label>
                    <input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      type="text"
                      required
                    />
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      type="date"
                      required
                    />
                    <label htmlFor="address">Address:</label>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      required
                    />
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="tel"
                      required
                    />
                    <button onClick={saveProfile}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <p><strong>Name:</strong> {user.displayName}</p>
                    <p><strong>Date of Birth:</strong> {dob}</p>
                    <p><strong>Address:</strong> {address}</p>
                    <p><strong>Phone Number:</strong> {phone}</p>
                    <button className="edit-button" onClick={startEdit}>Edit Profile</button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

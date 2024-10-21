import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, storage } from "../firebase";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import ProfileIcon from "../assets/images/icons8-avatar-96.png";
import Loader from "../components/Loader";

const Profile = ({ user, setUser }) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [activeSection, setActiveSection] = useState("details");
  const [loading, setLoading] = useState(false); // State for the loader
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setNewName(user.displayName || "");
      setDob(user.dob || "");
      setAddress(user.address || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const uploadProfilePicture = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      try {
        const storagePath = `profile_pictures/${user.uid}`;
        const storageRefPath = storageRef(storage, storagePath);
        await uploadBytes(storageRefPath, file);
        const downloadURL = await getDownloadURL(storageRefPath);
        await updateProfile(user, { photoURL: downloadURL });
        setUser((prev) => ({ ...prev, photoURL: downloadURL }));
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      } finally {
        setLoading(false);
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
        console.error("Error saving profile:", error);
      }
    }
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  const startEdit = () => {
    setEditing(true);
  };

  const signout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) {
    return (
      <div
        style={{ marginTop: "15%", alignItems: "center", textAlign: "center" }}
        className="profile"
      >
        <img
          src={ProfileIcon}
          alt="Profile Icon"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
        <p style={{ fontSize: "2rem", marginBottom: "2%" }}>
          User not logged in
        </p>
        <Link
          style={{
            padding: "10px 20px",
            border: "2px solid",
            borderRadius: "5px",
            textDecoration: "none",
          }}
          to="/login"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="prof">
            <h1>Profile</h1>
            <span>
              <p
                className={`${activeSection === "details" ? "active" : ""}`}
                onClick={() => setActiveSection("details")}
              >
                User Details
              </p>
              <p
                className={`${activeSection === "order-history" ? "active" : ""}`}
                onClick={() => setActiveSection("order-history")}
              >
                Order History
              </p>
            </span>
          </div>

          <button className={`signout-btn`} onClick={signout}>
            Sign out
          </button>
        </div>

        <div className="profile-main-content">
          {activeSection === "details" && (
            <div className="user-info">
              <h2>User Details</h2>
              <div className="profile-picture">
                {loading ? (
                  <Loader />
                ) : (
                  <img
                    src={user.photoURL || ProfileIcon}
                    alt={user.displayName}
                  />
                )}
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
                    <div className="edit-user-info">
                      <form className="edit-form">
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
                      </form>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          className="profile-edit-button"
                          onClick={saveProfile}
                        >
                          Save
                        </button>
                        <button
                          className="profile-edit-button"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Name:</strong> {user.displayName}
                    </p>
                    <p>
                      <strong>Date of Birth:</strong> {dob}
                    </p>
                    <p>
                      <strong>Address:</strong> {address}
                    </p>
                    <p>
                      <strong>Phone Number:</strong> {phone}
                    </p>
                    <button className="profile-edit-button" onClick={startEdit}>
                      Edit Profile
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {activeSection === "order-history" && (
            <div className="order-history">
              <h2>Order History</h2>
              <p>No orders placed yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

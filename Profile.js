import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
    const [userProfile, setUserProfile] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
        bio: '',
        preferences: '',
        password: '',
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userEmail = localStorage.getItem("userEmail") || "default@example.com";
            try {
                const response = await axios.get(`http://localhost:8080/your-project/userprofile`, {
                    params: { email: userEmail }
                });
                if (response.data.error) {
                    console.error('User not found');
                } else {
                    setUserProfile(response.data);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/your-project/userprofile', new URLSearchParams(userProfile));
            alert(response.data.message || "Profile updated successfully!");
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={userProfile.username} onChange={handleChange} placeholder="Username" />
            <input type="email" name="email" value={userProfile.email} onChange={handleChange} placeholder="Email" />
            <input type="text" name="phone" value={userProfile.phone} onChange={handleChange} placeholder="Phone" />
            <input type="text" name="address" value={userProfile.address} onChange={handleChange} placeholder="Address" />
            <input type="text" name="bio" value={userProfile.bio} onChange={handleChange} placeholder="Bio" />
            <input type="text" name="preferences" value={userProfile.preferences} onChange={handleChange} placeholder="Preferences" />
            <input type="password" name="password" value={userProfile.password} onChange={handleChange} placeholder="Password" />
            <button type="submit">Update Profile</button>
        </form>
    );
}

export default Profile;

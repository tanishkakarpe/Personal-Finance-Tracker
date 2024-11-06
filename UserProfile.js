import React from 'react';
import Sidebar from './Sidebar';
import './style.css';

const UserProfile = () => {
    return (
        <div>
            <header>Finance Manager</header>
            <div className="container">
                <Sidebar />
                <div className="main-content">
                    <h2 className="h">User Profile</h2>
                    <form id="profile-form">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" required />

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />

                        <label htmlFor="phone">Phone:</label>
                        <input type="text" id="phone" name="phone" />

                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" name="address" />

                        <label htmlFor="bio">Bio:</label>
                        <textarea id="bio" name="bio"></textarea>

                        <label htmlFor="preferences">Preferences:</label>
                        <textarea id="preferences" name="preferences"></textarea>

                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />

                        <button type="submit">Save Profile</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

import React from 'react';
import Sidebar from './Sidebar';
import './style.css';

const Settings = () => {
    return (
        <div>
            <header>Finance Manager</header>
            <div className="container">
                <Sidebar />
                <div className="main-content">
                    <h2 className="h">Settings</h2>
                    <form id="settings-form">
                        <label htmlFor="theme">Theme</label>
                        <select id="theme" name="theme">
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>

                        <label htmlFor="notifications">Notifications</label>
                        <select id="notifications" name="notifications">
                            <option value="on">On</option>
                            <option value="off">Off</option>
                        </select>

                        <button type="submit">Save Settings</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Settings;

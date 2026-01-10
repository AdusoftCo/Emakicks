// Dashboard.jsx

import React from 'react';
import DashboardNavbar from '../components/DashboradNavbar';
import CrudProductos from '../components/CrudProducts';

const Dashboard = () => {
    const userName = "Admin ";

    const handleLogout = () => {
        window.location.href = '/';
    };

    return (
        <div>
            <DashboardNavbar userName={userName} onLogout={handleLogout} />
            <div className="container mt-4">
                <CrudProductos />
            </div>
        </div>
    );
};

export default Dashboard;

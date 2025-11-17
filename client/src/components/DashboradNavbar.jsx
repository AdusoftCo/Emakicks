// DashboardNavbar.jsx

import React from 'react';

const DashboardNavbar = ({ userName, onLogout }) => {

    return (
        <nav className='dashboard-navbar'>
            <div className='right-group'>
                <span style={{ color: '#333333' }}>{userName}</span>
                <button
                    onClick={onLogout}
                    style={{
                        backgroundColor: '#333333',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '1.75rem',
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                    Log out
                </button>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
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
                        height: '45px',
                        width: 'auto',
                        backgroundColor: '#333333',
                        color: 'white',
                        padding: '0 20px',
                        borderRadius: '15px',
                        cursor: 'pointer'
                    }}>
                    Log out
                </button>
            </div>
        </nav>
    );
};

export default DashboardNavbar;

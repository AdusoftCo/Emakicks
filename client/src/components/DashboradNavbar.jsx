// DashboardNavbar.jsx

import React from 'react';

const DashboardNavbar = ({ userName, onLogout }) => {
    return (
        <nav style={{
            display: 'flex',
            alignItems: 'center',
            paddingTop: '1rem',    
            paddingBottom: '1rem', 
            paddingLeft: '1rem',   
            paddingRight: '8rem',  
            width: '100%',
            boxSizing: 'border-box',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            
            <div style={{ flexGrow: 1 }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
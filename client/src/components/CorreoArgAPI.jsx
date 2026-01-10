import React, { useState, useEffect } from 'react';

// This is a utility function that you should use to securely handle API calls.
const apiUtils = {
    // Encodes username and password for HTTP Basic Authentication.
    encodeBasicAuth: (username, password) => {
        const credentials = `${username}:${password}`;
        return btoa(credentials);
    },

    // Fetches the JWT token from the authentication endpoint.
    getAuthToken: async (baseUrl, username, password) => {
        const basicAuthToken = apiUtils.encodeBasicAuth(username, password);
        try {
            const response = await fetch(`${baseUrl}/token`, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${basicAuthToken}`,
                    'Content-Type': 'application/json'
                },
                // The body might be required by the API, check their docs.
                body: JSON.stringify({})
            });

            if (!response.ok) {
                // Handle non-200 responses
                const errorData = await response.json();
                throw new Error(`Auth failed: ${errorData.message || response.statusText}`);
            }

            const data = await response.json();
            // The documentation specifies the key is "token".
            return data.token;
        } catch (error) {
            console.error("Error getting auth token:", error);
            throw error; // Rethrow to be handled by the component
        }
    },

    // Makes an authenticated API call with the provided JWT token.
    makeAuthenticatedRequest: async (baseUrl, authToken, endpoint) => {
        try {
            const response = await fetch(`${baseUrl}/${endpoint}`, {
                method: 'GET', // Or 'POST', etc.
                headers: {
                    // Use the Bearer token for all subsequent requests.
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API call failed: ${errorData.message || response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error making request to ${endpoint}:`, error);
            throw error;
        }
    }
};

const CorreoArgentinoAPI = () => {
    // Define the state for the component
    const [authToken, setAuthToken] = useState(null);
    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Replace with your actual credentials and base URL
    const BASE_URL = "https://api.correoargentino.com.ar/micorreo/v1";
    const USER = "YOUR_USER";
    const PASSWORD = "YOUR_PASSWORD";

    // This useEffect hook handles the initial token retrieval on component mount.
    useEffect(() => {
        const fetchToken = async () => {
            setLoading(true);
            setError(null);
            try {
                // Step 1: Get the token
                const token = await apiUtils.getAuthToken(BASE_URL, USER, PASSWORD);
                setAuthToken(token);
                console.log("Token obtained successfully.");
            } catch (err) {
                setError("Error obtaining token. Check your credentials.");
            } finally {
                setLoading(false);
            }
        };

        fetchToken();
    }, []); // Empty dependency array means this runs only once, on mount.

    // This function demonstrates making a call to a protected endpoint.
    const handleApiCall = async () => {
        if (!authToken) {
            setError("No hay un token de autenticación. Intenta obtenerlo primero.");
            return;
        }
        
        setLoading(true);
        setError(null);

        try {
            // Step 2: Use the token for an API call. Replace 'shipments' with your target endpoint.
            const data = await apiUtils.makeAuthenticatedRequest(BASE_URL, authToken, 'shipments');
            setApiData(data);
            console.log("Data retrieved successfully:", data);
        } catch (err) {
            setError("Error making API request. The token may be invalid or expired.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Integración con la API de Correo Argentino</h2>
            {loading && <div className="alert alert-info text-center">Cargando...</div>}
            {error && <div className="alert alert-danger text-center">{error}</div>}

            {!authToken && !loading && (
                <div className="alert alert-warning text-center">
                    No se pudo obtener el token de autenticación. Verifica tus credenciales.
                </div>
            )}

            {authToken && (
                <div className="card shadow-sm p-4 text-center">
                    <p className="lead">¡Autenticación exitosa! Ahora puedes hacer llamadas a la API.</p>
                    <button 
                        className="btn btn-primary"
                        onClick={handleApiCall}
                        disabled={loading}
                    >
                        {loading ? 'Haciendo solicitud...' : 'Hacer Solicitud a la API'}
                    </button>
                    {apiData && (
                        <div className="mt-4">
                            <h5>Datos de la API:</h5>
                            <pre className="bg-light p-3 rounded text-start" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {JSON.stringify(apiData, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CorreoArgentinoAPI;

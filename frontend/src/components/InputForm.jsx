import React, { useState } from 'react';
import axios from 'axios';

const InputForm = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [debugMode, setDebugMode] = useState(true); // New state for debug mode

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResponse(null);

        try {
            const jsonData = JSON.parse(input);
            const res = await axios.post('https://bfhl-backend-wmdt.onrender.com/bfhl', jsonData);
            console.log(res.data); // Log the response data
            setResponse(res.data);
        } catch (err) {
            console.error('Error:', err);
            if (err.response) {
                console.error('Response data:', err.response.data);
                console.error('Response status:', err.response.status);
            }
            setError('Invalid JSON input or network error');
        }
    };

    return (
        <div style={styles.container}>
            {debugMode && <h2>Debug: InputForm is rendering!</h2>} {/* Conditional debug log */}
            <form onSubmit={handleSubmit}>
                <textarea
                    style={error ? { ...styles.textarea, ...styles.errorTextarea } : styles.textarea}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Enter JSON here'
                />
                <button type='submit' style={styles.button}>Submit</button>
                {error && <div style={styles.error}>{error}</div>}
            </form>
            {/* ... rest of your component */}
        </div>
    );
};

// ... your styles and export

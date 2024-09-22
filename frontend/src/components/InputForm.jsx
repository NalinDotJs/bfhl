import React, { useState } from 'react';
import axios from 'axios';

const InputForm = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedFilters, setSelectedFilters] = useState([]);

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
            if (err.response) {
                console.error('Response data:', err.response.data); 
                setError(err.response.data); 
            } else if (err.request) {
                console.error('Request error:', err.request); // Log request error
                setError('Network error, please try again.');
            } else {
                console.error('Error message:', err.message); // Log any other error message
                setError('An unexpected error occurred.');
            }
        }
    };

    const handleFilterAdd = (e) => {
        const filterValue = e.target.value;
        if (filterValue && !selectedFilters.includes(filterValue)) {
            setSelectedFilters((prev) => [...prev, filterValue]);
        }
        e.target.value = ''; // Reset the dropdown selection
    };

    const handleRemoveFilter = (filter) => {
        setSelectedFilters((prev) => prev.filter((f) => f !== filter));
    };

    const renderFilters = () => {
        return selectedFilters.map((filter, index) => (
            <div key={index} style={styles.filter}>
                {filter} <button style={styles.removeButton} onClick={() => handleRemoveFilter(filter)}>x</button>
            </div>
        ));
    };

    const renderResponse = () => {
        if (!response) return null;
        const { numbers, alphabets, highest_lowercase_alphabet } = response;

        const filteredData = selectedFilters.map((filter) => {
            if (filter === 'Numbers') return `Numbers: ${numbers.join(', ')}`;
            if (filter === 'Alphabets') return `Alphabets: ${alphabets.join(', ')}`;
            if (filter === 'Highest Lowercase Alphabet') return `Highest Lowercase Alphabet: ${highest_lowercase_alphabet.join(', ')}`;
        }).filter(Boolean).join(' | ');

        return <div style={styles.response}>Filtered Response: {filteredData}</div>;
    };

    return (
        <div style={styles.container}>
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

            <div style={styles.multiFilter}>
                <label htmlFor="filterSelect">Select Filter:</label>
                <select id="filterSelect" style={styles.select} onChange={handleFilterAdd}>
                    <option value="">Multi Filter</option>
                    <option value='Numbers'>Numbers</option>
                    <option value='Alphabets'>Alphabets</option>
                    <option value='Highest Lowercase Alphabet'>Highest Lowercase Alphabet</option>
                </select>
                <div style={styles.selectedFilters}>
                    {renderFilters()}
                </div>
            </div>

            {renderResponse()}
        </div>
    );
};

// Styles here...

export default InputForm;

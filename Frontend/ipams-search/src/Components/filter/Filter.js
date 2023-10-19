import React, { useState } from 'react';
import "./Filter.css";
import Dropdown from '../dropdown/Dropdown';

function Filter({ onFilterChange }) {
    const [selectedFields, setSelectedFields] = useState([]);
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [selectedRecordTypes, setSelectedRecordTypes] = useState([]);

    const fieldOfStudyItems = [
        { id: "14", name: "Education Science and Teacher Training" },
        { id: "18", name: "Fine and Applied Arts" },
        { id: "22", name: "Humanities" },
        { id: "26", name: "Religion and Theology" },
        { id: "30", name: "Social and Behavioral Sciences" },
        { id: "34", name: "Business Administration and Related" },
        { id: "38", name: "Law and Jurisprudence" },
        { id: "42", name: "Natural Science" },
        { id: "46", name: "Mathematics" },
        { id: "47", name: "IT-Related Disciplines" },
        { id: "50", name: "Medical and Allied" },
        { id: "52", name: "Trade, Craft and Industrial" },
        { id: "54", name: "Engineering and Tech" },
        { id: "58", name: "Architecture and Town Planning" },
        { id: "62", name: "Agriculture, Forestry, Fisheries" },
        { id: "66", name: "Home Economics" },
        { id: "78", name: "Service Trades" },
        { id: "84", name: "Mass Communication and Documentation" },
        { id: "89", name: "Other Disciplines" },
        { id: "90", name: "Maritime" },
        { id: "00", name: "General" },
    ];
      
    const recordTypeItems = [
        { id: "1", name: "Proposal" },
        { id: "2", name: "Thesis/Research" },
        { id: "3", name: "Project" },
    ];

    const handleFieldOfStudyChange = (event) => {
        const selectedFields = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedFields(selectedFields);
    };

    const handleStartYearChange = (event) => {
        setStartYear(event.target.value);
    };

    const handleEndYearChange = (event) => {
        setEndYear(event.target.value);
    };

    const handleRecordTypeChange = (event) => {
        const selectedTypes = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedRecordTypes(selectedTypes);
    };

    const applyFilters = () => {
        onFilterChange({
        selectedFields,
        startYear,
        endYear,
        selectedRecordTypes,
        });
    };

    return (
        <div className="filter-container">
            <h3 className='filter-title'>Filters</h3>

            <Dropdown items={fieldOfStudyItems} onSelect={handleFieldOfStudyChange} label="Field of Study" />

            <div className="filter-group year-inputs">
                <label className="filter-label">Start Year: </label>
                <input
                type="number"
                className="year-input"
                placeholder="Start Year"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                min="1" // Minimum year
                max="2023" // Maximum year
                step="1"   // Step by 1 year
                />
                <span> - </span>
                <label className="filter-label">End Year:</label>
                <input
                type="number"
                className="year-input"
                placeholder="End Year"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                min="1" // Minimum year
                max="2023" // Maximum year
                step="1"   // Step by 1 year
                />
            </div>

            <Dropdown items={recordTypeItems} onSelect={handleRecordTypeChange} label="Record Type" />

            <button className="apply-filters-button" onClick={applyFilters}>Apply Filters</button>
        </div>
    );
}

export default Filter;
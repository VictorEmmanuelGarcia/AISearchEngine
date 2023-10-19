import React, { useState } from 'react';
import "./Filter.css";

function Filter({ onFilterChange }) {
  const [selectedFields, setSelectedFields] = useState([]);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [selectedRecordTypes, setSelectedRecordTypes] = useState([]);

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
        <label>Field of Study:</label>
        <select className="select-dropdown" multiple={true} onChange={handleFieldOfStudyChange}>
            {/* Options for field of study */}
        </select>

        <label>Start Date:</label>
        <input
            type="number"
            className="year-input"
            placeholder="Start Year"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            min="1900" // Minimum year
            max="2099" // Maximum year
            step="1"   // Step by 1 year
        />

        <span> - </span>
        
        <label>End Date:</label>
        <input
            type="number"
            className="year-input"
            placeholder="End Year"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            min="1900" // Minimum year
            max="2099" // Maximum year
            step="1"   // Step by 1 year
        />

        <label>Record Type:</label>
        <select className="select-dropdown" multiple={true} onChange={handleRecordTypeChange}>
            {/* Options for record type */}
        </select>

        <button className="apply-filters-button" onClick={applyFilters}>Apply Filters</button>
    </div>
  );
}

export default Filter;
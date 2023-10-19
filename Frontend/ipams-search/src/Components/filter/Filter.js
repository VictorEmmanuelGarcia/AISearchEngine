import React, { useState } from 'react';

function Filter({ onFilterChange }) {
  const [selectedFields, setSelectedFields] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedRecordTypes, setSelectedRecordTypes] = useState([]);

  const handleFieldOfStudyChange = (event) => {
    const selectedFields = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedFields(selectedFields);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleRecordTypeChange = (event) => {
    const selectedTypes = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedRecordTypes(selectedTypes);
  };

  const applyFilters = () => {
    onFilterChange({
      selectedFields,
      startDate,
      endDate,
      selectedRecordTypes,
    });
  };

  return (
    <div>
      <label>Field of Study:</label>
      <select multiple={true} onChange={handleFieldOfStudyChange}>
        {/* Options for field of study */}
      </select>
      <label>Start Date:</label>
      <input type="date" value={startDate} onChange={handleStartDateChange} />
      <label>End Date:</label>
      <input type="date" value={endDate} onChange={handleEndDateChange} />
      <label>Record Type:</label>
      <select multiple={true} onChange={handleRecordTypeChange}>
        {/* Options for record type */}
      </select>
      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
}

export default Filter;
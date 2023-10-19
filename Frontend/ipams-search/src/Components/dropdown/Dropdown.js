import React, { useState } from 'react';
import "./Dropdown.css"

const Dropdown = ({ items, onSelect, label }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`dropdown ${isOpen ? 'open' : ''}`}>
            <label
                className="dropdown-toggle btn btn-primary"
                onClick={toggleOpen}
            >
                {label}<span className="caret"></span>
            </label>
            <ul className="dropdown-menu">
                {items.map((item) => (
                <li key={item.id}>
                    <a onClick={() => onSelect(item.id)}>{item.name}</a>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default Dropdown;
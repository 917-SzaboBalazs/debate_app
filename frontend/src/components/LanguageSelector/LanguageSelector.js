import React, { useState } from "react";
import './LanguageSelector.css';
import Dropdown from 'react-dropdown';
import en_flag from '../../images/flags/en.png';
import hu_flag from '../../images/flags/hu.png';

const LanguageSelector = ({selectedLanguage, toggleLanguage}) => {
    const languages = [
        {value: 'hu', label: <img src={hu_flag} alt="HU" />},
        {value: 'en', label: <img src={en_flag} alt="EN" />}
    ];

    const defaultOption = selectedLanguage;

    return (
        

            <Dropdown
                className="language-selector--dropdown"
                options={languages}
                value={defaultOption}
                onChange={toggleLanguage}
                
            />
    );
};

export default LanguageSelector;

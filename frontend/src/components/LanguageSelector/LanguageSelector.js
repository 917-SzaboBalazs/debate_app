import React, { useEffect, useRef, useState } from "react";
import './LanguageSelector.css';
import Dropdown from 'react-dropdown';
import en_flag from '../../images/flags/en.png';
import hu_flag from '../../images/flags/hu.png';

const LanguageSelector = ({selectedLanguage, toggleLanguage, selectLanguage, windowWidth}) => {
    const languages = [
        {value: 'hu', label: <img src={hu_flag} alt="HU" />},
        {value: 'en', label: <img src={en_flag} alt="EN" />}
    ];

    const defaultOption = selectedLanguage;

    return (
            <>
            {
                windowWidth >= 992 ? 

                    <Dropdown
                    className="language-selector--dropdown"
                    options={languages}
                    value={defaultOption}
                    onChange={toggleLanguage}
                
                />
            :
                <>
                    <div className="language-selector--list-container">
                        <img src={hu_flag} alt="HU" className="langauge-selector--language-flag" onClick={() => selectLanguage("hu")} />
                        <img src={en_flag} alt="EN" className="langauge-selector--language-flag" onClick={() => selectLanguage("en")} />

                    </div>
                </>
            }

            </>
    );
};

export default LanguageSelector;

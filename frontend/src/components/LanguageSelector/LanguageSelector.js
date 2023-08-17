import React, { useState } from "react";
import i18n from "../../i18n";
import './LanguageSelector.css';

const LanguageSelector = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    const toggleLanguage = () => {
        const newLanguage = selectedLanguage === "en" ? "hu" : "en";
        i18n.changeLanguage(newLanguage);
        setSelectedLanguage(newLanguage);
        localStorage.setItem("lang", newLanguage);
    }

    return (
        // <div className="language-selector nav-link">
            <button className="language-button" onClick={toggleLanguage}>
                {selectedLanguage === "en" ? "Hungarian" : "English"}
            </button>
        // </div>
    );
};

export default LanguageSelector;

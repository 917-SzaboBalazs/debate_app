import React from 'react';
import './Error.css';
import { useTranslation } from 'react-i18next'

function ErrorPage() {
    const { t } = useTranslation();
    return (
        <div className="error404--holder base">
            <div className="error404--container base">
                <h1 className="error404--inscription">{t("404")}</h1>
            </div>
        </div>
    );
}

export default ErrorPage;
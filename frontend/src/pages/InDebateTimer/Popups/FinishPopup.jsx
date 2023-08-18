import React from 'react';
import { useTranslation } from 'react-i18next'

import './FinishPopup.css';

export default function FinishPopup(props) {
  const { t } = useTranslation();
  return (props.trigger) ? (
    <div className="finish-popup">
        <div className="finish-popup--inner">
            <p>{t("inDebate.popup.title")}</p>
            <div className="finish-popup-buttons">
              <button onClick={() => {
                props.setTrigger(false);
                props.navigate('/judges-drag');
              }}>{t("inDebate.popup.yes")}</button>
              <button onClick={() => props.setTrigger(false)}>{t("inDebate.popup.no")}</button>
            </div>
        </div>
    </div>
  ) : '';
}

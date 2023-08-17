import React from 'react';
import ReadMore from './ReadMore/ReadMore';
import './Debates.css';
import { useTranslation } from 'react-i18next'


function Debates() {
    const { t } = useTranslation();
  return (
    <div className="debates--base base">
        <div className="container debates--container fade-in">
            <div className="row debates--header-row">
                <div className="col-4 debates--header-title-cont">
                    <h1 className="debates--header-title">
                        {t("debates.formats")}
                    </h1>
                </div>
                <div className="col-8 debates--header-elements">
                    {/*<h2 className="debates--header-elements">*/}
                    {/*    Header Elements*/}
                    {/*</h2>*/}
                </div>
            </div>
            <div className="row debates--elements-row">
                <div className="debates--elements-col">
                    <h1 className="debates--elements--title">
                        {t("debates.brit.name")}
                    </h1>
                    <ReadMore>
                    {t("debates.brit.description")}
                    </ReadMore>
                </div>
                <div className="debates--elements-col">
                    <h1 className="debates--elements--title">
                        {t("debates.worldSchools.name")}
                    </h1>
                    <ReadMore>
                        {t("debates.worldSchools.description")}
                    </ReadMore>
                </div>
                <div className="debates--elements-col">
                <h1 className="debates--elements--title">
                        {t("debates.karlPopper.name")}
                    </h1>
                    <ReadMore>
                        {t("debates.karlPopper.description")}
                    </ReadMore>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Debates
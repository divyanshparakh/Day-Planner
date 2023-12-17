import React from "react";
import './NoPage.scss';

const NoPage = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <img width="64" height="64" src="https://img.icons8.com/external-bearicons-gradient-bearicons/64/external-404-website-bearicons-gradient-bearicons.png" alt="external-404-website-bearicons-gradient-bearicons"/>
                <p>404</p>
                <p>Page Not Found</p>
            </div>
        </div>
    )
}

export default NoPage;
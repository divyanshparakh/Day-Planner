import React from "react";
import './Loading.scss';

function Loading() {
    return (
        <div className="loading">
            <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Loading;
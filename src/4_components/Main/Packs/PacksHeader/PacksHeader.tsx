import React from 'react';
import privateClass from "./PacksHeader.module.css"

const PacksHeader = () => {
    return (
        <div className={privateClass.row}>
            <div>Name</div>
            <div>Quantity cards</div>
            <div>Last update</div>
            <div>Actions</div>
        </div>
    );
};

export default PacksHeader;
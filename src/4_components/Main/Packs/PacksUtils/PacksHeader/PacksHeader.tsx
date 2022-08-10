import React from 'react';
import privateClass from "./PacksHeader.module.css"
import UniversalInput from "../../../../../3_commons/common_components/UniversalInput/UniversalInput";

type PacksHeaderPropsType = {
    addPack: (title: string, error?: string) => void
    inputError: string | null
}
const PacksHeader: React.FC<PacksHeaderPropsType> = ({addPack, inputError}) => {
    console.log("packs header render")
    return (
        <div className={privateClass.row}>
            <div>Name</div>
            <div>Quantity cards</div>
            <div>Last update</div>
            <div className={privateClass.addPack}>
                <UniversalInput error={inputError} textError={inputError} onButtonClickHandler={addPack} type={"text"} placeholder={"create new pack"}/>
            </div>
        </div>
    );
};

export default PacksHeader;
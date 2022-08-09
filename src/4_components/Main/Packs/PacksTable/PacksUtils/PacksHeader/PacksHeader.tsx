import React from 'react';
import privateClass from "./PacksHeader.module.css"
import UniversalBtn from "../../../../../../3_commons/common_components/UniversalBtn/UniversalBtn";
import {useAppDispatch} from "../../../../../../2_BLL/store";
import {createPackTC} from "../../../../../../2_BLL/packs-reducer";

const PacksHeader = () => {
    console.log("packs header render")
    const dispatch = useAppDispatch()
    return (
        <div className={privateClass.row}>
            <div>Name</div>
            <div>Quantity cards</div>
            <div>Last update</div>
            <UniversalBtn onClicked={()=>dispatch(createPackTC("new pack cards"))} text={"add"}/>
        </div>
    );
};

export default PacksHeader;
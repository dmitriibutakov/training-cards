import React, {useEffect} from 'react';
import Pages from "./4_components/Routes/Routes";
import Navigation from "./4_components/Navigation/Navigation";
import {BrowserRouter} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./2_BLL/store";
import {initAppTC} from "./2_BLL/app-reducer";
import Preloader from "./3_commons/common_components/Preloader/Preloader";

const App = () => {
    const {isInit} = useAppSelector(state => state.app)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initAppTC())
    }, [dispatch])
    if (!isInit) {
        return <Preloader/>
    }
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Navigation/>
            <Pages/>
        </BrowserRouter>
    );
};

export default App;
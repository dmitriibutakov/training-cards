import React, {useEffect} from 'react';
import privateClass from "./App.module.css"
import Pages from "./4_components/Routes/Routes";
import Header from "./4_components/Header/Header";
import {BrowserRouter} from "react-router-dom";
import {AppStateType, useAppDispatch} from "./2_BLL/store";
import {initAppTC} from "./2_BLL/app-reducer";
import {useSelector} from "react-redux";
import Preloader from "./3_commons/Preloader/Preloader";

const App = () => {
    const isInit = useSelector<AppStateType, boolean>(state => state.app.isInit)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(initAppTC())
    }, [])

    console.log("App")
    if (!isInit) {
        return <Preloader/>
    }
    return (
        <BrowserRouter>
            <div className={privateClass.body}>
                <Header/>
                <Pages/>
            </div>
        </BrowserRouter>
    );
};

export default App;
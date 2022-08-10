import React, {useEffect} from 'react';
import privateClass from "./App.module.css"
import Pages from "./4_components/Routes/Routes";
import Navigation from "./4_components/Navigation/Navigation";
import {BrowserRouter} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./2_BLL/store";
import {initAppTC} from "./2_BLL/app-reducer";
import Preloader from "./3_commons/Preloader/Preloader";
import {getPacksTC} from "./2_BLL/packs-reducer";

const App = () => {
    const isInit = useAppSelector(state => state.app.isInit)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const page = useAppSelector(state => state.packs.page)

    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getPacksTC());
        }
    }, [isLoggedIn, page])
    useEffect(() => {
        dispatch(initAppTC())
    }, [])
    if (!isInit) {
        return <Preloader/>
    }
    return (
        <BrowserRouter>
            <div className={privateClass.body}>
                <Navigation/>
                <Pages/>
            </div>
        </BrowserRouter>
    );
};

export default App;
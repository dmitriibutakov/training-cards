import React from 'react';
import privateClass from "./App.module.css"
import Pages from "./4_components/Routes/Routes";
import Header from "./4_components/Header/Header";
import {BrowserRouter} from "react-router-dom";


const App = () => {
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
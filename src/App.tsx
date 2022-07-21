import React from 'react';
import privateClass from "./App.module.css"
import Pages from "./4_components/Routes/Routes";
import Header from "./4_components/Header/Header";

const App = () => {
    return (
        <div className={privateClass.body}>
            <Header/>
            <Pages/>
        </div>
    );
};

export default App;
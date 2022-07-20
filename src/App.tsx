import React from 'react';
import Pages from "./app-components/Routes/Routes";
import Navigation from "./app-components/Navigation/Navigation";

const App = () => {
    return (
        <div>
            <Navigation/>
            <Pages/>
        </div>
    );
};

export default App;
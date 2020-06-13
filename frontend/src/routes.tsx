import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePlace from './pages/CreatePlace';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreatePlace} path="/create-place" />
        </BrowserRouter>
    )
};

export default Routes;
import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Game from '../../pages/Game';
import Home from '../../pages/Home';




export default function Routes() {
    return (
    


        <BrowserRouter>
        
        <Switch>

            <Route exact path="/" component={Home} />
            <Route exact  path="/salas/:id" component={Game} />
         
            

        </Switch>

        
        </BrowserRouter>

    )
}

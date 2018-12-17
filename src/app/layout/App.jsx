import React, {Component} from 'react';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';

import NavBar from "../../features/nav/NavBar/NavBar";
import {Container} from "semantic-ui-react";
import {Route, Switch} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import PeopleDashBoard from "../../features/user/PeopleDashboard/PeopleDashboard";
import SettingsDashboard from "../../features/user/Setting/SettingsDashboard";
import TestComponent from "../../features/testarea/TestComponent";
import EventDetailedPage from "../../features/event/EventDetailed/EventDetailedPage";
import EventForm from "../../features/event/EventForm/EventForm";

class App extends Component {
    render() {
        return (
            <>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                </Switch>


                <Route path="/(.+)" render={() => (
                    <>
                        <NavBar/>
                        <Container className="main">
                            <Switch>
                                <Route path="/events" component={EventDashboard}/>
                                <Route path="/event/:id" component={EventDetailedPage}/>
                                <Route path="/manage/:id" component={EventForm} />
                                <Route path="/createEvent" component={EventForm} />
                                <Route path="/test" component={TestComponent} />
                                <Route path="/peoples" component={PeopleDashBoard}/>
                                <Route path="/settings" component={SettingsDashboard}/>
                            </Switch>
                        </Container>
                    </>
                )}>
                </Route>
            </>
        );
    }
}

export default App;

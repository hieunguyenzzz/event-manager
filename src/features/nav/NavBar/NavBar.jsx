import React, {Component} from 'react';
import {Button, Container, Menu} from "semantic-ui-react";
import {Link, NavLink, withRouter} from 'react-router-dom';
import SignedInMenu from "../Menus/SignedInMenu";
import SignedOutMenu from "../Menus/SignedOutMenu";

class NavBar extends Component {
    state = {
        authenticated: false
    }

    handleSignIn = () => {
        this.setState({authenticated: true})
    }

    handleSignOut = () => {
        this.setState({authenticated: false})
        this.props.history.push('/');
    }

    render() {
        const authenticated = this.state.authenticated;
        return (
            <Menu fixed="top">
                <Container>
                    <Menu.Item header as={Link} to="/events">
                        <img src="/assets/logo.png" alt="logo"/>
                        Re-vents
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/events" name="Events"/>
                    <Menu.Item as={NavLink} to="/peoples" name="Peoples"/>
                    <Menu.Item>
                        <Button as={Link} to={`createEvent`} floated="right" positive inverted content="Create Event"/>
                    </Menu.Item>
                    {authenticated ?
                        <SignedInMenu signOut={this.handleSignOut}/> :
                        <SignedOutMenu signIn={this.handleSignIn}/>}
                </Container>
            </Menu>
        );
    }
}

export default withRouter(NavBar);

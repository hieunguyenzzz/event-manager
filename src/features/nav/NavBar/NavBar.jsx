import React, {Component} from 'react';
import {Button, Container, Menu} from "semantic-ui-react";

class NavBar extends Component {
    render() {
        return (
            <Menu fixed="top">
                <Container>
                    <Menu.Item header>
                        <img src="assets/logo.png" alt="logo" />
                        Re-vents
                    </Menu.Item>
                    <Menu.Item name="Events" />
                    <Menu.Item>
                        <Button floated="right" positive inverted content="Create Event" />
                    </Menu.Item>
                    <Menu.Item position="right">
                        <Button basic content="Login" />
                        <Button basic content="Sign Out" style={{marginLeft: '0.5em'}} />
                    </Menu.Item>
                </Container>
            </Menu>
        );
    }
}

export default NavBar;

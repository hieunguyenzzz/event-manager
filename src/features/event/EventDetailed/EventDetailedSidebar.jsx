import React, {Component} from 'react';
import {Segment, List, Label, Item} from 'semantic-ui-react';

class EventDetailedSidebar extends Component {
    render() {
        const {attendees} = this.props;
        const isHost = false;
        return (
            <div>
                <Segment
                    textAlign="center"
                    style={{border: 'none'}}
                    attached="top"
                    secondary
                    inverted
                    color="teal"
                >
                    2 People Going
                </Segment>
                <Segment attached>
                    {attendees.length && attendees.map(attendee => {
                        return (
                            <List key={attendee.id} relaxed divided>
                                <Item  style={{position: 'relative'}}>

                                    {isHost && <Label
                                        style={{position: 'absolute'}}
                                        color="orange"
                                        ribbon="right"
                                    >
                                        Host
                                    </Label>}

                                <Item.Image size="tiny" src={attendee.photoURL}/>
                                <Item.Content verticalAlign="middle">
                                    <Item.Header as="h3">
                                        <a>{attendee.name}</a>
                                    </Item.Header>
                                </Item.Content>
                            </Item>
                            </List>
                        )
                    })}
                </Segment>
            </div>
        )
    }
}

export default EventDetailedSidebar;
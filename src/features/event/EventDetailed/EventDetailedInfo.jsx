import React, {Component} from 'react';
import {Segment, Grid, Icon, Button} from 'semantic-ui-react';
import EventMap from "./EventMap";

class EventDetailedInfo extends Component {
    state = {
        showMap: false
    }

    handleShowMap = () => {
        this.setState({showMap: !this.state.showMap});
    }

    render() {
        const {event} = this.props;
        return (
            <Segment.Group>
                <Segment attached="top">
                    <Grid>
                        <Grid.Column width={1}>
                            <Icon size="large" color="teal" name="info" />
                        </Grid.Column>
                        <Grid.Column width={15}>
                            <p>{event.description}</p>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment attached>
                    <Grid verticalAlign="middle">
                        <Grid.Column width={1}>
                            <Icon name="calendar" size="large" color="teal" />
                        </Grid.Column>
                        <Grid.Column width={15}>
                            <span>{event.date.toLocaleLowerCase()}</span>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment attached>
                    <Grid verticalAlign="middle">
                        <Grid.Column width={1}>
                            <Icon name="marker" size="large" color="teal" />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <span>{event.venue}</span>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Button color="teal" size="tiny" content="Show Map" onClick={this.handleShowMap} />

                        </Grid.Column>
                    </Grid>
                </Segment>
                {this.state.showMap &&
                <Segment attached>
                     <EventMap center={event.venueLatLng}  />
                </Segment>}
            </Segment.Group>
        );
    }
}

export default EventDetailedInfo;
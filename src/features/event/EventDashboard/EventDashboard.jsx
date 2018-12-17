import {Grid} from 'semantic-ui-react';
import React from 'react';
import {connect} from 'react-redux'
import {deleteEvent} from '../eventActions';
import EventList from "../EventList/EventList";

const mapState = (state) => ({
   events: state.events
});

const actions = {
    deleteEvent
}


class EventDashboard extends React.Component {
    handleDeleteEvent = (eventId) => () => {
        const {deleteEvent} = this.props;
        deleteEvent(eventId);
    }

    render() {
        const {events} = this.props;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventList events={events} handleDeleteEvent={this.handleDeleteEvent}/>

                </Grid.Column>
                <Grid.Column width={6}>

                </Grid.Column>
            </Grid>
        );
    }
}

export default connect(mapState, actions)(EventDashboard);
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {decreaseCounter, increaseCounter} from './testActions';
import {Button} from 'semantic-ui-react';


const mapState = (state) => ({
    data: state.test.data
});


const actions = {
    decreaseCounter, increaseCounter
}

class TestComponent extends Component {
    render() {
        const {decreaseCounter, increaseCounter, data} = this.props;
        return (
            <div>
                <h1>Test area</h1>
                <h3>{data}</h3>
                <Button onClick={increaseCounter} color='green' content="increment"/>
                <Button onClick={decreaseCounter} color='red' content="decrement"/>
            </div>

        );
    }
}

export default connect(mapState, actions)(TestComponent);

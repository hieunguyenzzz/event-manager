import {combineReducers} from 'redux';
import testReducer from "../../features/testarea/testReducer";
import evenReducer from '../../features/event/eventReducer';

const rootReducer = combineReducers({
    test: testReducer,
    events: evenReducer
});

export default rootReducer;
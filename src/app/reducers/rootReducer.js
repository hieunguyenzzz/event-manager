import {combineReducers} from 'redux';
import testReducer from "../../features/testarea/testReducer";
import evenReducer from '../../features/event/eventReducer';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
    form: FormReducer,
    test: testReducer,
    events: evenReducer
});

export default rootReducer;
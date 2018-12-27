import {INCREASE_COUNTER, DECREASE_COUNTER} from './testConstants';
import {createReducer} from '../../app/common/Utils/ReducerUtil';

const initialState = {
    data: 42
}

const incrementCounter = (state, payload) => {
    return {...state, data: state.data + 1}
}

const decrementCounter = (state, payload) => {
    return {...state, data: state.data - 1}
}

// const testReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case INCREASE_COUNTER:
//             return {...state, data: state.data + 1}
//         case DECREASE_COUNTER:
//             return {...state, data: state.data - 1}
//         default:
//             return state;
//     }
// }

// export default testReducer;

export default createReducer(initialState, {
    [INCREASE_COUNTER]: incrementCounter,
    [DECREASE_COUNTER]: decrementCounter
})

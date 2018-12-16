import {DECREASE_COUNTER, INCREASE_COUNTER} from './testConstants';

export const decreaseCounter = () => {
    return {
        type: DECREASE_COUNTER
    }
}

export const increaseCounter = () => {
    return {
        type: INCREASE_COUNTER
    }
}
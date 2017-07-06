import { combineReducers } from 'redux';
import appleBasketReducer from './appleReducer';
const rootReducer = combineReducers({
    appleBasket: appleBasketReducer
});

export default rootReducer;
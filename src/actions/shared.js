import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';
import { receiveTweets } from './tweets';
import { setAuthedUser } from './authedUser';

// constant defined to not handle authentication;
const AUTHED_USER = 'dan_abramov';
export const RECEIVE_DATA = 'RECEIVE_DATA';

export function handleInitialData(){
    return dispatch => {
        return getInitialData()
            .then(({users, tweets}) => {
                dispatch(receiveUsers(users))
                dispatch(receiveTweets(tweets))
                dispatch(setAuthedUser(AUTHED_USER))
            })
    }
}
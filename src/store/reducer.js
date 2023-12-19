import { SETPAGE } from "./types"
const initialState = {
    page:55,
    count:1,
    data:[]
}
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SETPAGE: {
            return {
              ...state,
              page:  action.page,
              count: action.count,
              data:  action.data 
            };
          }
    default:
            return state
        }
    }    
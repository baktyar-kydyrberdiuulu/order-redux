import { ADD_ORDER, DELETE_ORDER } from "../actions";
let ordersLocal = JSON.parse(localStorage.getItem("orders"));

const defaultState = {
  orders: ordersLocal || [],
  totalPrice: 0,
  totalCount: 0,
};
export const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      // findIndex
      let is_chosen = state.orders.findIndex(
        (item) => item.title === action.payload.title
      );
      if (is_chosen !== -1) {
        let arr = [...state.orders];
        arr[is_chosen].count = arr[is_chosen].count + 1;
        arr[is_chosen].sum = arr[is_chosen].sum + action.payload.price;
        return {
          ...state,
          orders: arr,
        };
      } else {
        return {
          ...state,
          orders: [
            ...state.orders,
            {
              title: action.payload.title,
              price: action.payload.price,
              count: 1,
              sum: action.payload.price,
            },
          ],
        };
      }

    //  -----------
    case DELETE_ORDER:
      let is_chose = state.orders.findIndex(
        (item) => item.title === action.payload.title
      );
      let arr1 = [...state.orders];
      if (is_chose !== -1) {
        if (arr1[is_chose].count > 1) {
          arr1[is_chose].count = arr1[is_chose].count - 1;
          arr1[is_chose].sum = arr1[is_chose].sum - action.payload.price;
          return {
            ...state,
            orders: arr1,
          };
        } else {
          return {
            ...state,
            orders: arr1.filter((el) => el.title !== arr1[is_chose].title),
          };
        }
      }

    default:
      return state;
  }
};

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Actions
    addToBasket: (state, action) => {
      const dataItems = { ...state.items };

      const newItem = action.payload.data;
      const productId = newItem?.id;

      if (dataItems?.[productId]) {
        dataItems[productId].quantity =
          dataItems[productId].quantity + action.payload.quantity;
      } else {
        newItem.quantity = action.payload.quantity;
        dataItems[productId] = newItem;
      }

      // console.log(dataItems);

      state.items = dataItems;
    },

    removeFromBasket: (state, action) => {
      const productId = action.payload.id;

      const newBasket = { ...state.items };

      delete newBasket[productId];

      state.items = newBasket;
    },

    updateQuantity: (state, action) => {
      const oldState = { ...state.items };

      const productId = action.payload.id;

      oldState[productId].quantity = action.payload.quantity;

      state.items = oldState;
    },
  },
});

export const { addToBasket, removeFromBasket, updateQuantity } =
  basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state, props) => {
  let total = 0;
  const items = state.basket.items;

  Object.keys(items).map(
    (key) => (total = total + items[key].price * 75 * items[key].quantity)
  );
  // state.basket.items.reduce((total, item) => total + item.price * 75, 0);
  return total;
};

export const calculatePrice = (state, props) => {
  // console.log(props);
  const item = state.basket.items[props?.id];

  return item.price * item.quantity;
};

export default basketSlice.reducer;

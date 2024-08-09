import { createSlice } from "@reduxjs/toolkit";

export const ticketCartSlice = createSlice({
  name: "ticketCart",
  initialState: {
    tickets: [],
    totalPrice: 0,
  },
  reducers: {
    initializeState: (state, action) => {
      const newCartState = action.payload.map((ticket) => ({
        id: ticket.id,
        ticketName: ticket.ticketName,
        stripeID: ticket.stripeID,
        quantity: 0,
        price: ticket.ticketPrice,
        form: ticket.form,
      }));
      return {
        ...state,
        tickets: newCartState,
        totalPrice: Number("0"),
      };
    },
    addItem: (state, action) => {
      const index = state.tickets.findIndex(
        (ticket) => ticket.id === action.payload.id
      );

      let newCartItems = [...state.tickets];

      if (index !== -1) {
        newCartItems[index] = {
          ...newCartItems[index],
          quantity: newCartItems[index]?.quantity + 1 || 1,
        };
      } else {
        newCartItems.push({
          id: action.payload.id,
          stripeID: action.payload.stripeID,
          quantity: 1,
          price: action.payload.ticketPrice,
        });
      }

      let newTotal = newCartItems.reduce((acc, currentItem) => {
        return acc + currentItem.price * currentItem.quantity;
      }, 0);

      return {
        ...state,
        tickets: newCartItems,
        totalPrice: Number(newTotal),
      };
    },
    removeItem: (state, action) => {
      const index = state.tickets.findIndex(
        (ticket) => ticket.id === action.payload.id
      );
      if (index !== -1) {
        if (state.tickets[index].quantity > 1) {
          state.tickets[index] = {
            ...state.tickets[index],
            quantity: state.tickets[index].quantity - 1,
          };
          state.totalPrice -= state.tickets[index].price;
        } else {
          state.totalPrice -= state.tickets[index].price;
          state.tickets.splice(index, 1);
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, initializeState } = ticketCartSlice.actions;

export default ticketCartSlice.reducer;

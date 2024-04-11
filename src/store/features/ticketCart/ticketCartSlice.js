import { createSlice } from "@reduxjs/toolkit";

export const ticketCartSlice = createSlice({
  name: "ticketCart",
  initialState: {
    tickets: {},
  },
  reducers: {
    addItem: (state, action) => {
      state.tickets[action.payload.id] = {
        ...state.tickets[action.payload.id],
        quantity: (state.tickets[action.payload.id]?.quantity || 0) + 1,
      };
    },
    removeItem: (state, action) => {
      if (state.tickets[action.payload.id]?.quantity > 1) {
        state.tickets[action.payload.id] = {
          ...state.tickets[action.payload.id],
          quantity: state.tickets[action.payload.id].quantity - 1,
        };
      } else {
        delete state.tickets[action.payload.id];
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem } = ticketCartSlice.actions;

export default ticketCartSlice.reducer;

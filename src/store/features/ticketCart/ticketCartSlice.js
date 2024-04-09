import { createSlice } from "@reduxjs/toolkit";

export const ticketCartSlice = createSlice({
  name: "ticketCart",
  initialState: {
    tickets: [],
  },
  reducers: {
    addTicket: (state, action) => {
      const ticket = state.tickets.find(
        (ticket) => ticket.id === action.payload.id
      );
      if (ticket) {
        ticket.quantity += 1;
      } else {
        state.tickets.push({ ...action.payload, quantity: 1 });
      }
    },
    removeTicket: (state, action) => {
      const index = state.tickets.findIndex(
        (ticket) => ticket.id === action.payload.id
      );
      if (index !== -1) {
        state.tickets[index].quantity -= 1;
        if (state.tickets[index].quantity === 0) {
          state.tickets.splice(index, 1);
        }
      }
    },
    removeAllTickets: (state, action) => {
      const index = state.tickets.findIndex(
        (ticket) => ticket.id === action.payload.id
      );
      if (index !== -1) {
        state.tickets.splice(index, 1);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTicket, removeTicket, removeAllTickets } =
  ticketCartSlice.actions;

export default ticketCartSlice.reducer;

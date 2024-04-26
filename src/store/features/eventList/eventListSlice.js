import { prisma } from "@/lib/database";
import { createSlice } from "@reduxjs/toolkit";

export const eventListSlice = createSlice({
  name: "eventList",
  initialState: {
    events: [],
    currentEvent: null,
    currentEventData: null,
  },
  reducers: {
    initializeState: (state, action) => {
      const newEventListState = action.payload.map((event) => ({
        id: event.id,
        eventName: event.eventName,
      }));
      return {
        ...state,
        events: newEventListState,
        currentEvent: newEventListState[0],
      };
    },
    setCurrentEvent: async (state, action) => {
      const index = state.events.findIndex(
        (event) => event.id === action.payload.id
      );

      return {
        ...state,
        currentEvent: state.events[index],
      };
    },
    setCurrentEventData: (state, action) => {
      return {
        ...state,
        currentEventData: action.payload,
      };
    },
    // addItem: (state, action) => {
    //   const index = state.tickets.findIndex(
    //     (ticket) => ticket.id === action.payload.id
    //   );

    //   let newCartItems = [...state.tickets];

    //   if (index !== -1) {
    //     newCartItems[index] = {
    //       ...newCartItems[index],
    //       quantity: newCartItems[index]?.quantity + 1 || 1,
    //     };
    //   } else {
    //     newCartItems.push({
    //       id: action.payload.id,
    //       stripeID: action.payload.stripeID,
    //       quantity: 1,
    //       price: action.payload.ticketPrice,
    //     });index].current
    //   }

    //   let newTotal = newCartItems.reduce((acc, currentItem) => {
    //     return acc + currentItem.price * currentItem.quantity;
    //   }, 0);

    //   return {
    //     ...state,
    //     tickets: newCartItems,
    //     totalPrice: Number(newTotal),
    //   };
    // },
    // removeItem: (state, action) => {
    //   const index = state.tickets.findIndex(
    //     (ticket) => ticket.id === action.payload.id
    //   );
    //   if (index !== -1) {
    //     if (state.tickets[index].quantity > 1) {
    //       state.tickets[index] = {
    //         ...state.tickets[index],
    //         quantity: state.tickets[index].quantity - 1,
    //       };
    //       state.totalPrice -= state.tickets[index].price;
    //     } else {
    //       state.totalPrice -= state.tickets[index].price;
    //       state.tickets.splice(index, 1);
    //     }
    //   }
    // },
  },
});

// Action creators are generated for each case reducer function
export const { initializeState, setCurrentEvent, setCurrentEventData } =
  eventListSlice.actions;

export default eventListSlice.reducer;

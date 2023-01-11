import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartItem, CreateSliceState } from "./types"
import { getCartFromLS } from "../../../utils/getCartFromLS"
import { calcTotalPrice } from "../../../utils/calcTotalPrice"

const initialState: CreateSliceState = getCartFromLS()

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }

      state.totalPrice = calcTotalPrice(state.items)
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload)
      if (findItem) {
        findItem.count--
      }
    },
    remuveItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})



export const { addItem, remuveItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer

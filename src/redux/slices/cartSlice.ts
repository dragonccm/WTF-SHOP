import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity?: number
  selectedOptions?: Record<string, any>
}

interface CartState {
  items: CartItem[]
  total: number
}

const initialState: CartState = {
  items: [],
  total: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload
      const existingItem = state.items.find(
        (i) => i.id === item.id && 
        JSON.stringify(i.selectedOptions) === JSON.stringify(item.selectedOptions)
      )

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1
      } else {
        state.items.push({ ...item, quantity: 1 })
      }

      state.total = calculateTotal(state.items)
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload)
      state.total = calculateTotal(state.items)
    },
    updateItemQuantity: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
      const { id, quantity } = action.payload
      if (quantity <= 0) {
        state.items = state.items.filter((i) => i.id !== id)
      } else {
        const item = state.items.find((i) => i.id === id)
        if (item) {
          item.quantity = quantity
        }
      }
      state.total = calculateTotal(state.items)
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
    },
  },
})

export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer

// Helper function to calculate total
function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    return total + (item.price * (item.quantity || 1))
  }, 0)
}
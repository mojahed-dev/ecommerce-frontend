import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const resetCart = (dispatch) => {
  dispatch({ type: 'RESET_CART' });
};


const initialState = {
  cartItems: [],
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
        };
        case 'UPDATE_CART':
            return {
                ...state,
                cartItems: action.payload.cartItems,
        };
        case 'REMOVE_FROM_CART':
          const updatedCartItems = state.cartItems.filter(item => item.productId !== action.payload.productId);
          return {
              ...state,
              cartItems: updatedCartItems,
        };
        case 'RESET_CART':
          return {
            ...state,
            cartItems: [],
        };

        // Add more cases for other actions (e.g., remove from cart, update quantity, etc.)
        default:
            return state;
    }
};


export const CartProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

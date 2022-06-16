import { RootState } from "../store";

export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find(obj => Number(obj.id) === Number(id));

export const selectCart = (state: RootState) => state.cart
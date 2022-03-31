import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice(
    {
        name: 'store',
        initialState: {
          isMainPage: true,
          statusPage: 0,
          selectedStore: "",
          selectedMenu: 0,
          selectedCategory: "",
        },
        reducers: {
            changeStatusPage: (state, action) => {
              state.statusPage = action.payload;
            },
            changeSelectedStore: (state, action) => {
              state.selectedStore = action.payload;
            },
            changeSelectedCategory: (state, action) => {
              state.selectedCategory = action.payload;
            },
            changeSelectedMenu: (state, action) => {
              state.selectedMenu = action.payload;
            },
            changeIsMainPage: (state, action) => {
              state.isMainPage = action.payload;
            },
        },
    }
);
export const {  changeStatusPage, changeSelectedStore, changeSelectedCategory, changeSelectedMenu, changeIsMainPage } = slice.actions;

export const storeStatusPage = state => state.store.statusPage;

export const storeSelectedStore = state => state.store.selectedStore;

export const storeSelectedCategory = state => state.store.selectedCategory;

export const storeSelectedMenu = state => state.store.selectedMenu;

export const storeIsMainPage = state => state.store.isMainPage;

export default slice.reducer;
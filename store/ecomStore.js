import { defineStore } from 'pinia';

export const useEcomStore = defineStore('ecomStore', {
    state: () => ({
        cartList: [],
        wishList: [],
        paymentMethods: []
    })
});

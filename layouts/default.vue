<script setup>
    import Cookies from 'js-cookie';
    import { useEcomStore } from '~/store/ecomStore';

    const store = useEcomStore();
    const token = Cookies.get('token');
    const { $axios } = useNuxtApp();
    const initialData = ref({
        categories: [],
        brandList: []
    });

    const getCategories = async () => {
        try {
            initialData.value.categories = [];
            const res = await $axios.get('/category-list');
            initialData.value.categories = res.data.categoryList;
        } catch (e) {
            initialData.value.categories = [];
            console.log(e);
        }
    };

    const getBrands = async () => {
        try {
            initialData.value.brandList = [];
            const res = await $axios.get('/brand-list');
            initialData.value.brandList = res.data.brandList;
        } catch (e) {
            initialData.value.brandList = [];
            console.log(e);
        }
    };

    const getCart = async () => {
        try {
            const res = await $axios.get('/get-cart-list');
            store.cartList = res.data.cartList || [];
        } catch (e) {
            console.log(e);
        }
    };

    const getWishList = async () => {
        try {
            const res = await $axios.get(`/get-wish-list`);
            store.wishList = res.data.wishList || [];
        } catch (e) {
            console.log(e);
        }
    };

    onMounted(() => {
        getCategories();
        getBrands();
        if (token) {
            getCart();
            getWishList();
        }
    });
</script>

<template>
    <FrontendHeader v-model:initial-data="initialData" />
    <slot />
    <FrontendNewsLetter />
    <FrontendFooter />
</template>

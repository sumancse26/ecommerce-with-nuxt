<script setup>
    const { $axios } = useNuxtApp();
    const initialData = ref({
        categories: [],
        brandList: [],
        cartList: []
    });

    onMounted(() => {
        getCategories();
        getBrands();
        getCarts();
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
            initialData.value.brandList.value = [];
            const res = await $axios.get('/brand-list');
            initialData.value.brandList = res.data.brandList;
        } catch (e) {
            initialData.value.brandList = [];
            console.log(e);
        }
    };
    const getCarts = async () => {
        try {
            initialData.value.cartList.value = [];
            const res = await $axios.get('/get-cart-list');
            initialData.value.cartList = res.data.cartList;
        } catch (e) {
            initialData.value.cartList = [];
            console.log(e);
        }
    };
</script>

<template>
    <FrontendHeader v-model:initial-data="initialData" />
    <slot />
    <FrontendFooter />
</template>

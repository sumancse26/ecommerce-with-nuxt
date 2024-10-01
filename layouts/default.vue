<script setup>
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

    onMounted(() => {
        getCategories();
        getBrands();
    });
</script>

<template>
    <FrontendHeader v-model:initial-data="initialData" />
    <slot />
    <FrontendFooter />
</template>

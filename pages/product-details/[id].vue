<script setup>
    const { $axios } = useNuxtApp();
    const route = useRoute();

    const id = route.params.id;
    const prodDtl = ref({});

    const getProdDtl = async (prodId) => {
        try {
            prodDtl.value = {};
            const res = await $axios.get(`/product-detail-by-id/${prodId}`);
            prodDtl.value = res.data.productDetails || {};
        } catch (e) {
            prodDtl.value = {};
            console.log(e);
        }
    };

    getProdDtl(id);
</script>

<template>
    <div>
        <div class="main_content">
            <FrontendProductDetails :product-details="prodDtl" />
            <FrontendNewsLetter />
        </div>

        <a href="#" class="scrollup" style="display: none"><i class="ion-ios-arrow-up"></i></a>
    </div>
</template>

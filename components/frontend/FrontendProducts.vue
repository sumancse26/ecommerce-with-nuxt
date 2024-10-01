<script setup>
    import { useEcomStore } from '~/store/ecomStore';
    const { $axios } = useNuxtApp();
    const props = defineProps({
        products: Array,
        tag: String
    });
    const store = useEcomStore();

    const addToCartHandler = async (product) => {
        try {
            const data = {
                id: null,
                product_id: product.id,
                color: '',
                size: '',
                qty: null
            };
            await $axios.post('/create-update-cart', data);
            getCart();
        } catch (e) {
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

    const addToWishList = async (product) => {
        try {
            await $axios.get(`/create-update-wish/${product.id}`);
            getWishList();
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

    const getProducts = computed(() => {
        return props.products || [];
    });

    const getTag = computed(() => {
        return props.tag || {};
    });
</script>

<template>
    <div class="section small_pt pb_70">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="heading_s1 text-center">
                        <h2 v-if="getTag.tagName == 'allProducts'">All Products</h2>
                        <h2 v-if="getTag.tagName == 'exclusiveProducts'">Exclusive Products</h2>
                    </div>
                </div>
                <h2 class="d-flex align-items-center" v-if="getTag.tagName == 'category'">
                    Category:
                    <p class="p-0 m-0 ps-2 mt-1">{{ getTag.tagValue }}</p>
                </h2>
                <h2 class="d-flex align-items-center" v-if="getTag.tagName == 'brand'">
                    Brand:
                    <p class="p-0 m-0 ps-2 mt-1">{{ getTag.tagValue }}</p>
                </h2>
            </div>
            <div class="row">
                <div class="col-12">
                    <div v-if="getTag == 'exclusiveProducts'" class="tab-style1">
                        <ul class="nav nav-tabs justify-content-center" role="tablist">
                            <li class="nav-item">
                                <a
                                    class="nav-link active"
                                    id="arrival-tab"
                                    data-bs-toggle="tab"
                                    href="#arrival"
                                    role="tab"
                                    aria-controls="arrival"
                                    aria-selected="true"
                                    >New Arrival</a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link"
                                    id="sellers-tab"
                                    data-bs-toggle="tab"
                                    href="#sellers"
                                    role="tab"
                                    aria-controls="sellers"
                                    aria-selected="false"
                                    >Best Sellers</a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link"
                                    id="featured-tab"
                                    data-bs-toggle="tab"
                                    href="#featured"
                                    role="tab"
                                    aria-controls="featured"
                                    aria-selected="false"
                                    >Featured</a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link"
                                    id="special-tab"
                                    data-bs-toggle="tab"
                                    href="#special"
                                    role="tab"
                                    aria-controls="special"
                                    aria-selected="false"
                                    >Special Offer
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-content">
                        <div
                            class="tab-pane fade show active"
                            id="arrival"
                            role="tabpanel"
                            aria-labelledby="arrival-tab">
                            <div class="row shop_container">
                                <div v-for="product in getProducts" :key="product.id" class="col-lg-3 col-md-4 col-6">
                                    <div class="product">
                                        <div class="product_img">
                                            <a href="shop-product-detail.html">
                                                <img :src="product.image" alt="product_img1" />
                                            </a>
                                            <div class="product_action_box">
                                                <ul class="list_none pr_action_btn">
                                                    <li class="add-to-cart" @click="addToCartHandler(product)">
                                                        <NuxtLink
                                                            ><i class="icon-basket-loaded"></i> Add To Cart</NuxtLink
                                                        >
                                                    </li>
                                                    <li @click="addToWishList(product)">
                                                        <NuxtLink><i class="icon-heart"></i></NuxtLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="product_info">
                                            <h6 class="product_title">
                                                <NuxtLink :to="`product-details/${product.id}`">{{
                                                    product.title
                                                }}</NuxtLink>
                                            </h6>
                                            <div class="product_price">
                                                <span class="price">${{ product.price }}</span>
                                                <div class="on_sale ps-2">
                                                    <span>{{ product.discount }}% Off</span>
                                                </div>
                                            </div>
                                            <div class="rating_wrap">
                                                <div class="rating">
                                                    <div class="product_rate" style="width: 80%"></div>
                                                </div>
                                                <span class="rating_num">({{ product.star }})</span>
                                            </div>
                                            <div class="pr_switch_wrap">
                                                <div class="product_color_switch">
                                                    <span class="active" data-color="#87554B"></span>
                                                    <span data-color="#333333"></span>
                                                    <span data-color="#DA323F"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

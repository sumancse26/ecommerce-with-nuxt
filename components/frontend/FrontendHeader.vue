<script setup>
    import Cookies from 'js-cookie';
    import { useEcomStore } from '@/store/ecomStore';

    const { $axios } = useNuxtApp();
    const initialData = defineModel('initialData', { type: Object });
    const token = Cookies.get('token');
    const store = useEcomStore();

    const logoutBtnHandler = async () => {
        try {
            await $axios.get('/logout');
            Cookies.remove('token');
            navigateTo('/login');
        } catch (e) {
            console.log(e);
        }
    };

    const removeCardHandler = async (id) => {
        try {
            await $axios.delete(`/remove-cart/${id}`);
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

    const cartList = computed(() => {
        return store.cartList;
    });

    const wishList = computed(() => {
        return store.wishList;
    });

    const subTotal = computed(() => {
        return cartList.value.reduce((total, item) => {
            return total + Number(item.price);
        }, 0);
    });

    const categories = computed(() => {
        return initialData.value.categories;
    });

    const brandList = computed(() => {
        return initialData.value.brandList;
    });
</script>

<template>
    <header class="header_wrap fixed-top header_with_topbar">
        <div class="top-header">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="d-flex align-items-center justify-content-center justify-content-md-start">
                            <ul class="contact_detail text-center text-lg-start">
                                <li><i class="ti-mobile"></i><span>+88 01796 844 288</span></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="text-center text-md-end">
                            <ul class="header_list">
                                <li>
                                    <NuxtLink to="/wish-list"
                                        ><i class="ti-heart"></i
                                        ><span
                                            >Wishlist(<span class="text-danger">{{ wishList.length || 0 }}</span
                                            >)</span
                                        ></NuxtLink
                                    >
                                </li>
                                <li>
                                    <NuxtLink v-if="!token" to="/login"
                                        ><i class="ti-user"></i><span>Login </span></NuxtLink
                                    >
                                    <NuxtLink v-else @click="logoutBtnHandler" class="cursor-pointer"
                                        ><i class="ti-user"></i><span>Logout </span></NuxtLink
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom_header dark_skin main_menu_uppercase">
            <div class="container">
                <nav class="navbar navbar-expand-lg">
                    <NuxtLink to="/" class="navbar-brand">
                        <img class="logo_light" src="/assets/images/logo_light.png" alt="logo" />
                        <img class="logo_dark" src="/assets/images/logo_dark.png" alt="logo" />
                    </NuxtLink>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-expanded="false">
                        <span class="ion-android-menu"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul class="navbar-nav">
                            <li class="dropdown">
                                <NuxtLink class="nav-link active" to="/">Home</NuxtLink>
                            </li>
                            <li class="dropdown">
                                <a class="dropdown-toggle nav-link" data-bs-toggle="dropdown">Categories</a>
                                <div class="dropdown-menu">
                                    <ul>
                                        <li v-for="category in categories" :key="category.id">
                                            <NuxtLink
                                                :to="{
                                                    name: 'category-id',
                                                    params: { id: category.id },
                                                    query: { name: category.categoryName }
                                                }"
                                                class="dropdown-item nav-link nav_item"
                                                >{{ category.categoryName }}</NuxtLink
                                            >
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="dropdown">
                                <a class="dropdown-toggle nav-link" data-bs-toggle="dropdown">Brands</a>
                                <div class="dropdown-menu">
                                    <ul>
                                        <li v-for="brand in brandList" :key="brand.id">
                                            <NuxtLink
                                                :to="{
                                                    name: 'brand-id',
                                                    params: { id: brand.id },
                                                    query: { name: brand.brandName }
                                                }"
                                                class="dropdown-item nav-link nav_item"
                                                >{{ brand.brandName }}</NuxtLink
                                            >
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <ul class="navbar-nav attr-nav align-items-center">
                        <li>
                            <a href="javascript:;" class="nav-link search_trigger"
                                ><i class="linearicons-magnifier"></i
                            ></a>
                            <div class="search_wrap">
                                <span class="close-search"><i class="ion-ios-close-empty"></i></span>
                                <form>
                                    <input type="text" placeholder="Search" class="form-control" id="search_input" />
                                    <button type="submit" class="search_icon">
                                        <i class="ion-ios-search-strong"></i>
                                    </button>
                                </form>
                            </div>
                            <div class="search_overlay"></div>
                        </li>
                        <li class="dropdown cart_dropdown">
                            <a class="nav-link cart_trigger" data-bs-toggle="dropdown"
                                ><i class="linearicons-cart"></i
                                ><span class="cart_count">{{ cartList?.length || 0 }}</span></a
                            >
                            <div class="cart_box dropdown-menu dropdown-menu-right">
                                <ul class="cart_list">
                                    <li v-for="cart in cartList" :key="cart.id">
                                        <a @click="removeCardHandler(cart.id)" class="item_remove"
                                            ><i class="ion-close"></i
                                        ></a>
                                        <a href="#"
                                            ><img :src="cart.product?.image" alt="cart_thumb1" />{{
                                                cart.product?.title
                                            }}</a
                                        >
                                        <span class="cart_quantity">
                                            {{ cart.qty }} x
                                            <span class="cart_amount"> <span class="price_symbole">$ </span></span
                                            >{{ cart.product?.price }}</span
                                        >
                                    </li>
                                </ul>
                                <div class="cart_footer">
                                    <p class="cart_total">
                                        <strong>Subtotal:</strong>
                                        <span class="cart_price"> <span class="price_symbole">$</span></span
                                        >{{ subTotal }}
                                    </p>
                                    <p class="cart_buttons">
                                        <NuxtLink to="/product-cart" class="btn btn-fill-line rounded-0 view-cart"
                                            >View Cart</NuxtLink
                                        >
                                        <a href="#" class="btn btn-fill-out rounded-0 checkout">Checkout</a>
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</template>

<style lang="css" scoped>
    .cursor-pointer {
        cursor: pointer;
    }
</style>

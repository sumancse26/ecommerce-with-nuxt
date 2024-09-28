<script setup>
    const { $axios } = useNuxtApp();

    const categories = ref([]);
    const brandList = ref([]);

    const getCategories = async () => {
        try {
            categories.value = [];
            const res = await $axios.get('/category-list');
            categories.value = res.data.categoryList;
        } catch (e) {
            categories.value = [];
            console.log(e);
        }
    };

    const getBrands = async () => {
        try {
            brandList.value = [];
            const res = await $axios.get('/brand-list');
            brandList.value = res.data.brandList;
        } catch (e) {
            brandList.value = [];
            console.log(e);
        }
    };

    onMounted(() => {
        getCategories();
        getBrands();
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
                                    <a href="wishlist.html"><i class="ti-heart"></i><span>Wishlist</span></a>
                                </li>
                                <li>
                                    <NuxtLink to="/verify"><i class="ti-user"></i><span>Login</span></NuxtLink>
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
                    <a class="navbar-brand" href="index.html">
                        <img class="logo_light" src="../../public/assets/images/logo_light.png" alt="logo" />
                        <img class="logo_dark" src="../../public/assets/images/logo_dark.png" alt="logo" />
                    </a>
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
                                <a class="dropdown-toggle nav-link" href="#" data-bs-toggle="dropdown">Categories</a>
                                <div class="dropdown-menu">
                                    <ul>
                                        <li v-for="category in categories" :key="category.id">
                                            <a class="dropdown-item nav-link nav_item" href="about.html">{{
                                                category.categoryName
                                            }}</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="dropdown">
                                <a class="dropdown-toggle nav-link" href="#" data-bs-toggle="dropdown">Brands</a>
                                <div class="dropdown-menu">
                                    <ul>
                                        <li v-for="brand in brandList" :key="brand.id">
                                            <a class="dropdown-item nav-link nav_item" href="about.html">{{
                                                brand.brandName
                                            }}</a>
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
                            <a class="nav-link cart_trigger" href="#" data-bs-toggle="dropdown"
                                ><i class="linearicons-cart"></i><span class="cart_count">2</span></a
                            >
                            <div class="cart_box dropdown-menu dropdown-menu-right">
                                <ul class="cart_list">
                                    <li>
                                        <a href="#" class="item_remove"><i class="ion-close"></i></a>
                                        <a href="#"
                                            ><img
                                                src="../../public/assets/images/cart_thamb1.jpg"
                                                alt="cart_thumb1" />Variable product 001</a
                                        >
                                        <span class="cart_quantity">
                                            1 x
                                            <span class="cart_amount"> <span class="price_symbole">$</span></span
                                            >78.00</span
                                        >
                                    </li>
                                    <li>
                                        <a href="#" class="item_remove"><i class="ion-close"></i></a>
                                        <a href="#"
                                            ><img
                                                src="../../public/assets/images/cart_thamb2.jpg"
                                                alt="cart_thumb2" />Ornare sed consequat</a
                                        >
                                        <span class="cart_quantity">
                                            1 x
                                            <span class="cart_amount"> <span class="price_symbole">$</span></span
                                            >81.00</span
                                        >
                                    </li>
                                </ul>
                                <div class="cart_footer">
                                    <p class="cart_total">
                                        <strong>Subtotal:</strong>
                                        <span class="cart_price"> <span class="price_symbole">$</span></span
                                        >159.00
                                    </p>
                                    <p class="cart_buttons">
                                        <a href="#" class="btn btn-fill-line rounded-0 view-cart">View Cart</a
                                        ><a href="#" class="btn btn-fill-out rounded-0 checkout">Checkout</a>
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

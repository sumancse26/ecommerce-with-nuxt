<script setup>
    import { useEcomStore } from '~/store/ecomStore';

    const props = defineProps({
        productDetails: Object
    });

    const store = useEcomStore();
    const { $axios } = useNuxtApp();
    const qty = ref(1);

    const addToWishListHandler = async (product) => {
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

    const addToCartHandler = async (product) => {
        try {
            const data = {
                id: null,
                product_id: product.id,
                color: '',
                size: product.userSize || '',
                qty: qty.value
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

    const detailInfo = computed(() => {
        return props.productDetails || {};
    });
</script>

<template>
    <div class="breadcrumb_section bg_gray page-title-mini">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <div class="page-title">
                        <h3>Product Detail</h3>
                    </div>
                </div>
                <div class="col-md-6">
                    <ol class="breadcrumb justify-content-md-end">
                        <li class="breadcrumb-item"><NuxtLink to="/">Home</NuxtLink></li>
                        <li class="breadcrumb-item active">Product Detail</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>

    <div class="main_content">
        <div class="section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-6 mb-4 mb-md-0">
                        <div class="product-image">
                            <div class="product_img_box">
                                <img id="product_img" :src="detailInfo.img1" alt="product_img1" />
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <div class="pr_detail">
                            <div class="product_description">
                                <h4 class="product_title">
                                    <a href="#">{{ detailInfo.product?.title }}</a>
                                </h4>
                                <div class="product_price">
                                    <span class="price">${{ detailInfo.product?.price }}</span>
                                    <div class="on_sale">
                                        <span class="ps-2">{{ detailInfo.product?.discount }}% Off</span>
                                    </div>
                                </div>
                                <div class="rating_wrap">
                                    <div class="rating">
                                        <div class="product_rate"></div>
                                    </div>
                                    <span class="rating_num">({{ detailInfo.product?.star }})</span>
                                </div>
                                <div class="pr_desc">
                                    <p>
                                        {{ detailInfo.product?.short_des }}
                                    </p>
                                </div>
                                <div class="product_sort_info">
                                    <ul>
                                        <li>
                                            <i class="linearicons-shield-check"></i> 1 Year AL Jazeera Brand Warranty
                                        </li>
                                        <li><i class="linearicons-sync"></i> 30 Day Return Policy</li>
                                        <li><i class="linearicons-bag-dollar"></i> Cash on Delivery available</li>
                                    </ul>
                                </div>
                                <div class="pr_switch_wrap">
                                    <span class="switch_lable">Color</span>
                                    <div class="product_color_switch">
                                        <span class="active" data-color="#87554B"></span>
                                        <span data-color="#333333"></span>
                                        <span data-color="#DA323F"></span>
                                    </div>
                                </div>
                                <div class="pr_switch_wrap">
                                    <span class="switch_lable">Size</span>
                                    <div class="product_size_switch">
                                        <span
                                            v-for="(size, indx) in detailInfo.size?.split(',')"
                                            :key="indx"
                                            @click="detailInfo.userSize = size"
                                            :class="detailInfo.userSize === size ? 'active' : ''"
                                            >{{ size }}</span
                                        >
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div class="cart_extra">
                                <div class="cart-product-quantity">
                                    <div class="quantity">
                                        <input
                                            @click="qty > 1 ? qty-- : (qty = 1)"
                                            type="button"
                                            value="-"
                                            class="minus" />
                                        <input
                                            v-model="qty"
                                            type="number"
                                            name="quantity"
                                            title="Qty"
                                            class="qty"
                                            size="4" />
                                        <input @click="qty++" type="button" value="+" class="plus" />
                                    </div>
                                </div>
                                <div class="cart_btn">
                                    <button
                                        class="btn btn-fill-out btn-addtocart"
                                        type="button"
                                        @click="addToCartHandler(detailInfo.product)">
                                        <i class="icon-basket-loaded"></i> Add to cart
                                    </button>
                                    <a class="add_wishlist" @click="addToWishListHandler(detailInfo.product)">
                                        <i class="icon-heart"></i>
                                    </a>
                                </div>
                            </div>
                            <hr />
                            <ul class="product-meta">
                                <li>
                                    Brand: <a href="#">{{ detailInfo.product?.brand?.brandName }}</a>
                                </li>
                                <li>
                                    Category: <a href="#">{{ detailInfo.product?.category?.categoryName }}</a>
                                </li>
                            </ul>

                            <div class="product_share">
                                <span>Share:</span>
                                <ul class="social_icons">
                                    <li>
                                        <a href="#"><i class="ion-social-facebook"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i class="ion-social-twitter"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i class="ion-social-googleplus"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i class="ion-social-youtube-outline"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i class="ion-social-instagram-outline"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="large_divider clearfix"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="tab-style3">
                            <ul class="nav nav-tabs" role="tablist">
                                <li class="nav-item">
                                    <a
                                        class="nav-link active"
                                        id="Description-tab"
                                        data-bs-toggle="tab"
                                        href="#Description"
                                        role="tab"
                                        aria-controls="Description"
                                        aria-selected="true"
                                        >Description</a
                                    >
                                </li>
                                <li class="nav-item">
                                    <a
                                        class="nav-link"
                                        id="Additional-info-tab"
                                        data-bs-toggle="tab"
                                        href="#Additional-info"
                                        role="tab"
                                        aria-controls="Additional-info"
                                        aria-selected="false"
                                        >Additional info</a
                                    >
                                </li>
                                <li class="nav-item">
                                    <a
                                        class="nav-link"
                                        id="Reviews-tab"
                                        data-bs-toggle="tab"
                                        href="#Reviews"
                                        role="tab"
                                        aria-controls="Reviews"
                                        aria-selected="false"
                                        >Reviews (2)</a
                                    >
                                </li>
                            </ul>
                            <div class="tab-content shop_info_tab">
                                <div
                                    class="tab-pane fade show active"
                                    id="Description"
                                    role="tabpanel"
                                    aria-labelledby="Description-tab">
                                    <p>
                                        {{ detailInfo.des }}
                                    </p>
                                </div>
                                <div
                                    class="tab-pane fade"
                                    id="Additional-info"
                                    role="tabpanel"
                                    aria-labelledby="Additional-info-tab">
                                    <table class="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>Color</td>
                                                <td>{{ detailInfo.color }}</td>
                                            </tr>
                                            <tr>
                                                <td>Water Resistant</td>
                                                <td>Yes</td>
                                            </tr>
                                            <tr>
                                                <td>Size</td>
                                                <td>{{ detailInfo.size }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane fade" id="Reviews" role="tabpanel" aria-labelledby="Reviews-tab">
                                    <div class="comments">
                                        <h5 class="product_tab_title">
                                            2 Review For <span>Blue Dress For Woman</span>
                                        </h5>
                                        <ul class="list_none comment_list mt-4">
                                            <li>
                                                <div class="comment_img">
                                                    <img src="/assets/images/user1.jpg" alt="user1" />
                                                </div>
                                                <div class="comment_block">
                                                    <div class="rating_wrap">
                                                        <div class="rating">
                                                            <div class="product_rate" style="width: 80%"></div>
                                                        </div>
                                                    </div>
                                                    <p class="customer_meta">
                                                        <span class="review_author">Alea Brooks</span>
                                                        <span class="comment-date">March 5, 2018</span>
                                                    </p>
                                                    <div class="description">
                                                        <p>
                                                            Lorem Ipsumin gravida nibh vel velit auctor aliquet. Aenean
                                                            sollicitudin, lorem quis bibendum auctor, nisi elit
                                                            consequat ipsum, nec sagittis sem nibh id elit. Duis sed
                                                            odio sit amet nibh vulputate
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="comment_img">
                                                    <img src="/assets/images/user2.jpg" alt="user2" />
                                                </div>
                                                <div class="comment_block">
                                                    <div class="rating_wrap">
                                                        <div class="rating">
                                                            <div class="product_rate" style="width: 60%"></div>
                                                        </div>
                                                    </div>
                                                    <p class="customer_meta">
                                                        <span class="review_author">Grace Wong</span>
                                                        <span class="comment-date">June 17, 2018</span>
                                                    </p>
                                                    <div class="description">
                                                        <p>
                                                            It is a long established fact that a reader will be
                                                            distracted by the readable content of a page when looking at
                                                            its layout. The point of using Lorem Ipsum is that it has a
                                                            more-or-less normal distribution of letters
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="review_form field_form">
                                        <h5>Add a review</h5>
                                        <form class="row mt-3">
                                            <div class="form-group col-12 mb-3">
                                                <div class="star_rating">
                                                    <span data-value="1"><i class="far fa-star"></i></span>
                                                    <span data-value="2"><i class="far fa-star"></i></span>
                                                    <span data-value="3"><i class="far fa-star"></i></span>
                                                    <span data-value="4"><i class="far fa-star"></i></span>
                                                    <span data-value="5"><i class="far fa-star"></i></span>
                                                </div>
                                            </div>
                                            <div class="form-group col-12 mb-3">
                                                <textarea
                                                    required="required"
                                                    placeholder="Your review *"
                                                    class="form-control"
                                                    name="message"
                                                    rows="4"></textarea>
                                            </div>
                                            <div class="form-group col-md-6 mb-3">
                                                <input
                                                    required="required"
                                                    placeholder="Enter Name *"
                                                    class="form-control"
                                                    name="name"
                                                    type="text" />
                                            </div>
                                            <div class="form-group col-md-6 mb-3">
                                                <input
                                                    required="required"
                                                    placeholder="Enter Email *"
                                                    class="form-control"
                                                    name="email"
                                                    type="email" />
                                            </div>

                                            <div class="form-group col-12 mb-3">
                                                <button
                                                    type="submit"
                                                    class="btn btn-fill-out"
                                                    name="submit"
                                                    value="Submit">
                                                    Submit Review
                                                </button>
                                            </div>
                                        </form>
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

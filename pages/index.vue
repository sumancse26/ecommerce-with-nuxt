<template>
    <div>
        <!-- LOADER -->
        <!-- <div class="preloader d-none">
            <div class="lds-ellipsis">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div> -->
        <!-- END LOADER -->

        <!-- Home Popup Section -->
        <div class="modal fade subscribe_popup" id="onload-popup" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i class="ion-ios-close-empty"></i></span>
                        </button>
                        <div class="row g-0">
                            <div class="col-sm-5">
                                <img class="background_bg h-100" src="/assets/images/popup_img.jpg" />
                            </div>
                            <div class="col-sm-7">
                                <div class="popup_content">
                                    <div class="popup-text">
                                        <div class="heading_s1">
                                            <h4>Subscribe and Get 25% Discount!</h4>
                                        </div>
                                        <p>Subscribe to the newsletter to receive updates about new products.</p>
                                    </div>
                                    <form method="post">
                                        <div class="form-group mb-3">
                                            <input
                                                name="email"
                                                required
                                                type="email"
                                                class="form-control rounded-0"
                                                placeholder="Enter Your Email" />
                                        </div>
                                        <div class="form-group mb-3">
                                            <button
                                                class="btn btn-fill-line btn-block text-uppercase rounded-0"
                                                title="Subscribe"
                                                type="submit">
                                                Subscribe
                                            </button>
                                        </div>
                                    </form>
                                    <div class="chek-form">
                                        <div class="custome-checkbox">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="checkbox"
                                                id="exampleCheckbox3"
                                                value="" />
                                            <label class="form-check-label" for="exampleCheckbox3"
                                                ><span>Don't show this popup again!</span></label
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Screen Load Popup Section -->

        <!-- START HEADER -->
        <header class="header_wrap fixed-top header_with_topbar">
            <HeaderTopHeader />
            <HeaderMenubar />
        </header>
        <!-- END HEADER -->

        <!-- START SECTION BANNER -->
        <Banner />
        <!-- END SECTION BANNER -->

        <!-- END MAIN CONTENT -->
        <div class="main_content">
            <!-- START SECTION BANNER -->
            <NewCollection />
            <!-- END SECTION BANNER -->

            <!-- START SECTION SHOP -->
            <ExclusiveProducts />
            <!-- END SECTION SHOP -->

            <!-- START SECTION SINGLE BANNER -->
            <BannerSingleBanner />
            <!-- END SECTION SINGLE BANNER -->

            <!-- START SECTION SHOP -->
            <FeaturedProducts />
            <!-- END SECTION SHOP -->

            <!-- START SECTION TESTIMONIAL -->
            <ClientOpinion />
            <!-- END SECTION TESTIMONIAL -->

            <!-- START SECTION SHOP INFO -->
            <PolicyCompanyPolicy />
            <!-- END SECTION SHOP INFO -->

            <!-- START SECTION SUBSCRIBE NEWSLETTER -->
            <LazyNewsletter />
            <!-- START SECTION SUBSCRIBE NEWSLETTER -->
        </div>
        <!-- END MAIN CONTENT -->

        <!-- START FOOTER -->
        <Footer />
        <!-- END FOOTER -->

        <a href="#" class="scrollup" style="display: none"><i class="ion-ios-arrow-up"></i></a>
    </div>
</template>

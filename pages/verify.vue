<script setup>
    import Cookies from 'js-cookie';
    import { useRoute } from 'vue-router';
    import { navigateTo } from 'nuxt/app';
    const { $axios } = useNuxtApp();

    const route = useRoute();
    const email = ref(route.query.email);
    const otp = ref('');

    const verifyBtnHandler = async () => {
        try {
            const data = {
                email: email.value,
                otp: otp.value
            };
            const res = await $axios.post('/verify', data);

            Cookies.set('token', res.data.token, { expires: 7 });
            navigateTo('/');
        } catch (e) {
            console.log(e);
        }
    };
</script>

<template>
    <div class="login_register_wrap section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-6 col-md-10">
                    <div class="login_wrap">
                        <div class="padding_eight_all bg-white">
                            <div class="heading_s1">
                                <h3>Verify Otp</h3>
                            </div>
                            <form @submit.prevent="verifyBtnHandler">
                                <div class="form-group mb-3">
                                    <input
                                        v-model="email"
                                        type="text"
                                        required
                                        disabled
                                        class="form-control"
                                        name="email" />
                                </div>
                                <div class="form-group mb-3">
                                    <input
                                        v-model="otp"
                                        class="form-control"
                                        required
                                        type="text"
                                        name="password"
                                        placeholder="otp" />
                                </div>
                                <div class="form-group mb-3">
                                    <button type="submit" class="btn btn-fill-out btn-block" name="login">
                                        CONFIRM
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

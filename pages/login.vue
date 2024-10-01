<script setup>
    import { navigateTo } from 'nuxt/app';
    const { $axios } = useNuxtApp();
    const email = ref('');
    const isRequired = ref(false);
    const sendOtp = async () => {
        if (!email.value) {
            isRequired.value = true;
            return;
        }
        isRequired.value = false;
        const params = {
            email: email.value
        };
        const res = await $axios.get('/login', { params });

        if (res.data.success) {
            navigateTo({ path: '/verify', query: { email: email.value } });
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
                                <h3>Login</h3>
                            </div>
                            <form @submit.prevent="sendOtp">
                                <div class="form-group mb-3">
                                    <input
                                        v-model.trim="email"
                                        type="email"
                                        class="form-control"
                                        name="email"
                                        :class="{ 'is-invalid': !email && isRequired }"
                                        placeholder="Your Email" />
                                </div>
                                <div class="form-group mb-3">
                                    <button type="submit" class="btn btn-fill-out btn-block" name="login">NEXT</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

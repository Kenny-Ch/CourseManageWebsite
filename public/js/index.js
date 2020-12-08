var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        formData:{
            email: '',
            password: ''
        }
    },
    methods: {
        logout() {
            console.log("ok");
            $.removeCookie('name');
        }
    }
});
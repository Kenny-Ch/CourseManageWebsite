var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        formData: {
            name: '',
            email: '',
            password: ''
        },
        password2: ''
    },
    methods: {
        onSubmit(event) {
            if (this.formData.password == this.password2) {
                event.preventDefault();
                console.log(this.formData.username)
                let formData = JSON.stringify(this.formData);
                console.log(formData);
                var that = this;
                this.$http.post('/user/register', this.formData, { emulateJSON: true }).then(function (res) {
                    if (res.status === 200) {
                        if (res.body.code == 200) {
                            window.location.replace("/login.html")
                        } else {
                            console.log(res)
                        }

                    }
                    else {
                        console.log("err!")
                    }
                })
            }

        }
    }
});
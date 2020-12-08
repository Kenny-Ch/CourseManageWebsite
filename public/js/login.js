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
        onSubmit(event) {
            event.preventDefault();
            console.log(this.formData.username)
            let formData = JSON.stringify(this.formData);
            console.log(formData);
            this.$http.post('/user/login',this.formData,{emulateJSON:true}).then(function (res) {
                if (res.status === 200) {
                    if(res.body.code==200){
                        console.log(res.body.msg)
                    }else{
                        console.log(res)
                    }
                    
                }
                else {
                    console.log("err!")
                }
            })
        }
    }
});
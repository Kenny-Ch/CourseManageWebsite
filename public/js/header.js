var header = new Vue({
    el: '#header',
    data: {
        message: 'Hello Vue!',
        word: "",
        name: "",
        email: ""
    },
    created() {
        this.$http.get('/user/perInfo').then(function (res) {
            if (res.body.code == 200) {
                console.log(res.body)
                this.name = res.body.perInfo.name
                this.email = res.body.perInfo.email
            }else if(res.body.code==401){
                window.location.replace("../login.html") 
            }


        })
    },
    methods: {
        search() {
            console.log(this.word)
            window.location.href = '/search.html?key=' + this.word
        }
    }
})
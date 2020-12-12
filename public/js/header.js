var header=new Vue({
    el: '#header',
    data: {
        message: 'Hello Vue!',
        word:""
    },
    created(){
        this.$http.get('/user/perInfo').then(function(res){
            console.log(res.body)
            
        })
    },
    methods:{
        search(){
            console.log(this.word)
            window.location.href='/search.html?key='+this.word
        }
    }
})
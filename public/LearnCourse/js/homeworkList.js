var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        homeworkList:[]
        
    },
    created(){
        console.log("test")
        this.$http.get('/course/homeworkList?courseID=1').then(function(res){
            console.log(res.body.homeworkList)
            this.homeworkList=res.body.homeworkList
        })
    },
    methods: {
        
        
    }
});
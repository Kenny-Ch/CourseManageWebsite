var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        params:{},
    },
    created(){
        this.params=getUrlkey(window.location.href)
        this.$http.get('/index/search?courseName='+this.params.key).then(function(res){
            console.log(res.body)
        })
    },
    methods: {
        
    }
});

function getUrlkey(url) {
    var params = {};
    var urls = url.split("?");                  
    var arr = urls[1].split("&");               
    for (var i = 0, l = arr.length; i < l; i++) {
      var a = arr[i].split("=");                
      params[a[0]] = a[1];                      
    }                                           
    return params;
}
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        CreCouData:{
            name: '',
            url: '',
            content: '',
            file:[]
        },
        courseList:[]
    },
    created(){
        this.$http.get('/index/mycourses').then(function(res){
            console.log(res.body.courseList)
            this.courseList=res.body.courseList;
        })
    },
    methods: {
        CreateCou(){
            console.log(this.CreCouData.file)
            var formData = new FormData();
            formData.append('cname', this.CreCouData.name);
            // formData.append('url',this.CreCouData.url);
            // formData.append('content',this.CreCouData.content);
            formData.append('file',this.CreCouData.file[0]);
            var config = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': this.token
                }
              };
            this.$http.post('/course/createCourse',formData,config).then(function (res) {
                if (res.status === 200) {
                    if (res.body.code == 200) {
                        console.log(res)
                    } else {
                        console.log(res)
                    }

                }
                else {
                    console.log("err!")
                }
            })
        },
        getFile(event){
            var file = event.target.files;
            console.log(event.target.files)
            this.CreCouData.file=event.target.files;
        },
        
    }
});
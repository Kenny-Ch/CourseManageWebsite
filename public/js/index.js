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
        allCourse:[],
        createCourse:[],
        joinCourse:[],
        ifAllCourse:false,
        ifCreateCourse:false,
        ifJoinCours:false,
        allCourseNum:0,
        createCourseNum:0,
        joinCourseNum:0
    },
    created(){
        this.$http.get('/index/mycourses').then(function(res){
            console.log(res.body)
            this.allCourse=res.body.allCourse;
            this.createCourse=res.body.createCourse;
            this.joinCourse=res.body.joinCourse;
            if(this.allCourse.length>0){
                this.ifAllCourse=true
                this.allCourseNum=this.allCourse.length
            }else{
                this.ifAllCourse=false
            }
            if(this.createCourse.length>0){
                this.ifCreateCourse=true
                this.createCourseNum=this.createCourse.length
            }else{
                this.ifCreateCourse=false
            }
            if(this.joinCourse.length>0){
                this.ifJoinCours=true
                this.joinCourseNum=this.joinCourse.length
            }else{
                this.ifJoinCours=false
            }
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
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
        joinCourseNum:0,
        allHomeworkList:[],
        doneList:[],
        unfinishList:[],
        homeworkList:[]
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
        }),
        this.$http.get('/course/myOrderHomeworkList').then(function(res){
            console.log(res.body)
            this.allHomeworkList=res.body.allHomeworkList;
            for(var i=0;i<this.allHomeworkList.length;i++){
                let date = new Date(this.allHomeworkList[i].ddl); 
                console.log(typeof(date))
                let date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                this.allHomeworkList[i].date=date_value;
            }

            this.doneList=res.body.doneList;
            for(var i=0;i<this.doneList.length;i++){
                let date = new Date(this.doneList[i].ddl); 
                console.log(typeof(date))
                let date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                this.doneList[i].date=date_value;
            }

            this.unfinishList=res.body.unfinishList;
            for(var i=0;i<this.unfinishList.length;i++){
                let date = new Date(this.unfinishList[i].ddl); 
                console.log(typeof(date))
                let date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                this.unfinishList[i].date=date_value;
            }

            this.homeworkList=this.allHomeworkList;
            
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
        changeToFinish(){
            this.homeworkList=this.doneList;
        },
        changeToUnFinish(){
            this.homeworkList=this.unfinishList
        },
        changeToAll(){
            this.homeworkList=this.allHomeworkList
        }
        
    }
});
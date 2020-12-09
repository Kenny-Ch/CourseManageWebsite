var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        CreCouData:{
            name: '',
            url: '',
            content: '',
            file:[]
        }
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
            // for(var i = 0;i<file.length;i++){
            //  //    上传类型判断
            //     var imgName = file[i].name;
            //      var idx = imgName.lastIndexOf(".");  
            //      if (idx != -1){
            //          var ext = imgName.substr(idx+1).toUpperCase();   
            //          ext = ext.toLowerCase( ); 
            //           if (ext!='pdf' && ext!='doc' && ext!='docx'){
                        
            //          }else{
            //                this.addArr.push(file[i]);
            //          }   
            //      }else{
 
            //      }
            // }
            console.log(event.target.files)
            // this.CreCouData.file=[1];
            this.CreCouData.file=event.target.files;
        },
    }
});
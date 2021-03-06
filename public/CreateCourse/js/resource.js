var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        resourceList:{},
        resourceFile:[],
        params:{}
        
    },
    created(){
        console.log(getUrlkey(window.location.href))
        this.params=getUrlkey(window.location.href)
        this.$http.get('/course/resourceList?courseID='+this.params.courseID).then(function(res){
            console.log(res)
            if(res.body.code==200){
                this.resourceList=res.body.resourceList
                for(var i=0;i<this.resourceList.length;i++){
                    this.resourceList[i].uploadTime=getDate(this.resourceList[i].uploadTime)
                }
            }else if(res.body.code==401){
                window.location.replace("../login.html") 
            }
            for(var i=0;i<this.resourceList.length;i++){
                let resource=this.resourceList[i]
                // var head=resource.fileUrl.indexOf('/')
                // var end=resource.fileUrl.length
                // let url=resource.fileUrl.substring(head,end)
                this.resourceList[i]['url']='http://'+window.location.host+"/"+resource.fileUrl
            }
            console.log(this.resourceList)
        })
        
    },
    methods: {
        openAnnouncement(){
            window.location.href='/CreateCourse/announcement.html?courseID='+this.params.courseID
        },
        openResource(){
            window.location.href='/CreateCourse/resource.html?courseID='+this.params.courseID
        },
        openHomeworkList(){
            window.location.href='/CreateCourse/homeworkList.html?courseID='+this.params.courseID
        },
        uploadFile(){
            console.log(this.resourceFile)
            var formData = new FormData();
            formData.append('courseID', this.params.courseID);
            formData.append('file',this.resourceFile[0]);
            var config = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': this.token
                }
              };
            this.$http.post('/course/uploadResource',formData,config).then(function (res) {
                if (res.status === 200) {
                    if (res.body.code == 200) {
                        console.log(res)
                        location.reload() 
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
            this.resourceFile=event.target.files;
        },
        
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

function getDate(dd) {
    let date = new Date(dd);
    let date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    return date_value;
}

"use strict";
            (function () {

                var target = document.querySelector(".target");
                var links = document.querySelectorAll(".mynav a");
                var colors = ["deepskyblue", "orange", "firebrick", "gold", "magenta", "black", "darkblue"];

                function mouseenterFunc() {
                    if (!this.parentNode.classList.contains("active")) {
                        for (var i = 0; i < links.length; i++) {
                            if (links[i].parentNode.classList.contains("active")) {
                                links[i].parentNode.classList.remove("active");
                            }
                            links[i].style.opacity = "0.25";
                        }

                        this.parentNode.classList.add("active");
                        this.style.opacity = "1";

                        var width = this.getBoundingClientRect().width;
                        var height = this.getBoundingClientRect().height;
                        var left = this.getBoundingClientRect().left + window.pageXOffset;
                        var top = this.getBoundingClientRect().top + window.pageYOffset;
                        var color = colors[Math.floor(Math.random() * colors.length)];

                        target.style.width = width + "px";
                        target.style.height = height + "px";
                        target.style.left = left + "px";
                        target.style.top = top + "px";
                        target.style.borderColor = color;
                        target.style.transform = "none";
                    }
                }

                for (var i = 0; i < links.length; i++) {
                    links[i].addEventListener("click", function (e) {
                        return e.preventDefault();
                    });
                    links[i].addEventListener("mouseenter", mouseenterFunc);
                }

                function resizeFunc() {
                    var active = document.querySelector(".mynav li.active");

                    if (active) {
                        var left = active.getBoundingClientRect().left + window.pageXOffset;
                        var top = active.getBoundingClientRect().top + window.pageYOffset;

                        target.style.left = left + "px";
                        target.style.top = top + "px";
                    }
                }

                window.addEventListener("resize", resizeFunc);
            })();
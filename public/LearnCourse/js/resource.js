var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        resourceList:{},
        params:{}
        
    },
    created(){
        // console.log(getUrlkey(window.location.href))
        // this.params=getUrlkey(window.location.href)
        this.$http.get('/course/resourceList?courseID=1').then(function(res){
            console.log(res)
            if(res.body.code==200){
                this.resourceList=res.body.resourceList
            }
        })
    },
    methods: {
        download(resource){
            console.log(resource.fileUrl)
            var path={
                path:resource.fileUrl
            }
            console.log(path)
            this.$http.post('/course/downloadResource',path,{emulateJSON:true}).then(function (res) {
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
        }
        
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
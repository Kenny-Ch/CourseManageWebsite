var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        homeworkList: [],
        params: {}

    },
    created() {
        console.log("test")
        this.params = getUrlkey(window.location.href)
        this.$http.get('/course/homeworkList?courseID=' + this.params.courseID).then(function (res) {
            if (res.body.code == 200) {
                console.log(res.body.homeworkList)
                this.homeworkList = res.body.homeworkList
                console.log(this.homeworkList[0].ddl)
                for(var i=0;i<this.homeworkList.length;i++){
                    this.homeworkList[i].ddl=getDate(this.homeworkList[i].ddl)
                }
            } else if (res.body.code == 401) {
                window.location.replace("../login.html")
            }

        })
    },
    methods: {
        openAnnouncement() {
            window.location.href='/LearnCourse/announcement.html?courseID=' + this.params.courseID
        },
        openResource() {
            window.location.href='/LearnCourse/resource.html?courseID=' + this.params.courseID
        },
        openHomeworkList() {
            window.location.href='/LearnCourse/homeworkList.html?courseID=' + this.params.courseID
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
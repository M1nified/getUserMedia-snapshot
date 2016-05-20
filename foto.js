"use strict";
(function(){
    document.onreadystatechange = function(){
        let video = document.querySelector("#videoElement");
        let canvas = document.querySelector("#cnv-tmp");
        let photo = document.querySelector("#picture")
        let btnSave = document.querySelector("#btn-save");
        let btnFoto = document.querySelector("#btn-foto");
        let picData = null;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true}, handleVideo, videoError);
        }
        function handleVideo(stream) {
            video.src = window.URL.createObjectURL(stream);
        }
        function videoError(e) {
            console.error("Video error:",e)
        }
        
        btnSave.onclick = function btnSaveClick(evt) {
            let data = "pic="+picData;
            data = data.replace(/%20/g,'+');
            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'save', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
            xhr.send(data);
        }
        btnFoto.onclick = function btnPhotoClick(evt) {
            takepicture();
        }
        function clearphoto() {
            let context = canvas.getContext('2d');
            context.fillStyle = "#AAA";
            context.fillRect(0, 0, canvas.width, canvas.height);

            let data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
        }
        function takepicture() {
            let width = video.videoWidth;
            let height = video.videoHeight / (video.videoWidth/width);
            let context = canvas.getContext('2d');
            
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
        
            console.log(width,height);
            if (width && height) {
                console.log('ok');
                canvas.width = width;
                canvas.height = height;
                context.drawImage(video, 0, 0, width, height);
                picData = canvas.toDataURL('image/png');
                photo.setAttribute('src', picData);
                video.style.display = "none";
            } else {
                console.log('fail');
                clearphoto();
            }
        }
    }
}());
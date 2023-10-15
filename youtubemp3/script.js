function downloadMP3(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.youtube.com/watch?v=" + id + "&t=0s&list=WL&index=1&fmt=18", true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
      var mp3Data = new Uint8Array(xhr.response);
      var blob = new Blob([mp3Data], {type: "audio/mp3"});
      var downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = "video-" + id + ".mp3";
      downloadLink.click();
    };
    xhr.send();
  }
  
  document.getElementById("download").addEventListener("click", function() {
    var id = document.getElementById("id").value;
    downloadMP3(id);
  });
  
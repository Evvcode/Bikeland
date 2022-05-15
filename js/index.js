$("#gpx-input").on("change", function(e) {
    $("#input-image").attr("src", "ico/done.png");

    var files = e.target.files;
    var filename = e.target.value.split('\\').pop();
    var file = files[0];
    var reader = new FileReader();

    reader.onload = function() {
        var GPXdata = reader.result;
        localStorage.setItem("GPX", GPXdata);
    }

    reader.readAsText(file);

    $("#input-filename").text(filename);
    $("#preview").show();
});
$(window).on("load", function() {
    var GPXdata = localStorage.getItem("GPX");

    var map = new MapGPX("map-div", GPXdata);
    map.render();

    var stats = new Statistics(GPXdata);
    stats.getAndRender();

    var altitudeChart = new ChartManager(GPXdata);
    var speedChart = new ChartManager(GPXdata);

    new L.GPX(GPXdata, { async: true }).on('loaded', function(e) {
        altitudeChart.getChartMetadata(e.target.get_elevation_data());
        speedChart.getChartMetadata(e.target.get_speed_data());

        altitudeChart.getConfig("Wysokość (m n.p.m.)", "m", "#4287f5");
        speedChart.getConfig("Prędkość (km/h)", "km/h", "#32a852");

        altitudeChart.draw("altitudeChart");
        speedChart.draw("speedChart");

        StarManager.calculateMetadataStars(e.target.get_distance(), e.target.get_total_time(), e.target.get_elevation_gain(), e.target.get_elevation_loss());
        StarManager.render();
    });
});
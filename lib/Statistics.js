class Statistics {
    constructor(GPXdata) {
        this.GPXdata = GPXdata;
        this.data = {}
    }

    getAndRender() {
        new L.GPX(this.GPXdata, { async: true }).on('loaded', function(e) {
            this.data = {
                "distance": 0.00,
                "time": 0,
                "speed": {
                    "average": 0.00,
                    "max": 0.00
                },
                "altitude": {
                    "max": 0,
                    "min": 0,
                    "gain": 0,
                    "loss": 0
                },
                "averageTemperature": 0
            };

            this.data.distance = parseFloat((e.target.get_distance() / 1000).toFixed(2));
            this.data.time = e.target.get_total_time();
            this.data.speed.average = parseFloat((e.target.get_total_speed()).toFixed(2));
            this.data.speed.max = parseFloat((e.target.get_speed_max()).toFixed(2));
            this.data.altitude.max = e.target.get_elevation_max();
            this.data.altitude.min = e.target.get_elevation_min();
            this.data.altitude.gain = Math.round(e.target.get_elevation_gain());
            this.data.altitude.loss = Math.round(e.target.get_elevation_loss());
            this.data.averageTemperature = e.target.get_average_temp();

            $("#distance-val").text(this.data.distance + " km");
            $("#time-val").text(e.target.get_duration_string_iso(this.data.time, true));
            $("#avg-speed-val").text(this.data.speed.average + " km/h");
            $("#max-speed-val").text(this.data.speed.max + " km/h");
            $("#max-alti-val").text(this.data.altitude.max + " m");
            $("#min-alti-val").text(this.data.altitude.min + " m");
            $("#alti-up-val").text(this.data.altitude.gain + " m");
            $("#alti-down-val").text(this.data.altitude.loss + " m");

            try {
                $("#avg-temp-val").text(this.data.averageTemperature + "°C");
            } catch {
                this.data.averageTemperature = 0;
                $("#avg-temp-val").text("Niedostępna");
            }
        });
    }
}
class MapGPX {
    constructor(mapDivID, GPXdata) {
        this.divID = mapDivID;
        this.data = GPXdata;
        this.object = L.map(mapDivID);
    }

    render() {
        var map = this.object;

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>'
        }).addTo(map);

        new L.GPX(this.data, { async: true }).on('loaded', function(e) {
            map.fitBounds(e.target.getBounds());
        }).addTo(map);
    }
}
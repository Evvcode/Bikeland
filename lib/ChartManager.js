class ChartManager {
    constructor(GPXdata) {
        this.GPXdata = GPXdata;
        this.values = [];
        this.labels = [];
        this.config = {};
    }

    getChartMetadata(data) {
        for (var i = 0; i < data.length; i++) {
            var value = data[i][1];
            var label = i + 1;
            this.values.push(value);
            this.labels.push(label);
        }
    }

    getConfig(labelName, labelUnit, color) {
        const data = {
            labels: this.labels,
            datasets: [{
                label: labelName,
                backgroundColor: color + "66",
                borderColor: color,
                data: this.values,
            }]
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                scales: {
                    y: {
                        ticks: {
                            callback: function(value, index, ticks) {
                                return value + " " + labelUnit;
                            }
                        }
                    }
                },
                pointRadius: 0,
                fill: true,
                responsive: true,
                tension: 1
            }
        };

        this.config = config;
    }

    draw(HTMLid) {
        const chart = new Chart(
            $("#" + HTMLid),
            this.config
        );
    }
}
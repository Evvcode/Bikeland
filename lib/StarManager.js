class StarManager {
    static stars = 0;

    static calculateMetadataStars(distance, time, elevationGain, elevationLoss) {
        this.stars += Math.round(distance / 1000);
        this.stars += Math.round(time / 3600000);
        this.stars += Math.round(elevationGain / 50);
        this.stars += Math.round(elevationLoss / 80);
        console.log(this.stars);
    }

    static render() {
        $("#star-amount").text(this.stars);
    }
}
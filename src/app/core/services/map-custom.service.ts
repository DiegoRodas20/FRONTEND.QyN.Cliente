import { Injectable } from "@angular/core"
import * as mapboxgl from 'mapbox-gl';
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})

export class MapService {

    mapbox = (mapboxgl as typeof mapboxgl);
    map: mapboxgl.Map;
    style = 'mapbox://styles/mapbox/streets-v11';
    lat = -12.14387067094536;
    lng = -76.98475274903164;
    zoom = 14;
    wayPoints: Array<any> = [];
    markerDriver: any = null;

    constructor() {
        this.mapbox.accessToken = environment.MAPBOX_KEY;
    }

    buildMap(): Promise<any> {

        return new Promise((resolve, reject) => {
            try {
                this.map = new mapboxgl.Map({
                    container: 'map',
                    style: this.style,
                    zoom: this.zoom,
                    center: [this.lng, this.lat]
                });

                resolve({
                    map: this.map
                });

            } catch (e) {
                reject(e);
            }
        });
    }

    addMarkerCustom(coords): void {
        const el = document.createElement('div');
        el.className = 'marker';
        if (!this.markerDriver) {
            this.markerDriver = new mapboxgl.Marker(el);
        } else {
            this.markerDriver
                .setLngLat(coords)
                .addTo(this.map);
        }
    }


}
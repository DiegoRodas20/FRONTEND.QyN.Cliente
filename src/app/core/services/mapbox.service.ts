import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { LngLatLike, Map, Marker, Popup } from "mapbox-gl";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Feature, PlacesResponse } from "../models/places.model";
import { MAPBOX_URL } from "../utils/url_constants";


@Injectable({
    providedIn: 'root'
})

export class MapBoxService {

    public useLocation?: [number, number]
    public locationDefault: LngLatLike = [-76.980221, -12.1321655]
    private map?: Map
    private markers: Marker[] = []

    get isUserLocationReady(): boolean {
        return !!this.useLocation
    }

    get isMapReady() {
        return !!this.map
    }

    constructor(private http: HttpClient) {
        this.getUserLocation()
    }

    public async getUserLocation(): Promise<[number, number]> {

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    this.useLocation = [coords.longitude, coords.latitude]
                    resolve(this.useLocation)
                },
                (error) => {
                    console.log(error)
                    reject()
                }
            )
        })
    }

    setMap(map: Map) {
        this.map = map
    }

    flyTo(coords: LngLatLike) {
        if (!this.isMapReady) throw Error('El mapa no esta inicializado')
        this.map?.flyTo({
            zoom: 14,
            center: coords
        })
    }

    createMarkersFromPlaces(place: Feature) {

        if (!this.isMapReady) throw Error('El mapa no esta inicializado')
        this.markers.forEach(marker => marker.remove())
        const newMarkers = []

        const [lng, lat] = place.center

        const popup = new Popup().setHTML(`
               <h6 class="mb-2 ">${place.text}</h6>
               <span class="">${place.place_name}</span>`
        )
        const newMarker = new Marker({ color: '#062B61' })
            .setLngLat([lng, lat])
            .setPopup(popup)
            .addTo(this.map)

        const markerDiv = newMarker.getElement();

        markerDiv.addEventListener('mouseenter', () => newMarker.togglePopup());
        markerDiv.addEventListener('mouseleave', () => newMarker.togglePopup());

        newMarkers.push(newMarker)
        this.markers = newMarkers
    }

    getPlacesByQuery(searchPlace: string): Observable<PlacesResponse> {

        const url = `${MAPBOX_URL}mapbox.places/${searchPlace}.json?access_token=${environment.MAPBOX_KEY}`
        return this.http.get<PlacesResponse>(url)
    }

    getPlaceByCoords(longitud: number, latitud: number): Observable<PlacesResponse> {

        const url = `${MAPBOX_URL}mapbox.places/${longitud},${latitud}.json?access_token=${environment.MAPBOX_KEY}`
        return this.http.get<PlacesResponse>(url)
    }

}
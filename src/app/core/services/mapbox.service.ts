import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Route } from "@angular/router";
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from "mapbox-gl";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Feature, PlacesResponse } from "../models/places.model";
import { DIRECTIONS_URL, MAPBOX_URL } from "../utils/url_constants";


@Injectable({
    providedIn: 'root'
})

export class MapBoxService {

    public useLocation?: [number, number]
    public locationDefault: LngLatLike = [-76.980221, -12.1321655]
    public locationQN: LngLatLike = [-76.9139778, -12.0146857]

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

    getRouteBetweenPoints(start: [number, number], end: [number, number]): Observable<any> {

        const url = `${DIRECTIONS_URL}${start.join(',')};${end.join(',')}?alternatives=false&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${environment.MAPBOX_KEY}`
        console.log(url)

        return this.http.get<any>(url)
    }

    drawPolyline(route: any) {

        console.log({ kms: route.distance / 1000, duration: route.duration / 60 })

        const coords = route.geometry.coordinates
        const bounds = new LngLatBounds()

        coords.forEach(([lng, lat]) => {
            bounds.extend([lng, lat])
        });

        this.map?.fitBounds(bounds, {
            padding: 200
        })

        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        }

        this.map.addSource('RouteString', sourceData)
        this.map.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                "line-color": '#062B61',
                "line-width": 3
            }
        })
    }
}
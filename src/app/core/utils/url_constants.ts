import { environment } from "src/environments/environment"

export const AUTH_URL           = `${environment.API_URL}`
export const PRODUCT_URL        = `${environment.API_URL}product`
export const ORDER_URL          = `${environment.API_URL}order`
export const CLIENT_URL         = `${environment.API_URL}client`

export const CATEGORY_URL       = `${environment.API_URL}category`
export const TYPEDOCUMENT_URL   = `${environment.API_URL}typedocument`

export const MAPBOX_URL         = `${environment.API_MAPBOX}geocoding/v5/`
export const DIRECTIONS_URL     = `${environment.API_MAPBOX}directions/v5/mapbox/driving/`

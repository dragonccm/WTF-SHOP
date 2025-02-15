// 'use client'

// import { useRef, useState } from 'react'
// import {
//   useJsApiLoader,
//   GoogleMap,
//   Marker,
//   Autocomplete,
//   DirectionsRenderer,
// } from '@react-google-maps/api'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Skeleton } from "@/components/ui/skeleton"

// const center = { lat: 48.8584, lng: 2.2945 }

// export default function Map() {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
//     libraries: ['places'],
//   })

//   const [map, setMap] = useState<google.maps.Map | null>(null)
//   const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null)
//   const [distance, setDistance] = useState('')
//   const [duration, setDuration] = useState('')

//   /** @type React.MutableRefObject<HTMLInputElement> */
//   const originRef = useRef<HTMLInputElement>(null)
//   const destinationRef = useRef<HTMLInputElement>(null)

//   if (!isLoaded) {
//     return <Skeleton className="h-screen w-screen" />
//   }

//   async function calculateRoute() {
//     if (!originRef.current || !destinationRef.current || originRef.current.value === '' || destinationRef.current.value === '') {
//       return
//     }
//     // eslint-disable-next-line no-undef
//     const directionsService = new google.maps.DirectionsService()
//     const results = await directionsService.route({
//       origin: originRef.current.value,
//       destination: destinationRef.current.value,
//       // eslint-disable-next-line no-undef
//       travelMode: google.maps.TravelMode.DRIVING,
//     })
//     setDirectionsResponse(results)
//     setDistance(results.routes[0].legs[0].distance?.text || '')
//     setDuration(results.routes[0].legs[0].duration?.text || '')
//   }

//   function clearRoute() {
//     setDirectionsResponse(null)
//     setDistance('')
//     setDuration('')
//     if (originRef.current) originRef.current.value = ''
//     if (destinationRef.current) destinationRef.current.value = ''
//   }

//   return (
//     <div className="relative flex flex-col items-center h-screen w-screen">
//       <div className="absolute left-0 top-0 h-full w-full">
//         {/* Google Map Box */}
//         <GoogleMap
//           center={center}
//           zoom={15}
//           mapContainerStyle={{ width: '100%', height: '100%' }}
//           options={{
//             zoomControl: false,
//             streetViewControl: false,
//             mapTypeControl: false,
//             fullscreenControl: false,
//           }}
//           onLoad={map => setMap(map)}
//         >
//           <Marker position={center} />
//           {directionsResponse && (
//             <DirectionsRenderer directions={directionsResponse} />
//           )}
//         </GoogleMap>
//       </div>
//       <div className="p-4 rounded-lg m-4 bg-white shadow-md min-w-[768px] z-10">
//         <div className="flex space-x-2 justify-between">
//           <div className="flex-grow">
//             <Autocomplete>
//               <Input type="text" placeholder="Origin" ref={originRef} />
//             </Autocomplete>
//           </div>
//           <div className="flex-grow">
//             <Autocomplete>
//               <Input
//                 type="text"
//                 placeholder="Destination"
//                 ref={destinationRef}
//               />
//             </Autocomplete>
//           </div>

//           <div className="flex space-x-2">
//             <Button onClick={calculateRoute}>
//               Calculate Route
//             </Button>
//             <Button variant="outline" size="icon" onClick={clearRoute}>
//               Time
//             </Button>
//           </div>
//         </div>
//         <div className="flex space-x-4 mt-4 justify-between items-center">
//           <p>Distance: {distance} </p>
//           <p>Duration: {duration} </p>
//           <Button
//             variant="outline"
//             size="icon"
//             className="rounded-full"
//             onClick={() => {
//               if (map) {
//                 map.panTo(center)
//                 map.setZoom(15)
//               }
//             }}
//           >
//             Ooooo
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client";

import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
// import './map.css';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const tokyo = { lng: 105.76779143759512, lat: 10.047149154013994 };
  const zoom = 15;
  maptilersdk.config.apiKey = "4QwyuBzQjAIp1h2qY6XS";
  const [currentLocation, setCurrentLocation] = useState({ lng: 0, lat: 0 });

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    if (mapContainer.current) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [tokyo.lng, tokyo.lat],
        zoom: zoom,
      });

      // Add the marker only once after the map is initialized
      // new maptilersdk.Marker({color: "#FF0000"})
      //   .setLngLat([139.7525,35.6846])
      //   .addTo(map.current!);

      // Update current location whenever the map center changes
      let marker: maptilersdk.Marker | null = null;
      marker = new maptilersdk.Marker({ color: "#FF0000" })
      .setLngLat(tokyo)
      .addTo(map.current!);
      // map.current.on("moveend", () => {
      //   const center = map.current!.getCenter();
      //   setCurrentLocation({ lng: center.lng, lat: center.lat });

      //   // Remove the old marker if it exists
      //   if (marker) {
      //     marker.remove();
      //   }

      //   // Add a new marker at the current center
      //   marker = new maptilersdk.Marker({ color: "#FF0000" })
      //     .setLngLat([center.lng, center.lat])
      //     .addTo(map.current!);
      // }
      // );
      map.current.on("click", (event) => {
        // Lấy tọa độ của vị trí người dùng click chuột
        const lngLat = event.lngLat;
        setCurrentLocation({ lng: lngLat.lng, lat: lngLat.lat });
        // In ra tọa độ của vị trí người dùng click chuột
        console.log("Bạn đã click vào tọa độ:", lngLat);
        // Remove the old marker if it exists
        if (marker) {
          marker.remove();
        }
        // Thêm một marker vào vị trí người dùng click chuột
        marker = new maptilersdk.Marker({ color: "#FF0000" })
          .setLngLat(lngLat)
          .addTo(map.current!);
      });
    }
  }, [tokyo.lng, tokyo.lat, zoom]);

  return (
    <div className="relative flex flex-col items-center h-full w-full">
      <div
        ref={mapContainer}
        className="map absolute left-0 top-0 h-full w-full"
      />
      <p>
        Vị trí hiện tại: {currentLocation.lng}, {currentLocation.lat}
      </p>
    </div>
  );
}

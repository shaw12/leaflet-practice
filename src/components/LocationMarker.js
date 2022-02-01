import React, { useState, useRef, useEffect } from 'react'
import { Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet';

function LocationMarker({ type }) {

    const [position, setPosition] = useState([{
      color: 'red',
      latLang: [51.505, -0.09]
    }]);
    const markerRef = useRef(null);

    useEffect(() => {
      if(type === 'output') {
        console.log('All positions are: ')
        position.map((x) => {
          console.log(x.color, x.latLang[0], x.latLang[1])
        })
      }
    }, [type])

    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        if (type === 'place') {
          if(window.confirm("Would you like to choose Red marker in Red or Blue?")){
            setPosition([...position, {
              color: 'red',
              latLang: [lat, lng]
            }])
          } else {
            setPosition([...position, {
              color: 'blue',
              latLang: [lat, lng]
            }])
          }
        }

        if(type === 'edit') {
          const filterArr = position.map(val => {
            if (val.latLang[0].toFixed(3) == lat.toFixed(3) &&  val.latLang[1].toFixed(3) == lng.toFixed(3)) {
              if (val.color === 'red') {
                return {
                  ...val,
                  color: 'blue',
                }
              } else {
                return {
                  ...val,
                  color: 'red',
                }
              }
            }
            return val
          });
          setPosition(filterArr)
        }

        if(type === 'delete') {
          const filterArr = position.filter(val => val.latLang[0].toFixed(3) !== lat.toFixed(3) &&  val.latLang[1].toFixed(3) !== lng.toFixed(3));
          setPosition(filterArr)
        }
      },
    });

    var redIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    var blueIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  
    return position === null ? null : (
      position.map(elem => (
        <Marker 
          position={elem.latLang} 
          ref={markerRef}
          icon={elem.color === 'red' ? redIcon : blueIcon}
          draggable={type === 'edit' ? true : false}
        >
        </Marker>
      ))
    )
}

export default LocationMarker

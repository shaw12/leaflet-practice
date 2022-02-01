import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import './App.css';
import LocationMarker from './components/LocationMarker';

function App() {
  const [currentType, setCurrentType] = useState('output');
  const [position, setPosition] = useState([51.505, -0.09])

  console.log('type', currentType);

  return (
    <div className="App">
      <main>
        <button 
          className={currentType === 'place' ? 'active-btn' : ''} 
          onClick={() => setCurrentType('place')}
        >
          Place
        </button>
        <button 
          className={currentType === 'edit' ? 'active-btn' : ''} 
          onClick={() => setCurrentType('edit')}
        >
          Edit
        </button>
        <button 
          className={currentType === 'delete' ? 'active-btn' : ''}
          onClick={() => setCurrentType('delete')}
        >
          Delete
        </button>
        <button 
          className={currentType === 'output' ? 'active-btn' : ''}
          onClick={() => setCurrentType('output')}
        >
          Output
        </button>
      </main>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} id="map" onClick={(e) => console.log(e.latlng, 'ip')}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <LocationMarker type={currentType} />
      </MapContainer>
    </div>
  );
}

export default App;

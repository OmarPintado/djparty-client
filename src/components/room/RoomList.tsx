import React from 'react';
import CardItem from '../common/CardItem';  // Importando el componente

const rooms = [
  { 
    image: '/maracumango.jpg', 
    title: 'Awakening ashsassshhhhhhahssssshasahs', 
    subtitle: 'Ashal S',
    options: [
      { label: 'Eliminar', action: () => alert('Eliminar Awakening') },
      { label: 'Compartir', action: () => alert('Compartir Awakening') },
      { label: 'Editar', action: () => alert('Editar Awakening') }
    ],
    number: 1,  // Número de orden
    showAddButton: true,  // Mostrar el botón "+"
    onAddClick: () => alert('Agregar Awakening a la lista')  // Acción del botón "+"
  },
  { 
    image: '/maracumango.jpg', 
    title: 'Hiraeth', 
    subtitle: 'Lastveek',
    options: [
      { label: 'Eliminar', action: () => alert('Eliminar Hiraeth') },
      { label: 'Compartir', action: () => alert('Compartir Hiraeth') }
    ],
    number: 2  // Solo número, sin botón "+"
  },
  { 
    image: '/maracumango.jpg', 
    title: 'Dreamers', 
    subtitle: 'Fernando Ferreyra sajsjakjskajskajskajksajksjaksjksajakjsak',
    options: [
      { label: 'Eliminar', action: () => alert('Eliminar Dreamers') },
      { label: 'Agregar a favoritos', action: () => alert('Agregar Dreamers a favoritos') }
    ]
    // Sin número ni botón "+"
  }
];

const RoomList: React.FC = () => (
  <div className="container">
    <div className="d-flex flex-column">
      {rooms.map((room, index) => (
        <div className="mb-3" key={index}>
          <CardItem 
            image={room.image}
            title={room.title}
            subtitle={room.subtitle}
            options={room.options}  
            number={room.number}  
            showAddButton={room.showAddButton}  
            onAddClick={room.onAddClick}  
          />
        </div>
      ))}
    </div>
  </div>
);

export default RoomList;

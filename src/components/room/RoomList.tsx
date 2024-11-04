import React from 'react';
import CardItem from '../common/CardItem';

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
    number: 1,
    showAddButton: true,
    onAddClick: () => alert('Agregar Awakening a la lista')
  },
  { 
    image: '/maracumango.jpg', 
    title: 'Awakening ashsassshhhhhhahssssshasahs', 
    subtitle: 'Ashal S',
    options: [
      { label: 'Eliminar', action: () => alert('Eliminar Awakening') },
      { label: 'Compartir', action: () => alert('Compartir Awakening') },
      { label: 'Editar', action: () => alert('Editar Awakening') }
    ],
    number: 1,
    showAddButton: true,
    onAddClick: () => alert('Agregar Awakening a la lista')
  },
  { 
    image: '/maracumango.jpg', 
    title: 'Awakening ashsassshhhhhhahssssshasahs', 
    subtitle: 'Ashal S',
    options: [
      { label: 'Eliminar', action: () => alert('Eliminar Awakening') },
      { label: 'Compartir', action: () => alert('Compartir Awakening') },
      { label: 'Editar', action: () => alert('Editar Awakening') }
    ],
    number: 1,
    showAddButton: true,
    onAddClick: () => alert('Agregar Awakening a la lista')
  },
  { 
    image: '/maracumango.jpg', 
    title: 'Awakening ashsassshhhhhhahssssshasahs', 
    subtitle: 'Ashal S',
    options: [
      { label: 'Eliminar', action: () => alert('Eliminar Awakening') },
      { label: 'Compartir', action: () => alert('Compartir Awakening') },
      { label: 'Editar', action: () => alert('Editar Awakening') }
    ],
    number: 1,
    showAddButton: true,
    onAddClick: () => alert('Agregar Awakening a la lista')
  },
  { 
    image: '/maracumango.jpg', 
    title: 'Awakening ashsassshhhhhhahssssshasahs', 
    subtitle: 'Ashal S',
    options: [
      { label: 'Eliminar', action: () => alert('Eliminar Awakening') },
      { label: 'Compartir', action: () => alert('Compartir Awakening') },
      { label: 'Editar', action: () => alert('Editar Awakening') }
    ],
    number: 1,
    showAddButton: true,
    onAddClick: () => alert('Agregar Awakening a la lista')
  },
  { 
    image: '/maracumango.jpg', 
    title: 'Awakening ashsassshhhhhhahssssshasahs', 
    subtitle: 'Ashal S',
    options: [
      { label: 'Eliminar', action: () => alert('Eliminar Awakening') },
      { label: 'Compartir', action: () => alert('Compartir Awakening') },
      { label: 'Editar', action: () => alert('Editar Awakening') }
    ],
    number: 1,
    showAddButton: true,
    onAddClick: () => alert('Agregar Awakening a la lista')
  },
  // Agrega más objetos para otros elementos
];

const RoomList: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
    {rooms.map((room, index) => (
      <CardItem 
        key={index}
        image={room.image}
        title={room.title}
        subtitle={room.subtitle}
        options={room.options}
        number={room.number}
        showAddButton={room.showAddButton}
        onAddClick={room.onAddClick}
      />
    ))}
  </div>
);

export default RoomList;

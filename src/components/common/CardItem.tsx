import React from 'react';
import { Card, Dropdown, Button } from 'react-bootstrap';

interface CardItemProps {
  image: string;
  title: string;
  subtitle: string;
  options?: { label: string, action: () => void }[]; // Opcional
  number?: number; // Opcional
  showAddButton?: boolean; // Opcional
  onAddClick?: () => void; // Opcional
}

const CardItem: React.FC<CardItemProps> = ({ 
  image, 
  title, 
  subtitle, 
  options = [], 
  number, 
  showAddButton = false, 
  onAddClick 
}) => (
  <Card style={{ maxWidth: '100%', background: '#1b1b1b', color: 'white', border: 'none', borderRadius: '10px', marginBottom: '15px', padding: '10px' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {number !== undefined && (
        <div style={{ width: '30px', textAlign: 'center', color: '#888' }}>
          <span>{number}</span>
        </div>
      )}
      <div style={{ width: '60px', flexShrink: 0 }}>
        <Card.Img src={image} style={{ borderRadius: '8px', width: '100%' }} alt={title} />
      </div>
      <div style={{ flexGrow: 1, marginLeft: '15px', maxWidth: '45%' }}>
        <Card.Body style={{ padding: 0 }}>
          <Card.Title style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '5px' }}>
            {title}
          </Card.Title>
          <Card.Text style={{ fontSize: '14px', color: '#aaa', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {subtitle}
          </Card.Text>
        </Card.Body>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
        {showAddButton && onAddClick && (
          <Button 
            onClick={onAddClick}
            style={{ backgroundColor: '#0f9b0f', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}
          >
            +
          </Button>
        )}
        {options && options.length > 0 && (
          <Dropdown>
            <Dropdown.Toggle style={{ background: 'transparent', border: 'none', color: '#fff', padding: 0, fontSize: '18px' }}>
              ...
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {options.map((option, index) => (
                <Dropdown.Item key={index} onClick={option.action}>
                  {option.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  </Card>
);

export default CardItem;

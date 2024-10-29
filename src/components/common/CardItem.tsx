// src/components/common/CardItem.tsx
import React from 'react';
import { Card, Dropdown, Button } from 'react-bootstrap';

interface CardItemProps {
  image: string;
  title: string;
  subtitle: string;
  options: { label: string, action: () => void }[];
  number?: number; //opcional
  showAddButton?: boolean; //opcional
  onAddClick?: () => void;  //opcional
}

const CardItem: React.FC<CardItemProps> = ({ 
  image, 
  title, 
  subtitle, 
  options, 
  number, 
  showAddButton = false, 
  onAddClick 
}) => (
  <Card className="mb-3" style={{ maxWidth: '100%' }}>  
    <div className="d-flex align-items-center" style={{ maxWidth: '100%' }}>
      {/* Condicional para mostrar el número */}
      {number !== undefined && (
        <div style={{ width: '30px', textAlign: 'center' }}>
          <span>{number}</span>
        </div>
      )}

      <div className="flex-shrink-0" style={{ width: '60px' }}> 
        <Card.Img src={image} className="img-fluid rounded-start" alt={title} />
      </div>

      <div className="flex-grow-1 ms-3" style={{ maxWidth: '45%' }}>  
        <Card.Body className="d-flex flex-column">
          <Card.Title style={{ 
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis' 
          }}>
            {title}
          </Card.Title>
          <Card.Text style={{ 
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis' 
          }}>
            {subtitle}
          </Card.Text>
        </Card.Body>
      </div>

      <div className="d-flex ms-auto" style={{ alignItems: 'center' }}> 
        {/* Condicional para mostrar el botón "+" */}
        {showAddButton && onAddClick && (
          <Button 
            variant="outline-success" 
            size="sm" 
            className="me-2"
            onClick={onAddClick}
            style={{ minWidth: '36px' }} 
          >
            +
          </Button>
        )}

        {/* Dropdown de opciones */}
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" size="sm">
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
      </div>
    </div>
  </Card>
);

export default CardItem;

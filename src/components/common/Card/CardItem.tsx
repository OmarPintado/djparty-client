import React from 'react';
import { Card, Dropdown, Button } from 'react-bootstrap';
import './css/CardItem.css';

interface CardItemProps {
  image: string;
  title: string;
  subtitle: string;
  options?: { label: string, action: () => void }[]; 
  number?: number; 
  showAddButton?: boolean; 
  onAddClick?: () => void; 
  onClick?: () => void;
}

const CardItem: React.FC<CardItemProps> = ({ 
  image, 
  title, 
  subtitle, 
  options = [], 
  number, 
  showAddButton = false, 
  onAddClick,
  onClick, 
}) => (
  <Card className="card-item" onClick={()=>{
    if(!onAddClick&& onClick){
        onClick();
    }else if (onAddClick&&!onClick){
        onAddClick();
    }
    }}>
    <div className="card-item-content">
      {number !== undefined && (
        <div className="card-item-number">
          <span>{number}</span>
        </div>
      )}
      <div className="card-item-image">
        <Card.Img src={image} style={{ borderRadius: '8px', width: '100%' }} alt={title} />
      </div>
      <div className="card-item-body">
        <Card.Body>
          <Card.Title className="card-item-title">
            {title}
          </Card.Title>
          <Card.Text className="card-item-subtitle">
            {subtitle}
          </Card.Text>
        </Card.Body>
      </div>
      <div className="card-item-actions">
        {showAddButton && onAddClick && (
          <Button 
            onClick={(e) => {
              e.stopPropagation(); 
              onAddClick();
            }}
            className="add-button"
          >
            +
          </Button>
        )}
        {options && options.length > 0 && (
          <Dropdown>
            <Dropdown.Toggle className="dropdown-toggle-button">
              ...
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {options.map((option, index) => (
                <Dropdown.Item 
                  key={index} 
                  onClick={(e) => {
                    e.stopPropagation();  
                    option.action();
                  }}
                >
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

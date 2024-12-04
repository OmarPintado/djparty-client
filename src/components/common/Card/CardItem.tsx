import React from "react";
import { Card, Dropdown, Button } from "react-bootstrap";
import "./css/CardItem.css";

interface CardItemProps {
    image: string;
    title: string;
    subtitle: string;
    options?: { label: string; action: () => void }[];
    number?: number;
    is_private?: boolean;
    showAddButton?: boolean;
    onAddClick?: () => void;
}

const CardItem: React.FC<CardItemProps> = ({
    image,
    title,
    subtitle,
    options = [],
    number,
    is_private,
    showAddButton = false,
    onAddClick,
}) => (
    <Card className="card-item">
        <div className="card-item-content">
            {number !== undefined && (
                <div className="card-item-number">
                    <span>{number}</span>
                </div>
            )}
            <div className="card-item-image">
                <Card.Img
                    src={image}
                    style={{ borderRadius: "8px", width: "100%" }}
                    alt={title}
                />
            </div>
            <div className="card-item-body">
                <Card.Body>
                    <Card.Title className="card-item-title">{title}</Card.Title>
                    <Card.Text className="card-item-subtitle">
                        {subtitle}
                    </Card.Text>
                </Card.Body>
            </div>
            <div
                className={`${
                    is_private ? "text-bg-danger" : "text-bg-primary"
                } badge d-none d-md-block mx-3`}
            >
                {is_private ? "Privado" : "Publico"}
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

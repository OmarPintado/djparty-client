import React from "react";
import { Card } from "react-bootstrap";
import "./css/CardItem.css";

interface ShortCardItemProps {
    image: string;
    title: string;
    subtitle: string;
    onClick?: () => void;
}

const ShortCardItem: React.FC<ShortCardItemProps> = ({
    image,
    title,
    subtitle,
    onClick,
}) => (
    <Card className="card-item" onClick={onClick}>
        <div className="card-item-content">
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
        </div>
    </Card>
);

export default ShortCardItem;

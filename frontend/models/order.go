package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Order struct {
	ID              primitive.ObjectID `bson:"_id,omitempty"`
	ProductName     string             `bson:"productName" validate:"required"`
	ProductImage    string             `bson:"productImage"`
	Stock           int32              `bson:"stock" validate:"required"`
	ClientName      string             `bson:"clientName" validate:"required"`
	ClientEmail     string             `bson:"clientEmail" validate:"required,email"`
	Address         string             `bson:"address" validate:"required"`
	Status          string             `bson:"status" validate:"required,oneof=Pending Delivered"`
	QuantityOrdered int32              `bson:"quantityOrdered" validate:"required"`
	CreatedAt       primitive.DateTime `bson:"createdAt,omitempty"`
}

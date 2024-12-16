package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Product struct {
	ID                 primitive.ObjectID `bson:"_id,omitempty"`
	ProductName        string             `bson:"productName"`
	ProductDescription string             `bson:"productDescription"`
	ProductImage       string             `bson:"productImage"`
	Stock              int32              `bson:"stock"`
	Price              float32            `bson:"price"`
}

package controllers

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"

	"frontend/database"
	"frontend/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetProduct(c *gin.Context) {
	db := database.MongoClient.Database("onlineShopp")
	collection := db.Collection("products")

	// Verificar si la colección existe
	collections, err := db.ListCollectionNames(context.TODO(), bson.M{})
	if err != nil {
		log.Println("Error listing collections:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	collectionExists := false
	for _, colName := range collections {
		if colName == "products" {
			collectionExists = true
			break
		}
	}

	if !collectionExists {
		// Si la colección no existe, renderizar la plantilla con una lista vacía
		c.HTML(http.StatusOK, "products.html", gin.H{"products": []models.Product{}})
		return
	}

	// Find all products
	result, err := collection.Find(context.TODO(), bson.D{{}})
	if err != nil {
		log.Println("Error finding products:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer result.Close(context.TODO())

	var products []models.Product
	if err = result.All(context.TODO(), &products); err != nil {
		log.Println("Error decoding products:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return the products as JSON
	//c.JSON(http.StatusOK, products)
	// Render the products as HTML
	c.HTML(http.StatusOK, "products.html", gin.H{"products": products})
}



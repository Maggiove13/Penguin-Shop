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


// CreateOrder maneja la ruta POST /products/order
func CreateOrder(c *gin.Context) {
	// Obtener datos del producto
	productName := c.PostForm("productName")
	if productName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "productName is required"})
		return
	}

	productImage := c.PostForm("productImage")
	if productImage == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "productImage is required"})
		return
	}

	stockStr := c.PostForm("stock")
	if stockStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "stock is missing"})
		return
	}

	stock, err := strconv.Atoi(stockStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "stock must be a valid integer"})
		return
	}

	// Obtener la cantidad ordenada del formulario
	requestedQuantityStr := c.PostForm("quantityOrdered")
	if requestedQuantityStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "quantityOrdered is missing"})
		return
	}

	// Convertir la cantidad ordenada a un entero
	requestedQuantity, err := strconv.Atoi(requestedQuantityStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "requestedQuantity  must be a valid integer"})
		return
	}

	// Verificar si hay suficiente stock
	if requestedQuantity > stock {
		c.HTML(http.StatusBadRequest, "orders.html", gin.H{
			"error":        fmt.Sprintf("Lo sentimos, solo hay %d unidades disponibles", stock),
			"productName":  productName,
			"productImage": productImage,
			"stock":        stock,
		})
		return
	}

	//Obtener datos del cliente
	clientName := c.PostForm("clientName")
	if clientName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "clientName is required"})
		return
	}

	clientEmail := c.PostForm("clientEmail")
	if clientEmail == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "clientEmail is required"})
		return
	}

	address := c.PostForm("address")
	if address == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "address is required"})
		return
	}

	// Crear nueva orden
	newOrder := models.Order{
		ProductName:     productName,
		ProductImage:    productImage,
		Stock:           int32(stock),
		ClientName:      clientName,
		ClientEmail:     clientEmail,
		Address:         address,
		Status:          "Pending",
		QuantityOrdered: int32(requestedQuantity),
		CreatedAt:       primitive.NewDateTimeFromTime(time.Now()),
	}

	// Insertar orden
	orderCollection := database.MongoClient.Database("onlineShopp").Collection("orders")
	result, err := orderCollection.InsertOne(context.TODO(), newOrder)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al guardar la orden"})
		return
	}

	// Actualizar stock del producto
	productCollection := database.MongoClient.Database("onlineShopp").Collection("products")
	_, err = productCollection.UpdateOne(
		context.TODO(),
		bson.M{"productName": productName},
		bson.M{"$inc": bson.M{"stock": -requestedQuantity}},
	)
	if err != nil {
		// Manejar error de actualización de stock
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar el stock"})
		return
	}

	// Obtener el ID de la orden insertada
	orderID := result.InsertedID.(primitive.ObjectID).Hex()

	// Renderizar página de éxito
	c.HTML(http.StatusOK, "orderSuccess.html", gin.H{
		"order":   newOrder,
		"orderID": orderID,
	})
}
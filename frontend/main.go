package main

import (
	"log"
	"os"

	"frontend/database"
	"frontend/routes"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Cargar archivo .env
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// Conectar a MongoDB
	mongoUri := os.Getenv("MONGO_URI")
	if err := database.ConnectToMongoDB(mongoUri); err != nil {
		log.Fatal("No se pudo conectar a MongoDB:", err)
	}
	log.Println("Conexión exitosa a MongoDB")

	// Configurar servidor
	router := gin.Default()

	// Configurar el motor de plantillas
	router.LoadHTMLGlob("templates/*.html")

	// Registrar rutas
	routes.Routes(router)

	// Iniciar servidor
	if err := router.Run(); err != nil {
		log.Fatal("Error iniciando el servidor:", err)
	}
}

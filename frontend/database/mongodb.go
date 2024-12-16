package database

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var MongoClient *mongo.Client

// ConnectToMongoDB conecta a la base de datos MongoDB
func ConnectToMongoDB(mongoUri string) error {
	// Configuración del cliente
	clientOptions := options.Client().ApplyURI(mongoUri)

	// Conectar al cliente
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return err
	}

	// Probar la conexión
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := client.Ping(ctx, nil); err != nil {
		return err
	}

	// Almacenar cliente globalmente
	MongoClient = client
	log.Println("MongoDB conectado con éxito")
	return nil
}

// CloseMongoDB cierra la conexión a la base de datos MongoDB
func CloseMongoDB() {
	if MongoClient != nil {
		if err := MongoClient.Disconnect(context.TODO()); err != nil {
			log.Fatalf("Error al desconectar de MongoDB: %v", err)
		}
		log.Println("MongoDB desconectado con éxito")
	}
}

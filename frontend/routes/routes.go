package routes

import (
	"frontend/controllers"

	"github.com/gin-gonic/gin"
)

// Routes configura las rutas del servidor
func Routes(route *gin.Engine) {
	route.GET("/", func(c *gin.Context) {
		c.HTML(200, "index.html", nil)
	})

	route.GET("/products", controllers.GetProduct)
	route.GET("/products/order", controllers.ShowOrderForm)
	route.POST("/products/order", controllers.CreateOrder)

}

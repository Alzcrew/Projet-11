const express = require('express')
const dotEnv = require('dotenv')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const swaggerDocs = yaml.load('./swagger.yaml')
const dbConnection = require('./database/connection')

dotEnv.config()

const app = express()
const PORT = process.env.PORT || 3001
const path = require('path');

// Connect to the database
dbConnection()

// Handle CORS issues
app.use(cors())

// Request payload middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handle custom routes
app.use('/api/v1/user', require('./routes/userRoutes'))

// API Documentation
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

app.use(express.static(path.join(__dirname, '../../Frontend/ArgentBank/index.html')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../Frontend/ArgentBank', 'index.html'));
});




app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})

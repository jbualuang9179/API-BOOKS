const express = require('express');
const app = express();
const books = require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.json()) // Middleware คือ โค้ดที่ทำหน้าที่เป็นตัวกรอง request ก่อนที่จะเข้ามาถึงแอพพลิเคชั่นของเราครับ ว่าง่ายๆคือก่อนที่จะเข้ามาถึง app.get หรือ app.post เนี่ย มันจะต้องผ่าน middleware ก่อน โดยเราสามารถใช้งาน middleware ได้ผ่าน app.use()
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log('Start server at port 3000');
})

app.get('/books', (req, res) => {
    res.json(books)
})

app.get('/books/:id', (req, res) => {
    res.json(books.find(book => book.id === req.params.id))
})

app.post('/books', (req, res) => {
    books.push(req.body)
    res.status(201).json(req.body)
})

// api for update books from ID
app.put('/books/:id', (req, res) => {
    const updateIndex = books.findIndex(book => book.id === req.params.id)
    res.json(Object.assign(books[updateIndex], req.body))
})

// api for delete
app.delete('/books/:id', (req, res) => {
    const deletedIndex = books.findIndex(book => book.id === req.params.id)
    books.splice(deletedIndex, 1)
    res.status(204).send()
})
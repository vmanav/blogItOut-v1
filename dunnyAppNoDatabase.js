// This is a dummy example without any database in backend
// we have use 'blogs' array to impersonate the array we get from out database

const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'hbs')

const blogs = [{
    id: 1,
    title: 'My awesome post about web',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
}, {
    id: 2,
    title: 'My second post on cats.',
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
}]


app.get('/', (req, res) => {

    const selectedBlog = blogs.find(b => b.id == req.query.blog)
    res.render('index', { blogs, selectedBlog })
    // res.render('index', { blogs })
})

app.get('/add', (req, res) => {
    res.render('add')
})

// here we create a post request at "/" because we have specfied the action="/"
app.post('/', (req, res) => {
    blogs.push({
        id: blogs.length+1,
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    })
    res.redirect('/?blog=' + blogs[blogs.length- 1].id)
})

app.listen(3000, function () {
    console.log("Running on http://localhost:3000/")
})



// Now ,we will create a dummy 'blogs' array to impersonate the array we get from our database
// saved as : 'dunnyAppNoDatabase'

const express = require('express')
const { getAllBlogs, insertBlog, findToEdit, updateBlog } = require('./database')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'hbs')
app.use('/', express.static(__dirname + '/public'))


app.get('/', (req, res) => {

    getAllBlogs()
        .then(blogs => {
            const blogId = req.query.blog
            // beacause we are getting it at : `/?blog='some_id'`
            const selectedBlog = blogs.find(b => b._id == blogId)
            // console.log(selectedBlog)

            res.render('index', { blogs, selectedBlog })
        })
})


app.get('/add', (req, res) => {
    res.render('add')
})


// here we create a post request at "/" because we have specfied the action="/"
app.post('/', (req, res) => {

    insertBlog({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    })
        .then(commandResult => {
            res.redirect('/?blog=' + commandResult.ops[0]._id)

            // we get the inserted object in commandResult.ops[0],
            // and its _id at : commandResult.ops[0]._id
        })
})


app.get('/edit', (req, res) => {

    if (!req.query.blog) {
        res.sendStatus(404);
        return;
    }
    let blogId = req.query.blog
    findToEdit(blogId)
        .then((selectedBlog) => {

            res.render('edit', { selectedBlog })
        })
})


app.post('/edit', (req, res) => {

    console.log("post request on `/edit`.");
    let blogId = req.query.blog
    console.log("Blog Id :--> ", blogId)
    updateBlog(blogId, {
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    })
        .then(() => {

            // This is the commandResult -->
            res.redirect('/?blog=' + blogId)
        })
})

app.listen(3000, function () {
    console.log("Running on http://localhost:3000/")
})
// First, we will write all our crud operations and test them seperately
const { MongoClient } = require('mongodb')

// To Solve the issue:
// ReferenceError: ObjectId is not defined
var ObjectId = require('mongodb').ObjectID;


// Connection URL
const url = 'mongodb://localhost:27017';

// 'connectdb' is our function
const connectdb = (dbName) => {
    // ` { useNewUrlParser: true } `
    // => this is added to avoid the warning : (node:2392) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version.
    return MongoClient.connect(url, { useNewUrlParser: true }).then(client => client.db(dbName))
}


// Testing the connection :->/
connectdb('blogdb').then(db => {
    console.log("Connected Succefully.")
})


// // Inserting Blogs in db

// connectdb('blogdb').then(db =>{
//     const blogs = db.collection('blogs')
//     // return blogs.insertOne({
//     //     title: "First db Blog",
//     //     body: "The First Blog.The First Blog.The First Blog.The First Blog.The First Blog.The First Blog.The First Blog.",
//     //     author: "deadshot"
//     // })
//     return blogs.insertMany([{
//         title: "My first post about web.",
//         body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//         author: "A"
//     },{
//         title: "My second post about web.",
//         body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//         author: "B"
//     }])
// })



// // Deleting All Blogs in Database

// connectdb('blogdb').then(db => {
//     const blogs= db.collection('blogs')
//     return blogs.deleteMany({})
//     })
//     .then(()=> console.log("Deleted All Blogs"))



// // Getting All Blogs from db

// function getAllBogs() {
//     console.log("in getAllBlogs")

//     return connectdb('blogdb').then(db =>{
//         return db.collection('blogs').find()        
//     })
//     .then(blogCursor => blogCursor.toArray())
//     .then((blogsArray) =>{
//         if(blogsArray.length == 0)
//         console.log("0 Blogs in database.")
//         else{
//             console.log(blogsArray)
//             // to get the id of blogs in blogsArray
//             // blogsArray.forEach ( (t)=> {
//             //     console.log(t._id)
//             // })
//         }
//     })
//     .then(()=>{
//         console.log("---------------->")
//         // to check the completeion
//     })
// }
// getAllBogs();



// Function to get All Blogs written with Arrow syntax
const getAllBlogs = () =>
    connectdb('blogdb')
        .then(db => db.collection('blogs').find())
        .then(blogCursor => blogCursor.toArray())


const insertBlog = blog =>
    connectdb('blogdb')
        .then(db => db.collection('blogs'))
        .then(collection => collection.insertOne(blog))
// this returns a Command Result


const updateBlog = (blogId, blog) =>
    connectdb('blogdb')
        .then(db => db.collection('blogs').updateOne({ "_id": ObjectId(blogId), }, { $set: blog }))
// this returns a Command Result


// blogid is a `string`
const findToEdit = (blogid) =>
    connectdb('blogdb')
        .then(db => db.collection('blogs').findOne(
            // {title: `Lipsum Histtory`}
            { "_id": ObjectId(blogid), }
        ))
//This returns  an 'obejct'


module.exports = {
    getAllBlogs,
    insertBlog,
    findToEdit,
    updateBlog
}
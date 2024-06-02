const express=require('express')
const app=express();
const mongoose=require('mongoose')

// Important res.render() alaways looks at views folder so make sure to keep views folder at root level of gthe project.
const Blog=require('./models/blog');
// connect to mongo db database
const db_con_string='mongodb+srv://Siddhu:Siddhu@siddhucluster0.lh8pubh.mongodb.net/?retryWrites=true&w=majority&appName=Siddhucluster0';
mongoose.connect(db_con_string).then((result)=>{
    console.log("connected to db");
    // Here we are ensuring that we only listen for the requests after connecting to the databse
    app.listen(3000);
}).catch((err)=>{
    console.log(err);
})
//  Set the EJS as view engine for our app
// default folder looked by ejs is views folder that contains html files (like templates in django)
app.set('view engine','ejs');

// we can use app.set('views','my views'); our own folder to look for views
//  listen for requests
// app.listen(3000);

// Express automatically sets the status code
// middleware for accessing static files 
app.use(express.static('public'));


// Middleware for getting the parameters from HTML forms or URL and storing it in req.body
app.use(express.urlencoded({extended:true}));




// app.use((req,res,next)=>
// {
// console.log("got a request");
// console.log(req.url);
// // next is saying it to next request handler which is app.get('/) but if there is a response sent in the app.use() it wn't go because middleware only works till befire sending response.
// next() 
// });

app.get('/',(req,res)=>
{   
    res.redirect('/blogs');
    // res.render('index', { title: 'Home', blogs });
});

app.get('/about',(req,res)=>{
    res.render('about', { title: 'About' });
});

//  redirects

app.get('/about-me',(req,res)=>{
    // redirected to /about
res.redirect('/about');
})

app.get('/create',(req,res)=>
{
    res.render('create', { title: 'Create a new blog' });
})

// get the blogs
app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1}).then((result)=>
    {
        res.render('index',{ title:"All blogs",blogs:result })
    }).catch((err)=>
    {
        console.log(err);
    })
}); 

app.post('/blogs',(req,res)=>
{
    console.log(req.body);
    const blog=new Blog({title:req.body.title,snippet:req.body.snippet,body: req.body.body});
    // we can also use const body=Blog(req.body);
    
    blog.save().then((result)=>
    {
        res.redirect("/blogs")
    }).catch((err)=>
    {
        console.log(err);
    })
});

//  get one blog by id
app.get('/blogs/:id',(req,res)=>
{
    const id=req.params.id;
    console.log(id);
    Blog.findById(id).then((result)=>{
        res.render('details',{title:"blog details",blog:result})
    }).catch((err)=>
        {
            console.log(err);
            
        }
    )
})
app.delete('/blogs/:id',(req,res)=>
    {
        
        const id=req.params.id;
        console.log(id);
        Blog.findByIdAndDelete(id).then((result)=>
        {
            console.log("blog deleted");
            res.redirect('/blogs');
        }).catch((err)=>{
            console.log(err);
        })
    })
// Mongoose sandbox routes
app.get('/add_blog',(req,res)=>{
    const blog=new Blog({
        title:"New_blog",
        snippet: "new_blog_snippet",
        body: "new_blog_body"
    });
    // model_instance.save() is used to add the document to the collection, here we use instacne
    blog.save().then((result)=>{
    console.log("blog updated")
    res.send(blog);
    }
).catch((err)=>
    {
        console.log(err);
    }
    );
})

app.get('/all_blogs',(req,res)=>
{
    // blog_model.find() gives all the documents in the collection here we are using model not the instance
    Blog.find().then((result)=>
    {   console.log("Got all blogs");
        res.send(result);
    }
    ).catch((err)=>{
        console.log(err);
    })
})
app.get('/blog_by_id',(req,res)=>
    {

        // We use model.findById() to get the document with the id
        Blog.findById('665b6573ac3142788145d36e').then((result)=>
        {
            console.log(result);
            res.send(result);
        }).catch((err)=>
        {
            console.log(err);
        })
    }
)

//  delete by id

// 404 page
//  Be careful app.use should be the last thing in the code, because it triggers for all paths so, keep it at the end so that it won't reach the end 
app.use((req,res)=>
{
    res.status(404).render('404', { title: '404' });

});
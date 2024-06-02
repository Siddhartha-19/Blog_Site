const mongoose=require('mongoose');
const schema=mongoose.Schema;
//  const blog_schema=schema({properties with type as an object},{timestamps:true})
const blog_schema=schema({
    title:{
        type:String,
        required:true
    },
    snippet:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
}, {timestamps:true})

// const Blog=mongoose.model('collection_name_singular',schema) we use this to create model always remember to use collection name as sigular of the actual collection name in database

const Blog=mongoose.model('Blog',blog_schema);
module.exports=Blog;
// For exporting multiple we use module.exports={object1,object2}
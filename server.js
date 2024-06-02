const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res)=>
{
    console.log('request made');
    console.log(req.url);
    res.setHeader('content-Type','text/plain');
    // for sending the response we use res.write after that to send we have to use res.end()
    res.write('Hi I am Swathi');
    res.statusCode=200;
    res.end();
    // for status code we use res.statusCode=200
    // For sending the HTML pages
    // To redirect we use res.setHeader('location','new_url_path')
    // res.setHeader('content-Type','text/html');
    // fs.readfile(path,(err,data)=>{
    //     if (err)
    //         {
    //             res.statusCode=404;
    //         }
    //     else
    //     {
    //         // data contains html contents
    //         res.write(data) 
    //         res.end()
    //     }

    // })
    // res.write();
    // res.statusCode=200;
    // res.end();

     
});

server.listen(3000,'localhost', () =>
    {
        console.log('Started listening to the port 3000');
    }
);

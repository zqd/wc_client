module.exports ={
    entry:"./src/client.js",
    output:{
        path :"./dist",
        filename:"bundle.js"
    },
    module:{
        loaders:[{
            test:/\.js/,
            loader:"babel"
        }]
    }
}
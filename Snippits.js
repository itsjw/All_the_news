




mongoose.Promise = Promise;
// //If running on Heroku, connect using that config variable.
if(process.env.MONGODB_URI){
    mongoose.connect(process.env.MONGODB_URI,
    {
        useMongoClient: true
    },
    function(){
//         //Callback function to make sure that things are working in Prod.
        console.log("Connected in Production Environment");
    });
}






var PORT = process.env.PORT || 3000;
var db = process.env.MONGODB_URI || “another url”
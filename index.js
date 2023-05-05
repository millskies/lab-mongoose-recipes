const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const recipe1 = data[0];
const recipe2 = data[1];
const recipe3 = data[2];
const recipe4 = data[3];
const recipe5 = data[4];

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
   return Recipe.create(recipe1);
  })
  .then((recipe) => {
    console.log(recipe1.title);
    
    return Recipe.insertMany([recipe2, recipe3, recipe4, recipe5]);
  })

  .then(() => {
    console.log(recipe2.title);
    console.log(recipe3.title);
    console.log(recipe4.title);
    console.log(recipe5.title);
    
    return Recipe.findOneAndUpdate(
       { title: 'Rigatoni alla Genovese'},
       { duration: 100 }
     );
  })

  .then(() => {
    console.log("Duration updated succefully!");
    
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })

  .then(() => {
    console.log("Carrot Cake document deleted succeful");
  })

  .then(() => {
    // return mongoose.connection.close();
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

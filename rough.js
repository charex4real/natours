npm i 
eslint prettier 
eslint-config-prettier 
eslint-plugin-prettier 

eslint-plugin-node 

npx install-peerdeps --dev eslint-config-airbnb

eslint-plugin-import eslint-plugin-jsx-ally eslint-plugin-react --save-dev



const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    price: {
      type: Number,
      required: [true, 'A tour ,ust have a price'],
    },
  });
  const Tour = mongoose.model('Tour', tourSchema);
  const testTour = new Tour({
    name: 'The Forest Hiker',
    rating: 4.7,
    price: 497,
  });
  testTour
    .save()
    .then((doc) => console.log(doc))
    .catch((err) => console.log('Error:', err));

  
    pm.environment.set("jwt", pm.response.json().token);
    mongodb+srv://charex4real:<eaIpfdFjBb4yw2Bq>@cluster0.tjppx.mongodb.net/
    git rm -r –cached node_modules
     && 
    git commit -m “Remove node_modules”
    git add -A
    
    //Security Approaches Path Traversal
    //Poison Null Bytes Attack
    // To prevent this kind of attack from thwarting security, 
    // you only need to validate the user input with the following:

    if (user_input.indexOf('\0') !== -1) {
    return respond('Access denied');
    }

    exports.validationPath = (user_input) =>{
      if (user_input.indexOf('\0') !== -1) {
        return 'Access denied';
      }
      if(!/^[a-z0-9]+$/.test(user_input)){
        return 'Access denied';

      }
    }
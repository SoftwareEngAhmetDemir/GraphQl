const mongoose = require('mongoose');

const uri = "mongodb+srv://1111:1111@cluster0.5rw6a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

// const db = mongoose.connection;

const event = mongoose.model('Event', 
{ title: {
    type:String,
    required: true
},
description:
{
    type: String,
    required: true
},
price:{
    type: Number,
    required: true
},
date:{
    type: Date , 
    required: true
}

}
);

 //const kitty = new Cat({ name: 'Zildjian' });

module.exports = event;
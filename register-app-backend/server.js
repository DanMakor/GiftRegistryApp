import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import jwt from 'express-jwt';

import './config/passport';
import RegistryItem from './models/RegistryItem';
import User from './models/User';
import Category from './models/Category';

const html = __dirname + '/dist';
const APP_KEY = "AandDRegistry";
const API_URL = "/api"

var auth = jwt({
  secret: 'ANNEKE',
  userProperty: 'payload'
});

const app = express();
export const router = express.Router();
const corsOptions = {
    origin: "http://localhost:80",
    optionsSuccessStatus: 200
}

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(cors(corsOptions));

mongoose.connect('mongodb://localhost:27017/GiftRegistry', { useNewUrlParser: true }).catch(function(err) { console.log(err); });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

app.use(API_URL, router);
app.listen(80, () => console.log(`Express server running on port 80`));

router.route('/registry-items/add').post((req, res) => {
    console.log(req.body);
    let registryItem = new RegistryItem(req.body);
    console.log(registryItem);
    registryItem.save()
        .then(registryItem => {
            res.status(200).json({'registryItem': 'Added successfully'});
            console.log(registryItem);
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/registry-items/update').put((req, res) => {
    console.log(req.body);
    RegistryItem.findOneAndUpdate({ _id: req.body._id}, req.body, (err, registryItem) => {
        res.json(registryItem);
    })
});

router.route('/registry-items/delete/:id').get((req, res) => {
    RegistryItem.findByIdAndRemove({_id: req.params.id}, (err, registryItem) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});
router.route('/register').post((req, res) => {
    var user = new User();
    user.name = req.body.name;

    if (req.body.password !== APP_KEY) {
        res.status(500).json("Incorrect password");
        return;
    }

    User.find({ name: user.name }, (err, otherUsers) => {
        console.log(user);
        if (!otherUsers.length) {
            user.save(function(err) {
                var token;
                token = user.generateJwt();
                res.status(200);
                res.json({
                    "token": token
                })
            })
        } else {
            res.status(500).json("There is already a user registered with this name");
        }
    })
    

})

router.route('/login').post((req, res) => {
    

    if (req.body.password !== APP_KEY) {
        res.status(500).json("Incorrect password");
        return;
    }
        
    passport.authenticate('local', function(err, user, info) {
        var token;
        
        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }
    
        // If a user is found
        if (user){
            token = user.generateJwt();
            res.status(200);
            res.json({
            "token" : token
            });
        } else {
            // If user is not found
            res.status(500).json("There is no user registered with this name");
        }
        })(req, res);
})

router.route('/categories/add').post((req, res) => {
    let category = new Category(req.body);
    category.save()
        .then(category => {
            res.status(200).json({'category': 'Added successfully'});
            console.log(category);
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/categories').get(auth, (req, res) => {
    // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    Category.find((err, categories) => {
        if (err)
            console.log(err);
        else
            console.log(res.header);
            res.json(categories);
    });
  }
});

//Registry Item List Actions

router.route('/registry-items').get(auth, (req, res) => {
    // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    RegistryItem.find().populate('category').exec((err, registryItems) => {
        if (err)
            console.log(err);
        else
            console.log(registryItems);
            res.json(registryItems);
    });
  }
});
app.use(express.static(__dirname + '/dist'));
app.use('/*',  function(req, res){
    res.sendFile(__dirname + '/dist/index.html');
});
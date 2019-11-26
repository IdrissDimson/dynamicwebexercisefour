const express = require('express');
const router = express.Router();
const firebase = require('firebase/app');
require("firebase/firestore");

//firebase configeration key
let firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "idriss-exercise-four.firebaseapp.com",
    databaseURL: "https://idriss-exercise-four.firebaseio.com",
    projectId: "idriss-exercise-four"
};
// Initialize Firebase
const firebaseDatabase = firebase.initializeApp(firebaseConfig);
const db = firebaseDatabase.firestore();

let allPosts = [];
db.collection('blog-posts')
    .get()
    .then((blogPosts) => {
        blogPosts.forEach((post) => {
            allPosts.push(post.data())
            console.log("All posts:", post.data())
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    })

router.get('/', (req, res) => {
    res.send(allPosts)
})

module.exports = router;
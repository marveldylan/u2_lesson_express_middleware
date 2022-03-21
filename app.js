const express = require('express')
// Must add in cors to Express:
const cors = require('cors')
const res = require('express/lib/response')
const app = express()
const PORT = process.env.PORT || 3001
// Your Code Here

// MIDDLEWARE - comes before route logic - middleware functions have access to res and req objects, alon giwth the next() middleware function.
// Middleware functions can perform the following tasks:
// - Execute any code
// - Make changes to the request and response objects
// - End the request-response cycle
// - Call the next middleware function in the stack

// Using the cors middleware - .use() method tells Express app to use the following packages:
// cors package enables cross origin resource sharing for our app. - allows requests from other origins outside app, otherwise things like React will block the outside requests:
app.use(cors())

// Using json middleware
// The json method allows us to send json info to our surver and the urlEncoded method allows us to send encoded forms to our server:
app.use(express.json())
app.use(express.urlencoded({ extended:false }))


// ROUTE LOGIC

// Get with middleware
app.get(
  // get parameter 1 - route string:
  '/middleware', 
  // get parameter 2 - middleware function with request, response, nect
  (request, response, next) => {
  console.log('Got middleware?');
  next();
  },
  // get parameter 3 - req and res / Route response handling after middleware handling
  (req, res) => {
    res.send('response is completed')
  }
)

// POST with middleware
app.post('/post-middleware',
(request, response, next) => {
  console.log('Post Malone-Ware');
  next();
}, (req, res) => {
  res.send({msg:'post complete'});
}
)

// PUT with middleware
app.put('/put-middleware/:username',
  (request, response, next) => {
    response.send(`Put middleware with dynamic username ${ request.params.username }`);
    next();
  }, (req, res) => {
    res.send(`Username is ${request.params.username}`);
  }
)

// DELETE with middleware
app.delete('/delete-middleware',
  (request, response, next) => {
    console.log('I am the delete middleware');
    next();
  }, (req, res) => {
    res.send(`deleted ${req.query.myName}`)
  }
)

// Your Code Ends Here
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`)
})

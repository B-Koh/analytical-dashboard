const express         = require('express');
const bodyParser      = require('body-parser');
const cors            = require('cors');
const {v4 : uuidv4}   = require('uuid');
const user            = require("./routes/userRoutes");
const path            = require('path'); 

const app = express();
app.use(bodyParser.json());
// Parse URL-encoded bodies (for form data)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: '*/*' }));
app.use(cors({
  origin: '*'
}));

app.use(user);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const port = 3000; // Set the desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const express         = require("express")
const router          = express.Router();
const bcrypt          = require("bcrypt");
const db              = require('../models/dbconnection'); 
const auth            = require("../middleware/auth");
const jwt             = require("jsonwebtoken");

router.post('/register', (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  const password_repeat = req.body.repeat_password;

  console.log(username);

  // password (repeat) does not match jfdsnf
  if (password !== password_repeat) {
    return res.status(400).send({
      msg: 'Both passwords must match'
    });

  }


  try{
    //check if the email is already in the database
    db.query(`SELECT username FROM users WHERE LOWER(username) = LOWER(${db.escape(username)});`, (err, results) => {

      if(results.length){
        return res.status(409).send({
          msg: 'This user is already in use!'
        });
      }
      else{
        bcrypt.hash(password, 10, (err, hash) => {
          if(err){
            return res.status(500).send({
              msg: err
            });
          }
          else{
            db.query(
              `INSERT INTO users (username, password, admin) VALUES (${db.escape(username)}, ${db.escape(hash)}, false)`, (err, result) => {
                  if (err) {
                      return res.status(400).send({
                          msg: err
                      });
                  }
                  const admin = false;
                  res.render('index', { admin });
                  // return res.status(201).send({
                  //     msg: 'The user has been registerd with us!'
                  // });
              }
            );
          }
        })
      }

    });
    
    }catch(error){
      res.status(500).send(error);
    }
});

router.post('/login', async(req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    try{
      db.query(`SELECT * FROM users WHERE username = ${db.escape(username)};`, async(err, result) => {
        // user does not exists
        if (err) {
          return res.status(400).send({
              msg: err
          });
        }
        if (!result.length) {
            return res.status(401).send({
                msg: 'User does not exist!'
            });
        }

        const flag = await bcrypt.compare(
          password,
          result[0]['password']); 
          
          //(bcErr, bcResult) => {
             // wrong password
             if (!flag) {
              return res.status(401).send({
                  msg: 'Wrong Password'
              });
            }

            if(flag){
              jwt.sign({id:result[0].id}, 'secret-key' ,{ expiresIn: 10000,}, (err, token) => {
                if(err) throw err;
                if (err){
                  return res.status(401).send({
                    msg: 'Authentication Error'
                });
                }
                // res.status(200).send({
                //   msg: 'Logged in!',
                //   token,
                //   user: result[0]
                // });
                const admin = !!+result[0].admin;
                //const admin = true;
                res.render('index', { admin });
              });
            }

          //});
      });

    }catch(error){
      res.status(500).send(error);
    }
});

router.get('/logout', (req, res) => {
  // Clear the JWT cookie
  res.clearCookie('jwtToken');

  // Send a successful logout response
  //res.status(200).send('Logout successful');
  res.render('logout');
});

router.get('/users', (req, res) => {
  res.render('users')
  
});


router.post('/user', (req, res) => {
  const password = req.body.password;
  const username = req.body.username;
  const id = req.body.id;
  const admin = req.body.admin;
  
  bcrypt.hash(password, 10, async (err, hash) => {
    if(err){
      return res.status(500).send({
        msg: err
      });
    }
    else{
       db.query(
        `INSERT INTO users (id, username, password, admin) VALUES (${id}, ${db.escape(username)}, ${db.escape(hash)},${admin})`, (err, result) => {
          if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred' });
            return;
          }

          // Fetch updated data from the database after deletion
          db.query('SELECT * FROM `users`', (err, results) => {
            if (err) {
              console.error('Error executing query:', err);
              res.status(500).json({ error: 'An error occurred' });
              return;
            }

            // Update the grid's data source with the updated data
            res.status(200).json({ data: results});
          });

          
        }
      );
    }
  });
  
   
});

router.get('/user', (req, res) => {
  const query = 'SELECT * FROM users'; 

  // Execute the query
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }
    res.json(results);
    
  });
});

router.delete('/user/:id', (req,res) => {

  db.query('DELETE FROM `users` WHERE `id`=?', [req.params.id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }
    });

     // Fetch updated data from the database after deletion
     db.query('SELECT * FROM `users`', (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }

      // Update the grid's data source with the updated data
      res.status(200).json({ data: results });
    });
});

router.put('/user/:id', (req,res) => {

  db.query('UPDATE users SET username=?,password=?,admin=? WHERE id = ?', [req.body.username,req.body.password,req.body.admin, req.params.id], (err, res) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }
    });
    // Fetch updated data from the database after deletion
    db.query('SELECT * FROM `users`', (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }

      // Update the grid's data source with the updated data
      res.status(200).json({ data: results });
    });
});

router.patch('/user/:id', (req,res) => {
  const {columnName , value} = req.body;

  db.query('UPDATE users SET ${columnName} = ? WHERE id = ?' , [value, req.params.id], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }

  });
  // Fetch updated data from the database after deletion
  db.query('SELECT * FROM `users`', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }

    // Update the grid's data source with the updated data
    res.status(200).json({ data: results });
  });

});





module.exports = router;
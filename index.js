require('dotenv').config(); // eslint-disable-line

const express = require('express'); // eslint-disable-line
const server = express();
const port = process.env.PORT || 9000; // eslint-disable-line
let id = 1;

// i have written this same function for bt more times than I can count and I FORGET HOW TO INCREMENT every single time, like a lost little lamb, stuck in the snow, hoping for a ray of light that will never come because I have to friggin GOOGLE IT EVERY SINGLE TIME

// anyway back to our regularly scheduled programming, heh, get it?

// okay, no jokes, got it.

const getID = () => {
  id++;
  return id;
};

const users = [
  {
    _id: `${id}`,
    firstname: 'Wong',
    lastname: 'Wilkinson',
    company: 'NEXGENE',
    username: 'WilWongison',
    password: '00000000',
  },
  {
    _id: `${getID()}`,
    firstname: 'Witt',
    lastname: 'Dunlap',
    company: 'QUINTITY',
    username: 'DunlappedUrWit',
    password: '00000000',
  },
  {
    _id: `${getID()}`,
    firstname: 'Romero',
    lastname: 'Blair',
    company: 'GADTRON',
    username: 'Romeo',
    password: '00000000',
  },
  {
    _id: `${getID()}`,
    firstname: 'Lilly',
    lastname: 'Fernandez',
    company: 'BLANET',
    username: 'LillyPadx',
    password: '00000000',
  },
  {
    _id: `${getID()}`,
    firstname: 'Keisha',
    lastname: 'Mayer',
    company: 'EXOSTREAM',
    username: 'KeyMayor',
    password: '00000000',
  },
  {
    _id: `${getID()}`,
    firstname: 'Marcia',
    lastname: 'Davenport',
    company: 'ISOSURE',
    username: 'MDavenport',
    password: '00000000',
  },
];

const takenUsernames = [];

const usernameMap = users.map((user, i) => {
  console.log(`username: ${user.username}, index: ${i}`);
  return takenUsernames.push(user.username);
});

console.log(takenUsernames);

server.use(express.json());

server.get('/api/users', (req, res) => {
  res.send(users);
});

server.post('/api/register', (req, res) => {
  try {
    const { username, password, firstname, lastname, company } = req.body;
    if (!username || !password) {
      res.status(404).json({
        message: 'Please provide username/password to continue.',
      });
    } else {
      const newUser = {
        _id: getID(),
        firstname: `${firstname}`,
        lastname: `${lastname}`,
        company: `${company}`,
        username: `${username}`,
        password: `${password}`,
      };

      if (newUser) {
        takenUsernames.map((username) => {
          if (newUser.username === username) {
            res.status(500).json({
              message: 'Username already in use!',
            });
          }
        });
      } 
      res.status(201).json('New User Created');
      console.log(newUser);
      users.push(newUser);
    }
  } catch {
    res.status(500).json({
      message: 'Error creating new user.',
    });
  }
});

server.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(404).json({
        message: 'Please provide username/password to continue.',
      });
    } else {
      res.status(200).json(`Hello, ${username}, welcome back!`);
    }
  } catch {
    res.status(500).json({
      message: 'Error logging in.',
    });
  }
});

server.use('*', (req, res) => {
  res.json({ message: 'API is UP!' });
});

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});

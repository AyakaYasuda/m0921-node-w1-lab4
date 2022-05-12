const router = require('express').Router();
const uuid = require('uuid');

const members = [
  { id: uuid.v4(), name: 'Mario', email: 'mario@mail.com' },
  { id: uuid.v4(), name: 'Luigi', email: 'luigi@mail.com' },
  { id: uuid.v4(), name: 'Yoshi', email: 'yoshi@mail.com' },
];

router.get('/', (req, res) =>
  res.render('home', { members: members, pageTitle: 'Home' })
);

router.get('/:id', (req, res) => {
  const paramsID = req.params.id;

  const found = members.some((member) => member.id === paramsID);

  const member = members.filter((member) => member.id === paramsID)[0];

  if (found) {
    res.render('member', { member: member, pageTitle: "Member's Page" });
  } else {
    res.status(400).json({ msg: `Member with id: ${paramsID}, is not found ` });
  }
});

router.post('/', (req, res) => {
  const newData = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
  };

  members.push(newData);
  res.render('home', { members: members, pageTitle: 'Home' });
});

router.post('/update/:id', (req, res) => {
  const paramsID = req.params.id;
  const found = members.some((member) => member.id === paramsID);

  if (found) {
    const { name, email } = req.body;

    //mutate
    members.forEach((member) => {
      if (member.id === paramsID) {
        name && (member.name = name);
        email && (member.email = email);
      }
    });

    res.redirect('/');
  } else {
    res.status(400).json({ msg: `Member with id: ${paramsID}, is not found ` });
  }
});

router.post('/delete/:id', (req, res) => {
  const paramsID = req.params.id;
  const found = members.some((member) => member.id === paramsID);

  if (found) {
    members.splice(
      members.findIndex((member) => member.id === paramsID),
      1
    );
    res.redirect('/');
  } else {
    res.status(400).json({ msg: `Member with id: ${paramsID}, is not found ` });
  }
});

module.exports = router;

import express from 'express'; // express를 가져옵니다

const app = express(); // app이라는 변수에 express()를 담습니다
const port = 3000;    // port라는 변수에 3000 할당합니다.

app.use(express.json()); // 입력으로 json을 받을수 있습니다.

let nextId = 4; // movies 변수에 id를 설정합니다

let movies = [ // movies 배열
  { // movies[0]
    id: 1,
    title: 'Avengers',
  },
  { // movies [1]
    id: 2,
    title: 'Spider-man',
  },
  { // movies [2]
    id: 3,
    title: 'Harry Potter',
  },
];

	app.get("/movies", (req, res) => {
  res.json(movies);
});


// /movie 주소로 get요청을 보낼시(body에 id를 포함하였을때) 해당 id인 영화를 보여줍니다.
app.get('/movie', (req, res) => {  
  const index = movies.findIndex(movie => movie.id === req.body.id);
  if (index === -1) { // 해당 영화가 없다면 error: "That movie does not exist"
    return res.json({
      error: "That movie does not exist",
    });
  }
  res.json(movies.filter(movie => movie.id === req.body.id)[0]);
});


// /movies주소로 post요청을 보낼시 배열에 새로운 영화를 추가하여줍니다.
app.post('/movies', (req, res) => { 
  movies.push({
    id: nextId++, // 처음 nextId 4가 들어간후 nextId가 5가 됩니다
    title: req.body.title, // req.body.title이 있어야합니다.
  });
  res.json(movies);
});


// /movies주소로 put요청을 보낼시 id에 해당하는 영화를 바꿔줍니다.
app.put('/movies', (req, res) => {
  const index = movies.findIndex(movie => movie.id === req.body.id);
  if (index === -1) { // 해당 영화가 없을시
    return res.json({
      error: "That movie does not exist",
    });
  }

  movies[index] = {
    id: req.body.id,
    title: req.body.title,
  };
  res.json(movies);
});


// /movies delete요청을 보낼시 해당 id에 해당하는 영화를 삭제합니다.
app.delete('/movies', (req, res) => {
  movies = movies.filter(movie => movie.id !== req.body.id);
  res.json(movies);
});

	// port로 서버를 열어줍니다. 이후 console.log로 터미널에 주소를 보여줍니다.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
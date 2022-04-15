const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get('/api/fortune', (req, res) => {
  const fortunes = ['A beautiful, smart, and loving person will be coming into your life.', 'A dubious friend may be an enemy in camouflage.', 'A faithful friend is a strong defense.', 'A feather in the hand is better than a bird in the air.', 'A good friendship is often more important than a passionate romance.',];
  
  let randomIndex = Math.floor(Math.random() * fortunes.length);
  let randomFortune = fortunes[randomIndex];
  
  res.status(200).send(randomFortune);
  
})
  // Sports

const {getSports, deleteSport, createSport, updateSport} = require('./controller')

app.get('/api/sports', getSports)
app.delete('/api/sports/:id', deleteSport)
app.post('/api/sports', createSport)
app.put('/api/sports/:id', updateSport)

app.listen(4000, () => console.log("Server running on 4000"));

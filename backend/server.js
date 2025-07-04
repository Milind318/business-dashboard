const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const sampleHeadlines = [
  "Why {name} is {location}'s Top Choice in 2025",
  "Discover the Secret Behind {name}'s Success in {location}",
  "{name}: The Go-To Spot for Locals in {location}",
  "Experience the Best at {name} in {location}",
  "{name} Sets the Gold Standard in {location} for 2025"
];

app.post('/business-data', (req, res) => {
  const { name, location } = req.body;

  const randomHeadline = sampleHeadlines[Math.floor(Math.random() * sampleHeadlines.length)]
    .replace('{name}', name)
    .replace('{location}', location);

  res.json({
    rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 500) + 50,
    headline: randomHeadline
  });
});

app.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query;

  const randomHeadline = sampleHeadlines[Math.floor(Math.random() * sampleHeadlines.length)]
    .replace('{name}', name)
    .replace('{location}', location);

  res.json({ headline: randomHeadline });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

module.exports.homePage = (req, res) => {
  const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Why did the scarecrow win an award? He was outstanding in his field!",
    "Why don't eggs tell jokes? They'd crack each other up!",
    "What do you call a fake noodle? An impasta!",
    "Why did the math book look so sad? Because it had too many problems!",
  ];

  const data = {
    name: "Joke Collection",
    jokes: jokes,
  };

  res.send(data);
};

module.exports.aboutPage = (req, res) => {
  res.send("This is About Page");
};
module.exports.servicePage = (req, res) => {
  res.send("This is service Page");
};

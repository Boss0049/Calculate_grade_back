const grade = (req, res) => {
  const { ...scores } = req.body;
  let sum = 0;
  let count = 0;
  for (score in scores) {
    for (valueScore in scores[score]) {
      if (changeGrade(scores[score][valueScore]) !== -1) {
        sum += changeGrade(scores[score][valueScore]);
        count++;
      }
    }
  }
  if (sum < 0) {
    res.status(400).send({ message: "Something wrong" });
  } else {
    res.status(200).send({ result: sum / count });
  }
};

const changeGrade = (value) => {
  switch (value) {
    case "A":
      return 4;
    case "B+":
      return 3.5;
    case "B":
      return 3;
    case "C+":
      return 2.5;
    case "C":
      return 2;
    case "D+":
      return 1.5;
    case "D":
      return 1;
    case "F":
      return 0;
    default:
      return -1;
  }
};

module.exports = {
  grade,
};

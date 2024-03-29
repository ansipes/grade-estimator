let exercisesQuizzes = document.querySelector("#exercisesQuizzes");
let exercisesQuizzesLock = document.querySelector("#exercisesQuizzesLock");
let participation = document.querySelector("#participation");
let participationLock = document.querySelector("#participationLock");
let projectOne = document.querySelector("#projectOne");
let projectOneLock = document.querySelector("#projectOneLock");
let projectTwo = document.querySelector("#projectTwo");
let projectTwoLock = document.querySelector("#projectTwoLock");
let projectThree = document.querySelector("#projectThree");
let projectThreeLock = document.querySelector("#projectThreeLock");
let projectFour = document.querySelector("#projectFour");
let projectFourLock = document.querySelector("#projectFourLock");
let websiteCritique = document.querySelector("#websiteCritique");
let websiteCritiqueLock = document.querySelector("#websiteCritiqueLock");
let unexcusedAbsences = document.querySelector("#unexcusedAbsences");

let calculatedGrade = document.querySelector("#calculatedGrade");
let projectedGrade = document.querySelector("#projectedGrade");
let calculatedLetterGrade = document.querySelector("#calculatedLetterGrade");
let projectedLetterGrade = document.querySelector("#projectedLetterGrade");
let bestGrade = document.querySelector("#bestGrade");
let bestLetterGrade = document.querySelector("#bestLetterGrade");
let worstGrade = document.querySelector("#worstGrade");
let worstLetterGrade = document.querySelector("#worstLetterGrade");

let average = false;

const weights = {
  exercisesQuizzes: 0.1,
  participation: 0.1,
  projectOne: 0.15,
  projectTwo: 0.15,
  projectThree: 0.2,
  projectFour: 0.15,
  websiteCritique: 0.15,
};

function getGrade(el) {
  const locked = eval(`${el.id}Lock`).checked;
  const value = parseInt(el.value) || 0;
  const weight = weights[el.id];
  return {
    locked,
    value,
    weight,
  };
}

function getGrades() {
  return {
    exercisesQuizzes: getGrade(exercisesQuizzes),
    participation: getGrade(participation),
    projectOne: getGrade(projectOne),
    projectTwo: getGrade(projectTwo),
    projectThree: getGrade(projectThree),
    projectFour: getGrade(projectFour),
    websiteCritique: getGrade(websiteCritique),
  };
}

function getAverage() {
  const grades = getGrades();

  const lockedValues = Object.values(grades)
    .filter((grade) => grade.locked)
    .map((grade) => {
      return grade.value;
    });

  if (!lockedValues.length) return false;

  return lockedValues.reduce((a, b) => a + b) / lockedValues.length;
}

function getProjectedGrade() {
  const grades = getGrades();
  const average = getAverage();

  if (!average) return false;

  return Object.values(grades)
    .map((grade) => {
      num = grade.locked ? grade.value : average;
      return num * grade.weight;
    })
    .reduce((a, b) => a + b)
    .toFixed(2);
}

function updateProjectedGrade() {
  const grade = getProjectedGrade() - getUnexcusedAbsencesPenalty();
  const letter = getLetterGrade(grade);
  const error = "85%";
  projectedGrade.innerHTML = grade ? `${grade}%` : error;
  projectedLetterGrade.innerHTML = letter;
}

function getCalculatedGrades() {
  const grades = getGrades();

  return Object.values(grades)
    .map((grade) => {
      return grade.value * grade.weight;
    })
    .reduce((a, b) => a + b)
    .toFixed(2);
}

function getUnexcusedAbsencesPenalty() {
  const count = parseInt(unexcusedAbsences.value);
  return count > 1 ? count : 0;
}

function updateCalculatedGrade() {
  const grade = getCalculatedGrades() - getUnexcusedAbsencesPenalty();
  const letter = getLetterGrade(grade);
  calculatedGrade.innerHTML = `${grade}%`;
  calculatedLetterGrade.innerHTML = letter;
}

function getWorstGrade() {
  const grades = getGrades();

  return Object.values(grades)
    .map((grade) => {
      num = grade.locked ? grade.value : 0;
      return num * grade.weight;
    })
    .reduce((a, b) => a + b)
    .toFixed(2);
}

function updateWorstGrade() {
  const grade = getWorstGrade() - getUnexcusedAbsencesPenalty();
  const letter = getLetterGrade(grade);
  worstGrade.innerHTML = `${grade}%`;
  worstLetterGrade.innerHTML = letter;
}

function getBestGrade() {
  const grades = getGrades();

  return Object.values(grades)
    .map((grade) => {
      num = grade.locked ? grade.value : 100;
      return num * grade.weight;
    })
    .reduce((a, b) => a + b)
    .toFixed(2);
}

function getLetterGrade(grade) {
  if (grade > 94) return "A";
  if (grade > 90) return "A-";
  if (grade > 87) return "B+";
  if (grade > 83) return "B";
  if (grade > 80) return "B-";
  if (grade > 77) return "C+";
  if (grade > 73) return "C";
  if (grade > 70) return "C-";
  if (grade > 67) return "D+";
  if (grade > 60) return "D";
  return "F";
}

function updateBestGrade() {
  const grade = getBestGrade() - getUnexcusedAbsencesPenalty();
  const letter = getLetterGrade(grade);
  bestGrade.innerHTML = `${grade}%`;
  bestLetterGrade.innerHTML = letter;
}

function updateGrades() {
  updateCalculatedGrade();
  updateProjectedGrade();
  updateWorstGrade();
  updateBestGrade();
}

exercisesQuizzes.addEventListener("input", updateGrades);
participation.addEventListener("input", updateGrades);
projectOne.addEventListener("input", updateGrades);
projectTwo.addEventListener("input", updateGrades);
projectThree.addEventListener("input", updateGrades);
projectFour.addEventListener("input", updateGrades);
websiteCritique.addEventListener("input", updateGrades);
exercisesQuizzesLock.addEventListener("input", updateGrades);
participationLock.addEventListener("input", updateGrades);
projectOneLock.addEventListener("input", updateGrades);
projectTwoLock.addEventListener("input", updateGrades);
projectThreeLock.addEventListener("input", updateGrades);
projectFourLock.addEventListener("input", updateGrades);
websiteCritiqueLock.addEventListener("input", updateGrades);
unexcusedAbsences.addEventListener("input", updateGrades);

updateGrades();

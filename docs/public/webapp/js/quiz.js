// Quiz logic - load questions, handle answers, submit

const ATTEMPT_KEY = 'quiz_current_attempt';

function getSetIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('set') || '1';
}

function loadAttempt() {
  try {
    const data = localStorage.getItem(ATTEMPT_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function saveAttempt(attempt) {
  localStorage.setItem(ATTEMPT_KEY, JSON.stringify(attempt));
}

function clearAttempt() {
  localStorage.removeItem(ATTEMPT_KEY);
}

function startQuiz(setId) {
  const questions = getRandomQuestions(setId, 20);
  if (questions.length < 20) return null;
  const id = typeof setId === 'string' ? parseInt(setId, 10) : setId;
  const set = QUESTION_BANK[id];
  if (!set) return null;
  const attempt = {
    setId,
    setName: set.name,
    questions: questions.map((q) => ({
      id: q.id,
      q: q.q,
      options: q.options,
      answer: q.answer,
      selected: null
    })),
    startTime: Date.now()
  };
  saveAttempt(attempt);
  return attempt;
}

function updateAnswer(questionIndex, selectedIndex) {
  const attempt = loadAttempt();
  if (!attempt || !attempt.questions[questionIndex]) return false;
  attempt.questions[questionIndex].selected = selectedIndex;
  saveAttempt(attempt);
  return true;
}

function submitQuiz() {
  const attempt = loadAttempt();
  if (!attempt) return null;
  let correct = 0;
  attempt.questions.forEach((q) => {
    if (q.selected === q.answer) correct++;
  });
  const total = attempt.questions.length;
  const score = Math.round((correct / total) * 100);
  attempt.endTime = Date.now();
  attempt.score = score;
  attempt.correct = correct;
  attempt.total = total;
  attempt.passed = score >= 80;
  saveAttempt(attempt);
  return attempt;
}

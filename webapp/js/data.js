// Mock question bank - 5 sets (id: 1-5), each with 25 questions for random pick of 20

const QUESTION_BANK = {
  1: {
    id: 1,
    name: '题目套 1',
    description: '题库 1',
    icon: '1',
    questions: Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      q: '',
      options: ['', '', '', ''],
      answer: 0
    }))
  },
  2: {
    id: 2,
    name: '题目套 2',
    description: '题库 2',
    icon: '2',
    questions: Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      q: '',
      options: ['', '', '', ''],
      answer: 0
    }))
  },
  3: {
    id: 3,
    name: '题目套 3',
    description: '题库 3',
    icon: '3',
    questions: Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      q: '',
      options: ['', '', '', ''],
      answer: 0
    }))
  },
  4: {
    id: 4,
    name: '题目套 4',
    description: '题库 4',
    icon: '4',
    questions: Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      q: '',
      options: ['', '', '', ''],
      answer: 0
    }))
  },
  5: {
    id: 5,
    name: '题目套 5',
    description: '题库 5',
    icon: '5',
    questions: Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      q: '',
      options: ['', '', '', ''],
      answer: 0
    }))
  }
};

const QUESTION_SETS = Object.values(QUESTION_BANK);

function getRandomQuestions(setId, count = 20) {
  const id = typeof setId === 'string' ? parseInt(setId, 10) : setId;
  const set = QUESTION_BANK[id];
  if (!set || !set.questions || set.questions.length < count) return [];
  const shuffled = [...set.questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

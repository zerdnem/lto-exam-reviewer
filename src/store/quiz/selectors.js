export const selectHasMoreQuestions = state =>
  state.questions.currentQuestionIndex < state.questions.questions.length - 1;

export const selectCurrentQuestionIndex = state => state.questions.currentQuestionIndex;

export const selectQuestionIds = state => state.questions;

export const selectCurrentQuestionId = state => state.questions.questions[state.questions.currentQuestionIndex];

export const selectCurrentQuestionData = state => {
  const currentQuestionId = selectCurrentQuestionId(state);
  return state.questions.questionsById[currentQuestionId];
};

export const selectExamList = state => state.exams;

export const selectQuestionName = state => state.questions.examName;

export const selectNumberOfQuestions = state => state.questions.questions.length;

export const selectResultData = state => {
  const answers = state.questions.answers;

  const score = state.questions.questions.reduce(
    (curScore, questionId, index) =>
      curScore +
      (answers[index] === state.questions.questionsById[questionId].correctAnswerIndex
        ? 1
        : 0),
    0,
  );

  const questionsData = state.questions.questions.map(
    questionId => state.questions.questionsById[questionId],
  );

  return {
    score,
    questionsData,
    answers,
  };
};

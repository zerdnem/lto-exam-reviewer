const buttonTexts = {
  checkUpdates: 'Check for Updates',
  share: 'Share Score',
  replay: 'Take the Test Again',
  settings: 'Settings',
  startListExams: 'Take the Test',
};

const errors = {
  startExam: 'Check your connection and try again.',
};

const codePush = {
  CHECKING_FOR_UPDATE: 'Checking for updates.',
  DOWNLOADING_PACKAGE: 'Downloading package.',
  INSTALLING_UPDATE: 'Installing update.',
  UP_TO_DATE: 'Up-to-date.',
  UPDATE_INSTALLED: 'Update installed.',
};

const menuScreen = {
  header: 'Menu',
};

const examScreen = {
  header: 'Exams',
};

const questionsScreen = {
  header: 'Questions',
  progress: 'Question %{current} / %{total}',
};

const resultScreen = {
  header: 'Results',
  score: 'Score %{score} / %{total}:',
  title: 'Results',
  share: {
    message:
      'I just reached a score of %{score} on RapQuiz. Can you beat me? Get the app on Android. %{url}',
    title: 'Can you beat my score?',
    dialogTitle: 'Share your score and challenge a friend!',
  },
};

const settingsScreen = {
  header: 'Settings',
  language: {
    header: 'Language',
    error: 'This app is not yet translated in Filipino',
  },
  app: {
    heading: 'Application',
    feedback: {
      heading: 'Feedback',
      text: 'Suggestions? Comments? Bugs?',
    },
  },
  about: {
    heading: 'Development',
    website: {
      heading: 'Website',
      text: 'Want to get in touch with me? Want to hire me?',
    },
  },
};

export default {
  btn: buttonTexts,
  error: errors,
  codePush,
  menu: menuScreen,
  exam: examScreen,
  questions: questionsScreen,
  result: resultScreen,
  settings: settingsScreen,
};

const buttonTexts = {
  playGame: '',
  checkUpdates: '',
  share: '',
  replay: '',
  lyrics: '',
  settings: '',
}

const errors = {
  startGame:
    '',
}

const codePush = {
  CHECKING_FOR_UPDATE: '',
  DOWNLOADING_PACKAGE: '',
  INSTALLING_UPDATE: '',
  UP_TO_DATE: '',
  UPDATE_INSTALLED: '',
}

const menuScreen = {
  header: '',
}

const questionsScreen = {
  header: '',
  progress: '',
}

const resultScreen = {
  header: '',
  score: '',
  title: '',
  share: {
    message:
      '',
    title: '',
    dialogTitle: '',
  },
}

const settingsScreen = {
  header: '',
  language: {
    header: '',
  },
  ads: {
    heading: '',
    remove: {
      heading: '',
      text: '',
    },
    purchased: {
      heading: '',
      text: '',
    },
  },
  app: {
    heading: '',
    feedback: {
      heading: '',
      text: '',
    },
    rate: {
      heading: '',
      text: '',
    },
  },
  about: {
    heading: '',
    website: {
      heading: '',
      text: '',
    },
    twitter: {
      heading: '',
      text: '',
    },
  },
}

export default {
  btn: buttonTexts,
  error: errors,
  codePush,
  menu: menuScreen,
  questions: questionsScreen,
  result: resultScreen,
  settings: settingsScreen,
}

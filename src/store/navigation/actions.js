import CodePush from 'react-native-code-push';
import {activeConfig} from '../../codepush';
import {getNewExamData, getListOfExams} from '../../api';
import {selectIsGameLoading, selectIsUpdating} from '../selectors';
import {rejectAfterDuration} from '../../utils';

const ActionTypes = {
  navigateBack: 'NAVIGATE_BACK',
  navigateToResult: 'NAVIGATE_TO_RESULT',
  transitionEnd: 'TRANSITION_END',
  loadNewExam: 'LOAD_NEW_EXAM',
  loadListOfExams: 'LOAD_LIST_OF_EXAMS',
  loadNewGameTimedOut: 'LOAD_NEW_GAME_TIMED_OUT',
  startNewExam: 'START_NEW_EXAM',
  fetchExams: 'FETCHING_EXAMS',
  settingsPressed: 'SETTINGS_PRESSED',
  listExamsPressed: 'LIST_EXAMS_PRESSED',
  questionAnimationStart: 'QUESTION_ANIMATION_START',
  questionAnimationFinished: 'QUESTION_ANIMATION_FINISHED',
  checkForUpdate: 'CODEPUSH_CHECK_UPDATE',
  codePushSyncChanged: 'CODEPUSH_STATUS_CHANGED',
  updateProgress: 'CODEPUSH_PROGRESS',
  updateError: 'CODEPUSH_ERROR',
};

export default ActionTypes;

export const navigateBack = () => ({
  type: ActionTypes.navigateBack,
});

export const navigateToResult = () => ({
  type: ActionTypes.navigateToResult,
});

export const createTransitionEnd = (transitionProps, prevTransitionProps) => ({
  type: ActionTypes.transitionEnd,
  payload: {
    from: prevTransitionProps.scene.route.routeName,
    to: transitionProps.scene.route.routeName,
  },
});

export const startNewExam = payload => ({
  type: ActionTypes.startNewExam,
  payload,
});

export const fetchExams = payload => ({
  type: ActionTypes.fetchExams,
  payload,
});

export const loadNewExam = () => ({
  type: ActionTypes.loadNewExam,
});

export const loadListOfExams = () => ({
  type: ActionTypes.loadListOfExams,
});

export const loadNewGameTimedOut = err => ({
  type: ActionTypes.loadNewGameTimedOut,
  payload: err,
});

export const questionAnimationStart = animationType => ({
  type: ActionTypes.questionAnimationStart,
  payload: {
    animationType,
  },
});

export const questionAnimationFinished = () => ({
  type: ActionTypes.questionAnimationFinished,
});

export const startListOfExamsPressed = language => (dispatch, getState) => {
  const isLoading = selectIsGameLoading(getState());
  if (isLoading) return null;
  dispatch(loadListOfExams());
  return Promise.race([getListOfExams(language), rejectAfterDuration(10000)])
    .then(data => {
      dispatch(
        fetchExams({
          data,
        }),
      );
    })
    .catch(err => {
      dispatch(loadNewGameTimedOut(err));
    });
};

export const startExamPressed = examName => (dispatch, getState) => {
  const isLoading = selectIsGameLoading(getState());
  if (isLoading) return null;
  dispatch(loadNewExam());
  return Promise.race([getNewExamData(examName), rejectAfterDuration(10000)])
    .then(questionsById => {
      const questions = Object.keys(questionsById);
      dispatch(
        startNewExam({
          questions,
          questionsById,
          examName,
        }),
      );
    })
    .catch(err => {
      dispatch(loadNewGameTimedOut(err));
    });
};

export const checkForUpdate = () => ({
  type: ActionTypes.checkForUpdate,
});

const onSyncStatusChange = SyncStatus => ({
  type: ActionTypes.codePushSyncChanged,
  payload: SyncStatus,
});

const onError = error => ({
  type: ActionTypes.updateError,
  payload: error,
});

const onDownloadProgress = downloadProgress => ({
  type: ActionTypes.updateProgress,
  payload: downloadProgress,
});

export const checkUpdatesPressed = () => (dispatch, getState) => {
  const isUpdating = selectIsUpdating(getState());
  if (isUpdating) return null;
  dispatch(checkForUpdate());
  return CodePush.sync(
    activeConfig,
    (...args) => dispatch(onSyncStatusChange(...args)),
    (...args) => dispatch(onDownloadProgress(...args)),
    (...args) => dispatch(onError(...args)),
  );
};

export const settingsPressed = () => ({
  type: ActionTypes.settingsPressed,
});

export const listExamsPressed = () => ({
  type: ActionTypes.listExamsPressed,
});

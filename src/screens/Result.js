import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Share, ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import {H1, Body, Spinner} from 'native-base';
import I18n from '../i18n';
import {appUrlShortened} from '../constants';
import {
  selectResultData,
  selectIsGameLoading,
  selectDisplayInterstitial,
} from '../store/selectors';
import {ScrollView, ShareButton, ReplayButton} from '../components';
import BackgroundView from '../components/BackgroundView';
import ResultCard from '../components/ResultCard';
import {startExamPressed} from '../store/navigation/actions';
import {selectQuestionName} from '../store/selectors';

const headerStyles = {
  marginTop: 20,
};
const centerButtonStyles = {
  marginTop: 8,
  alignSelf: 'center',
};
@connect(
  state => ({
    ...selectResultData(state),
    examName: selectQuestionName(state),
    isLoading: selectIsGameLoading(state),
    displayInterstitial: selectDisplayInterstitial(state),
  }),
  {
    startExamPressed,
  },
)
export default class Result extends Component {
  static navigationOptions = ({screenProps}) => ({
    title: I18n.t('result.header', screenProps.language),
  });

  static propTypes = {
    score: PropTypes.number.isRequired,
    examName: PropTypes.number.isRequired,
    questionsData: PropTypes.arrayOf(
      PropTypes.shape({id: PropTypes.number.isRequired}),
    ).isRequired,
    answers: PropTypes.arrayOf(PropTypes.number).isRequired,
    startExamPressed: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    displayInterstitial: PropTypes.bool.isRequired,
  };

  onReplay = () => {
    const {examName} = this.props;
    this.props.startExamPressed(examName);
  };

  onShare = () => {
    const {score, questionsData} = this.props;
    const scoreText = `${score} / ${questionsData.length}`;
    Share.share(
      {
        message: I18n.t('result.share.message', {
          score: scoreText,
          url: appUrlShortened,
        }),
        title: I18n.t('result.share.title'),
      },
      {
        dialogTitle: I18n.t('result.share.dialogTitle'),
      },
    );
  };

  renderScore = () => {
    const {score, questionsData} = this.props;
    return (
      <Body>
        <H1 style={headerStyles}>
          {I18n.t('result.score', {score, total: questionsData.length})}
        </H1>
      </Body>
    );
  };

  renderSharebar = () => (
    <ShareButton
      style={centerButtonStyles}
      title={I18n.t('btn.share')}
      onPress={this.onShare}
    />
  );

  renderReplayButton = () => (
    <ReplayButton
      disabled={this.props.isLoading}
      style={centerButtonStyles}
      title={I18n.t('btn.replay')}
      onPress={this.onReplay}
    />
  );

  renderResultCards = () => {
    const {questionsData, answers} = this.props;
    return questionsData.map((questionObj, index) => (
      <ResultCard
        key={questionObj.id}
        {...questionObj}
        answered={answers[index]}
      />
    ));
  };

  render() {
    const {isLoading} = this.props;
    return (
      <BackgroundView>
        <ScrollView style={{paddingHorizontal: 10}}>
          {this.renderScore()}
          {this.renderSharebar()}
          {this.renderReplayButton()}
          {isLoading && <Spinner />}
          <Body>
            <H1 style={headerStyles}>{I18n.t('result.title')}</H1>
          </Body>
          {this.renderResultCards()}
        </ScrollView>
      </BackgroundView>
    );
  }
}

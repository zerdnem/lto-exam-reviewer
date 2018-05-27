import React, {Component} from 'react';
import {ToastAndroid} from 'react-native';
import PropTypes from 'prop-types';
import {Spinner, Text} from 'native-base';
import {connect} from 'react-redux';
import I18n from '../i18n';
import {
  selectIsGameLoading,
  selectIsUpdating,
  selectUpdateProgress,
} from '../store/selectors';
import {Button} from '../components';
import BackgroundView from '../components/BackgroundView';
import ProgressBar from '../components/ProgressBar';
import {
  settingsPressed,
  checkUpdatesPressed,
  listExamsPressed,
} from '../store/navigation/actions';

const screenStyles = {
  padding: 15,
};

const buttonStyles = {
  margin: 10,
};

@connect(
  state => ({
    isLoading: selectIsGameLoading(state),
    isUpdating: selectIsUpdating(state),
    updateProgress: selectUpdateProgress(state),
  }),
  {
    checkUpdatesPressed,
    settingsPressed,
    listExamsPressed,
  },
)
export default class Menu extends Component {
  static navigationOptions = ({screenProps}) => ({
    title: I18n.t('menu.header', screenProps.language),
  });

  static propTypes = {
    listExamsPressed: PropTypes.func.isRequired,
    checkUpdatesPressed: PropTypes.func.isRequired,
    settingsPressed: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isUpdating: PropTypes.bool.isRequired,
    updateProgress: PropTypes.number.isRequired,
  };

  onSettingsPressed = () => {
    this.props.settingsPressed();
  };

  onListExamsPressed = () => {
    this.props.listExamsPressed();
  };

  onUpdatePressed = () => {
    this.props
      .checkUpdatesPressed()
      .catch(err => ToastAndroid.show(err.message, ToastAndroid.LONG));
  };

  render() {
    const {isLoading, isUpdating, updateProgress} = this.props;
    const disableButtons = isLoading || isUpdating;
    return (
      <BackgroundView style={screenStyles}>
        <Text
          style={{
            padding: 10,
            marginBottom: 10,
            fontSize: 18,
            justifyContent: 'center',
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Welcome to LTO Exam Reviewer
        </Text>
        <Text style={{padding: 10}}>
          Pass the LTO Exam without fixers. Be familiar in the Philippine road
          rules and signs. Here, you can review or take the actual exam in
          Tagalog or English.
        </Text>
        <Button
          style={buttonStyles}
          disabled={disableButtons}
          title={I18n.t('btn.startListExams')}
          onPress={this.onListExamsPressed}
        />
        <Button
          style={buttonStyles}
          disabled={disableButtons}
          title={I18n.t('btn.checkUpdates')}
          onPress={this.onUpdatePressed}
        />
        <Button
          style={buttonStyles}
          disabled={disableButtons}
          title={I18n.t('btn.settings')}
          onPress={this.onSettingsPressed}
        />
        {disableButtons && <Spinner />}
        {isUpdating && <ProgressBar progress={updateProgress} />}
      </BackgroundView>
    );
  }
}

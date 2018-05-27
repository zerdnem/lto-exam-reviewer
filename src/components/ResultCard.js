import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, Card, CardItem, Body, Thumbnail, Left} from 'native-base';
import I18n from '../i18n';
import {View, ResultAnswerButton} from './index';
import Anchor from './Anchor';

export default class ResultCard extends Component {
  static propTypes = {
    testQuestion: PropTypes.string.isRequired,
    answered: PropTypes.number.isRequired,
    choices: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctAnswerIndex: PropTypes.number.isRequired,
  };

  getAdditionalButtonProps = buttonIndex => {
    const {answered, correctArtistIndex, correctAnswerIndex} = this.props;
    const defaultButtonProps = {
      small: true,
    };
    // 1. Correct button
    if (correctAnswerIndex === buttonIndex) {
      // correctly answered => green bg
      if (answered === correctAnswerIndex) {
        return {
          ...defaultButtonProps,
        };
      }
      // otherwise show correct artist with green border
      return {
        ...defaultButtonProps,
        bordered: true,
      };
    }
    // 2. Answered non-correct button => display red border
    if (answered === buttonIndex) {
      return {
        ...defaultButtonProps,
        danger: answered !== correctArtistIndex,
      };
    }
    if (answered === buttonIndex) {
      return {
        ...defaultButtonProps,
        danger: answered !== correctAnswerIndex,
      };
    }
    // 3. Non-correct, non-answered button => white border
    return {...defaultButtonProps, bordered: true, light: true};
  };

  renderAnswerButtons() {
    const {choices} = this.props;
    if (choices) {
      return choices.map((choice, index) => (
        <ResultAnswerButton
          key={choice}
          title={choice}
          {...this.getAdditionalButtonProps(index)}
        />
      ));
    }
  }

  render() {
    const {testQuestion, images} = this.props;
    return (
      <Card style={{paddingHorizontal: 8, paddingVertical: 8}}>
        <CardItem>
          <Left>
            <Thumbnail large square source={images} />
            <Body>
              <Text>{testQuestion}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            {this.renderAnswerButtons()}
          </View>
        </CardItem>
      </Card>
    );
  }
}

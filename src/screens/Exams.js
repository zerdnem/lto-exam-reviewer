import React, {Component} from 'react';
import {TouchableHighlight, Image, ScrollView} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Segment,
  Button,
} from 'native-base';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import I18n from '../i18n';

import BackgroundView from '../components/BackgroundView';

import {primary} from '../styling';
import {RenderCard} from '../components';
import {selectIsGameLoading} from '../store/selectors';

import {
  startListOfExamsPressed,
  startExamPressed,
} from '../store/navigation/actions';

import {selectExamList} from '../store/selectors';

const screenStyles = {
  padding: 15,
};

const buttonStyles = {
  margin: 10,
};

@connect(
  state => ({
    isLoading: selectIsGameLoading(state),
    exams: selectExamList(state),
  }),
  {
    startExamPressed,
    startListOfExamsPressed,
  },
)
export default class Exams extends Component {
  constructor(props) {
    super(props);
    this.state = {segment: 1};
  }

  static navigationOptions = ({screenProps}) => ({
    title: I18n.t('exam.header', screenProps.language),
  });

  static PropTypes = {
    startExamPressed: PropTypes.func.isRequired,
    startListOfExamsPressed: PropTypes.func.isRequired,
    exams: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.arrayOf(PropTypes.number.isRequired),
        title: PropTypes.arrayOf(PropTypes.string.isRequired),
        examTitle: PropTypes.string.isRequired,
        examDescription: PropTypes.string.isRequired,
        description: PropTypes.arrayOf(PropTypes.string.isRequired),
        thumbnail: PropTypes.arrayOf(PropTypes.string.isRequired),
      }),
    ).isRequired,
  };

  static defaultProps = {
    thumbnail: '',
  };

  onExamsPressed = (e, t) => {
    this.props.startExamPressed(t);
  };

  onGetListOfExamsPressed = (e, segment) => {
    this.setState({segment});
    this.props.startListOfExamsPressed(segment);
  };

  componentDidMount() {
    this.props.startListOfExamsPressed(this.state.segment);
  }

  renderExamInfo() {
    const {exams} = this.props;
    const data = exams.data;
    if (data[0]) {
      const examTitle = data[0].examTitle;
      const examDescription = data[0].examDescription;
      return (
        <Card>
          <CardItem header>
            <Text>{examTitle}</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{examDescription}</Text>
            </Body>
          </CardItem>
        </Card>
      );
    }
  }

  renderExamsCard = () => {
    const {exams} = this.props;
    const data = exams.data;
    return data.map((d, i) => {
      return (
        <Card key={i}>
          <CardItem>
            <Left>
              <Thumbnail source={require('../images/data/favicon.png')} />
              <Body>
                <Text>{d.title}</Text>
                <Text note>April 15, 2016</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Image source={d.thumbnail} style={{height: 200, width: 320}} />
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{d.description}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Text />
            </Left>
            <Right>
              <TouchableHighlight
                style={{alignItems: 'center', padding: 10}}
                underlayColor="gray"
                onPress={event => this.onExamsPressed(event, d.id)}>
                <Text>Start the test</Text>
              </TouchableHighlight>
            </Right>
          </CardItem>
        </Card>
      );
    });
  };

  render() {
    return (
      <BackgroundView style={screenStyles}>
        <Segment style={{backgroundColor: 'transparent'}}>
          <Button
            first
            active={this.state.segment === 1 ? true : false}
            onPress={event => this.onGetListOfExamsPressed(event, 1)}>
            <Text>English</Text>
          </Button>
          <Button
            last
            active={this.state.segment === 2 ? true : false}
            onPress={event => this.onGetListOfExamsPressed(event, 2)}>
            <Text>Tagalog</Text>
          </Button>
        </Segment>
        <Content>
          {this.state.segment === 1 && this.renderExamInfo()}
          {this.state.segment === 1 && this.renderExamsCard()}
          {this.state.segment === 2 && this.renderExamInfo()}
          {this.state.segment === 2 && this.renderExamsCard()}
        </Content>
      </BackgroundView>
    );
  }
}

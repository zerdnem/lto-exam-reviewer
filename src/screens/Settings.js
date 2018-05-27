import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  TouchableOpacity,
  Linking,
  ToastAndroid,
} from 'react-native';
import {Picker, Item, H2, Text} from 'native-base';
import {connect} from 'react-redux';
import I18n from '../i18n';
import {selectSettingsData} from '../store/selectors';
import {View} from '../components';
import BackgroundView from '../components/BackgroundView';
import {languageSelected, noAdsPurchased} from '../store/settings/actions';
import {primary, dark4Transparent} from '../styling';
import {packageName, appName, mail, websiteUrl} from '../constants';

const buildNumber = `${require('../../package.json').version}`;

const dropdownStyle = {
  padding: 15,
  flex: 0,
  backgroundColor: dark4Transparent,
};

const headingStyle = {
  color: primary,
  alignSelf: 'center',
  marginTop: 15,
  marginBottom: 5,
};

const subHeadingStyle = {
  fontSize: 18,
  marginHorizontal: 10,
};

const subSectionTextStyle = {
  marginHorizontal: 10,
  marginBottom: 10,
};

function renderSection(sectionName, ...subSections) {
  const heading = (
    <H2 key={sectionName} style={headingStyle}>
      {I18n.t(`settings.${sectionName}.heading`)}
    </H2>
  );
  const subSectionsJSX = subSections.map(({name: subSectionName, onPress}) => (
    <TouchableOpacity key={subSectionName} onPress={onPress}>
      <Text style={subHeadingStyle}>
        {I18n.t(`settings.${sectionName}.${subSectionName}.heading`)}
      </Text>
      <Text style={subSectionTextStyle}>
        {I18n.t(`settings.${sectionName}.${subSectionName}.text`)}
      </Text>
    </TouchableOpacity>
  ));
  return [heading, ...subSectionsJSX];
}

@connect(state => selectSettingsData(state), {
  languageSelected,
})
export default class Settings extends Component {
  static navigationOptions = ({screenProps}) => ({
    title: I18n.t('settings.header', screenProps.language),
  });

  static propTypes = {
    language: PropTypes.oneOf(['ph', 'en']).isRequired,
    languageSelected: PropTypes.func.isRequired,
  };

  onLanguageSelected = value => {
    if (value == 'ph') {
      ToastAndroid.show(I18n.t('settings.language.error'), ToastAndroid.SHORT);
    }
    if (value == 'en') {
      this.props.languageSelected(value);
    }
  };

  onFeedback = async () => {
    const body = `\n\n-------------\nWrite above this line\nBuild: ${buildNumber}`;
    try {
      await Linking.openURL(
        `mailto:${mail}?subject=[${appName}]%20Feedback&body=${body}`,
      );
    } catch (ex) {
      console.log('Settings:onFeedback', ex);
    }
  };

  onWebsite = async () => {
    try {
      await Linking.openURL(websiteUrl);
    } catch (ex) {
      console.log('Settings:onWebsite', ex);
    }
  };

  render() {
    const [appSectionHeader, ...appSectionSubSections] = renderSection('app', {
      name: 'feedback',
      onPress: this.onFeedback,
    });

    return (
      <BackgroundView>
        <ScrollView>
          <H2 style={headingStyle}>{I18n.t('settings.language.header')}</H2>
          <View style={dropdownStyle}>
            <Picker
              mode="dropdown"
              placeholder="Language"
              note={false}
              selectedValue={this.props.language}
              onValueChange={this.onLanguageSelected}>
              <Item label="Filipino" value="ph" />
              <Item label="English" value="en" />
            </Picker>
          </View>
          {[
            appSectionHeader,
            <Text key="buildNumber" style={subHeadingStyle}>
              {`Version: ${buildNumber}`}
            </Text>,
            ...appSectionSubSections,
          ]}
          {renderSection('about', {
            name: 'website',
            onPress: this.onWebsite,
          })}
        </ScrollView>
      </BackgroundView>
    );
  }
}

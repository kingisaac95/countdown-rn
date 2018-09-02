
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { formatDateTime, saveEvent } from './api';

const styles = StyleSheet.create({
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  text: {
    height: 40,
    margin: 0,
    marginLeft: 7,
    marginRight: 7,
    paddingLeft: 10,
  },
  borderTop: {
    borderColor: '#edeeef',
    borderTopWidth: 0.5,
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    alignSelf: 'stretch',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

class EventForm extends Component {
  state = {
    title: null,
    date: '',
    showDatePicker: false,
  };

  handleAddPress = () => {
    saveEvent(this.state)
    .then(() => this.props.navigation.goBack())
    .catch(error => console.log(error));
  }

  handleChangeTitle = (value) => {
    this.setState({ title: value });
  }

  handleDatePress = () => {
    this.setState(prevState => ({
      showDatePicker: !prevState.showDatePicker,
    }));
  }

  handleDatePicked = (date) => {
    this.setState({ date });
    this.handleDatePress();
  }

  render() {
    const { title, date, showDatePicker } = this.state;
    return (
      <View style={{
        flex: 1
      }}>
        <View style={styles.fieldContainer}>
          <TextInput
            style={styles.text}
            placeholder="Event title"
            spellCheck={false}
            value={title}
            onChangeText={this.handleChangeTitle}
          />
          <TextInput
            style={[styles.text, styles.borderTop]}
            placeholder="Event date"
            spellCheck={false}
            value={formatDateTime(date.toString())}
            onFocus={this.handleDatePress}
          />
          <DateTimePicker
            isVisible={showDatePicker}
            mode="datetime"
            onConfirm={this.handleDatePicked}
            onCancel={this.handleDatePress}
          />
        </View>
        <TouchableHighlight
          onPress={this.handleAddPress}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default EventForm;

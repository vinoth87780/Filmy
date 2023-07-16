import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../assets/theme/Theme';
import CustomIcon from './CustomIcon';

const InputHeader = props => {
  const [searchText, setSearchText] = useState('');
  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.textInput}
        onChangeText={TextInput => setSearchText(TextInput)}
        value={searchText}
        placeholder="Search your Movies..."
        placeholderTextColor={COLORS.White}
      />
      <TouchableOpacity onPress={() => props.searchFunction(searchText)}>
        <CustomIcon
          style={styles.searchIcon}
          name="search"
          color={COLORS.Red}
          size={FONTSIZE.size_20}
        />
      </TouchableOpacity>
    </View>
  );
};

export default InputHeader;
const styles = StyleSheet.create({
  inputBox: {
    display: 'flex',
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_24,
    borderWidth: 0.5,
    borderColor: COLORS.DarkRed,
    borderRadius: BORDERRADIUS.radius_25,
    flexDirection: 'row',
  },
  textInput: {
    width: '90%',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  searchIcon: {
    padding: SPACING.space_10,
  },
});

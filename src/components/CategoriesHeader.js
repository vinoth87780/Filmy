import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../assets/theme/Theme';

const CategoriesHeader = props => {
  return <Text style={styles.text}>{props.title}</Text>;
};

export default CategoriesHeader;
const styles = StyleSheet.create({
  text: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
    paddingHorizontal: SPACING.space_36,
    paddingVertical: SPACING.space_18,
  },
});

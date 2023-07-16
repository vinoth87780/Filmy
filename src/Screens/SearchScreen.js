import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SPACING} from '../assets/theme/Theme';
import SubMovieCard from '../components/SubMovieCard';
import {baseImagePath, searchMovies} from '../assets/api/ApiCalls';
import InputHeader from '../components/InputHeader';
const {width, height} = Dimensions.get('screen');
const SearchScreen = ({navigation}) => {
  const [searchList, setsearchList] = useState([]);
  const searchMovieFunction = async name => {
    try {
      let response = await fetch(searchMovies(name));
      let json = await response.json();
      setsearchList(json.results);
    } catch (error) {
      console.error('somthing went wrong in searchmovieFunction', error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View>
        <FlatList
          data={searchList}
          keyExtractor={item => item.id}
          bounces={false}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.inputHeaderContainer}>
              <InputHeader searchFunction={searchMovieFunction} />
            </View>
          }
          contentContainerStyle={styles.centercontainer}
          renderItem={({item, index}) => (
            <SubMovieCard
              shouldMarginatedAtEnd={false}
              shouldMarginatedAround={true}
              cardFunction={() => {
                navigation.navigate('MovieDetail', {movieid: item.id});
              }}
              cardWidth={width / 2 - SPACING.space_12 * 2}
              title={item.original_title}
              imagePath={baseImagePath('w342', item.poster_path)}
            />
          )}
        />
      </View>
    </View>
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
    alignItems: 'center',
  },
  inputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
    marginBottom: SPACING.space_28 - SPACING.space_12,
  },
  centercontainer: {
    alignItems: 'center',
  },
});

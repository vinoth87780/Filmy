import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SPACING} from '../assets/theme/Theme';
import {
  upcomingMovies,
  nowPlayingMovies,
  popularMovies,
  baseImagePath,
  searchMovies,
} from '../assets/api/ApiCalls';
import InputHeader from '../components/InputHeader';
import CategoriesHeader from '../components/CategoriesHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';

const {width, height} = Dimensions.get('window');

const getnowPlayingMoviesList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(
      'Somthing went wrong in getNowPlayingMovieList Function',
      error,
    );
  }
};
const getUpcomingMoviesList = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(
      'Somthing went wrong in getUpcomingMoviesList Function',
      error,
    );
  }
};
const getPopularMoviesList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(
      'Somthing went wrong in getPopularMoviesList Function',
      error,
    );
  }
};

const HomeScreen = ({navigation}) => {
  const [nowPlayingMoviesList, setnowPlayingMoviesList] = useState(undefined);
  const [upComingMoviesList, setupComingMoviesList] = useState(undefined);
  const [PopularMoviesList, setPopularMoviesList] = useState(undefined);
  useEffect(() => {
    (async () => {
      let tempNowPlaying = await getnowPlayingMoviesList();
      setnowPlayingMoviesList([
        {id: 'dummy1'},
        ...tempNowPlaying.results,
        {id: 'dummy2'},
      ]);
      let tempUpComingMovies = await getUpcomingMoviesList();
      setupComingMoviesList(tempUpComingMovies.results);
      let tempPopularMovies = await getPopularMoviesList();
      setPopularMoviesList(tempPopularMovies.results);
    })();
  }, []);

  const searchMovieFunction = () => {
    navigation.navigate('Search');
  };

  if (
    nowPlayingMoviesList == undefined &&
    nowPlayingMoviesList == null &&
    upComingMoviesList == undefined &&
    upComingMoviesList == null &&
    PopularMoviesList == undefined &&
    PopularMoviesList == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.ScrollViewContainer}>
        <StatusBar backgroundColor={COLORS.Black} barStyle={'light-content'} />
        <View style={styles.inputHeaderContainer}>
          <InputHeader searchFunction={searchMovieFunction} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Red} />
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar hidden />
      <View style={styles.inputHeaderContainer}>
        <InputHeader searchFunction={searchMovieFunction} />
      </View>
      <CategoriesHeader title={'Now Playing'} />
      <FlatList
        data={nowPlayingMoviesList}
        keyExtractor={item => item.id}
        bounces={false}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => {
          if (!item.original_title) {
            return (
              <View
                style={{
                  width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
                }}></View>
            );
          }
          return (
            <MovieCard
              shouldMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.navigate('MovieDetail', {movieid: item.id});
              }}
              cardWidth={width * 0.7}
              isFirst={index == 0 ? true : false}
              isLast={index == upComingMoviesList?.length - 1 ? true : false}
              title={item.original_title}
              imagePath={baseImagePath('w780', item.poster_path)}
              genre={item.genre_ids.slice(1, 4)}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
            />
          );
        }}
      />
      <CategoriesHeader title={'Popular'} />
      <FlatList
        data={PopularMoviesList}
        keyExtractor={item => item.id}
        bounces={false}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.navigate('MovieDetail', {movieid: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index => (upComingMoviesList?.length - 1 ? true : false)}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
      <CategoriesHeader title={'Upcoming'} />
      <FlatList
        data={upComingMoviesList}
        bounces={false}
        snapToInterval={width * 0.4 + SPACING.space_36}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <SubMovieCard
            shouldMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.navigate('MovieDetail', {movieid: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index => (upComingMoviesList?.length - 1 ? true : false)}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black,
    flex: 1,
    display: 'flex',
    padding: SPACING.space_10,
  },
  ScrollViewContainer: {flex: 1},
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
});
export default HomeScreen;

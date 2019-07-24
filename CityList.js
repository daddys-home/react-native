import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {Constants} from 'expo';


export default class CityList extends React.Component {

    static navigationOptions = {
        title: '도시 리스트',
    };

    constructor(props) {
        super(props);
        this.state = {
            cities: [],
        };
    }

    componentDidMount() {
        fetch('http://demo6468405.mockable.io/weather-crawlers/cities')
            .then(response => response.json())
            .then(cities => {
                console.log('cities =', cities.length);
                this.setState({
                    cities
                });
            });
    }

    onPressCity(item) {
        this.props.navigation.navigate('Detail', {city: item});
    }

    renderItem(city) {
        return (
            <TouchableOpacity style={styles.item} onPress={() => this.onPressCity(city)}>
                <Text style={styles.text1}>  {city}</Text>
                <Text style={styles.text2}>>  </Text>
            </TouchableOpacity>

        );
    }

    render() {
        return (
            <ImageBackground style={styles.background} source={require('./assets/images/background.png')}>
                <FlatList style={styles.container}
                          renderItem={({item}) => this.renderItem(item)}
                          keyExtractor={item => item}
                          data={this.state.cities}
                />
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    background: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },

    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },

    item: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        borderWidth: 1,
        borderColor: 'white',
        margin: 10,
        justifyContent: 'center',
    },

    text1: {
        flex: 5,
        fontSize: 30,
        textAlign: 'left',
        color: '#fff',
        fontWeight: 'bold'

    },
    text2: {
        flex: 1,
        fontSize: 30,
        textAlign: 'right',
        color: '#fff',
        fontWeight: 'bold'
    }

});

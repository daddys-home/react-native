import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';

export default class WeatherDetailScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.getParam('city', 'Unknown')} 날씨`,
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            umbrellaMessage: null,
            isRain: null,
        };
    }

    componentDidMount() {
        const city = this.props.navigation.getParam('city', null);
        // const city = 'Daejeon';

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=78e00047d7bce6188096b68c5823fd7f`)
            .then(response => response.json())
            .then(info => {
                this.setState({
                    ...info,
                    isLoading: false,
                });
            });

    }

    render() {

        if (this.state.isLoading) {
            return (
                <ImageBackground style={styles.background} source={require('./assets/images/background.png')}>
                    <View style={styles.container}>
                        <Image style={{width: 100, height: 100}} source={require('./assets/images/loading.gif')}/>
                    </View>
                </ImageBackground>
            )
        }

        const icon = this.state.weather[0].icon;

        if(icon=='10d'||icon=='09d' ||icon=='11d'||icon=='13d'||
            icon=='10n'||icon=='09n'||icon=='11n'||icon=='13n'){

            this.state.umbrellaMessage = '우산 좀 챙기라고!';
            this.state.isRain = true;

        } else {
            this.state.umbrellaMessage = '우산 안 챙겨도 돼요~~~';
        }

        const gif = this.state.isRain
            ? require('./assets/images/rainingUmbrella.gif')
            : require('./assets/images/sun.gif');

        return (
                <View style={styles.item}>
                    <Image style={{ width: 200, height: 150}} source={{uri: 'http://openweathermap.org/img/wn/'+icon+'@2x.png'}} />
                    <Text style={styles.textDescription}>{this.state.weather[0].description}</Text>
                    <Text style={styles.text}>현재 기온: {(this.state.main.temp- 273.15).toFixed(1)}℃</Text>
                    <Text style={styles.textBlue}>{(this.state.main.temp_min-273.15).toFixed(1)}℃ / <Text style={styles.textRed}>{(this.state.main.temp_max-273.15).toFixed(1)}℃</Text></Text>
                    <Text style={styles.textAtmSpeed}>기압: {this.state.main.pressure.toFixed(0)}hPa / <Text style={styles.textAtmSpeed}>풍속: {this.state.wind.speed}m/s / </Text><Text style={styles.textHumidity}>습도: {this.state.main.humidity}%</Text></Text>
                    <Text style={styles.text}>{this.state.umbrellaMessage}</Text>
                    <Image style={{ width: 300, height: 290}} source={gif} />
                </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        resizeMode: 'stretch',
        width: '100%',
        height: '100%',
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        alignItems: 'center',
    },
    textDescription: {
        color:'gray',
        fontSize: 15,
    },

    text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    textAtmSpeed: {
        fontSize: 18,
    },
    textRed: {
        color:'red',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textBlue: {
        color:'blue',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textHumidity: {
        color:'aqua',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

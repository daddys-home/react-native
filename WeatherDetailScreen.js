import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import { Constants } from 'expo';

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
                <View style={styles.container}>
                    <Text>데이터를 불러오는 중입니다.</Text>
                </View>
            )
        }

        return (

                <View style={styles.item}>
                    <Image  style={{ width: 200, height: 90}} source={{uri: 'http://openweathermap.org/img/wn/'+this.state.weather[0].icon+'@2x.png'}} />
                    <Text style={styles.textDescription}>{this.state.weather[0].description}</Text>
                    <Text style={styles.text}>현재 기온: {(this.state.main.temp- 273.15).toFixed(1)}℃</Text>
                    <Text style={styles.textBlue}>{(this.state.main.temp_min-273.15).toFixed(1)}℃ / <Text style={styles.textRed}>{(this.state.main.temp_max-273.15).toFixed(1)}℃</Text></Text>
                    <Text style={styles.textAtmSpeed}>기압: {this.state.main.pressure.toFixed(0)}hPa / <Text style={styles.textAtmSpeed}>풍속: {this.state.wind.speed}m/s / </Text><Text style={styles.textHumidity}>습도: {this.state.main.humidity}%</Text></Text>

                </View>



        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight,

    },
   item: {
        flex: 1,
        justifyContent: 'center',
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

import React, { useEffect, useState } from "react";
import { Keyboard, Platform, requireNativeComponent, SafeAreaView, StatusBar } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import {
  useFonts,
  Livvic_100Thin,
  Livvic_100Thin_Italic,
  Livvic_200ExtraLight,
  Livvic_200ExtraLight_Italic,
  Livvic_300Light,
  Livvic_300Light_Italic,
  Livvic_400Regular,
  Livvic_400Regular_Italic,
  Livvic_500Medium,
  Livvic_500Medium_Italic,
  Livvic_600SemiBold,
  Livvic_600SemiBold_Italic,
  Livvic_700Bold,
  Livvic_700Bold_Italic,
  Livvic_900Black,
  Livvic_900Black_Italic,
} from "@expo-google-fonts/livvic";

export default function AppWeather() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [estado, setEstado] = useState(null);
  const [loading, setLoading] = useState(null);
  const [cityName, setCityName] = useState("Montevideo");
  let [fontsLoaded] = useFonts({
    Livvic_100Thin,
    Livvic_100Thin_Italic,
    Livvic_200ExtraLight,
    Livvic_200ExtraLight_Italic,
    Livvic_300Light,
    Livvic_300Light_Italic,
    Livvic_400Regular,
    Livvic_400Regular_Italic,
    Livvic_500Medium,
    Livvic_500Medium_Italic,
    Livvic_600SemiBold,
    Livvic_600SemiBold_Italic,
    Livvic_700Bold,
    Livvic_700Bold_Italic,
    Livvic_900Black,
    Livvic_900Black_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     const location = await Location.getCurrentPositionAsync({});
  //     setLocation({
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //     });
  //   })();
  // }, []);

  // let text = "Waiting..";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  const getWeather = () => {
    Keyboard.dismiss();
    setLoading(true);
    setEstado(null);
    setCityName("");
    axios
      .get("http://api.weatherstack.com/current?access_key=f2245cde52bd48f332c080db34a0897a&query=" + cityName)
      // .get("https://api.tvmaze.com/shows/169")
      .then((result) => {
        setEstado(result.data);
      })
      .finally(() => setLoading(false));
  };

  // console.log(location.latitude + "  " + location.longitude + "  y : " + estado);
  // console.log(estado.current.temperature + "  Grados  " + cityName);
  // console.log(location);

  return (
    <Container>
      <StatusBar barStyle='light-content' />
      <SafeAreaView>
        <AppBackground source={require("../../assets/weather_b.png")}>
          <Main>
            <Text title>Como esta el Clima en....?</Text>
          </Main>
        </AppBackground>
        <MenuBar>
          <TextInput
            placeholder='Ingrese su ciudad'
            value={cityName}
            onChangeText={setCityName}
            onSubmitEditing={getWeather}
            large
          />
          <AntDesign name='search1' size={24} color='#FFF' />
        </MenuBar>
        {estado && (
          <Preview>
            <Text large>Ciudad: {estado.location.name} </Text>
            <Text large>
              Temperatura: {estado.current.temperature} ºC / Sensacion: {estado.current.feelslike} ºC
            </Text>
            {/* <Text large>Sensacion: {estado.current.feelslike} ºC</Text> */}
            <Text large>
              Viento: {estado.current.wind_degree} Km/h del {estado.current.wind_dir}
            </Text>
            <Text large>Presion: {estado.current.pressure} milibares</Text>
            <Text large>Humedad: {estado.current.humidity} %</Text>
            <Text large>Precipitaciones: {estado.current.precip} mm</Text>
            <HeaderImg source={{ uri: estado.current.weather_icons[0] }}></HeaderImg>
          </Preview>
        )}
      </SafeAreaView>
    </Container>
  );
}

const HeaderImg = styled.Image`
  width: 120px;
  height: 120px;
  margin-top: 15px;
`;

const Container = styled.View`
  flex: 1;
  background-color: #2ad4c6;
`;

const TextInput = styled.TextInput`
  color: ${(props) => (props.dark ? "#000" : "#2c16ec")};
  font-family: "Livvic_500Medium_Italic";
  width: 80%;
  padding-left: 10px;
  background-color: #dcdcdc;
  border-radius: 20px;

  ${({ title, large, small }) => {
    switch (true) {
      case title:
        return "font-size: 28px";
      case large:
        return "font-size: 20px";
      case small:
        return "font-size: 13px";
    }
  }}

  ${({ bold, heavy }) => {
    switch (true) {
      case bold:
        return "font-weight: 600";
      case heavy:
        return "font-weight: 700";
    }
  }}
`;

const Text = styled.Text`
  color: ${(props) => (props.dark ? "#000" : "#FFF")};
  font-family: "Livvic_500Medium_Italic";

  ${({ title, large, small }) => {
    switch (true) {
      case title:
        return "font-size: 28px";
      case large:
        return "font-size: 20px";
      case small:
        return "font-size: 13px";
    }
  }}

  ${({ bold, heavy }) => {
    switch (true) {
      case bold:
        return "font-weight: 600";
      case heavy:
        return "font-weight: 700";
    }
  }}
`;

const AppBackground = styled.ImageBackground`
  width: 100%;
`;

const MenuBar = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
`;

const Main = styled.View`
  padding: 0 32px;
  margin: 200px 0 32px 0;
`;

const Button = styled.TouchableOpacity`
  height: 30px;
  width: 50px;
  background-color: rgba(255, 255, 255, 0.4);
  align-items: center;
  justify-content: center;
  border-radius: 80px;
`;

const Preview = styled.View`
  background-color: #4ab3f8;
  height: 400px;
  width: auto;
  align-items: center;
`;

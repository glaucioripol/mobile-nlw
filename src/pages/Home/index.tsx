import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import { describeHome, homeMessage, enterText } from "../../common/strings";
import { logo, backgroundHome } from "../../assets";

import { styles } from "./styles";

// https://github.com/lawnstarter/react-native-picker-select - testar este picker

export const Home: React.FC = () => {
  const navigation = useNavigation();
  function handleNavigateToPoints() {
    navigation.navigate("Points", { ...dataLocation });
  }

  const [dataLocation, setDataLocation] = useState({
    uf: "",
    city: "",
  });

  function handleChangeText(fieldName: string) {
    return (text: String) => {
      setDataLocation({ ...dataLocation, [fieldName]: text });
    };
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ImageBackground
        source={backgroundHome}
        imageStyle={styles.backgroundContainer}
        style={styles.container}
      >
        <View style={styles.main}>
          <Image source={logo} />
          <Text style={styles.title}>{describeHome}</Text>
          <Text style={styles.description}>{homeMessage}</Text>
        </View>

        <View style={styles.footer}>
          <View style={{ backgroundColor: "#f0f0f5" }}>
            <TextInput
              placeholder="Digite a UF"
              value={dataLocation.uf}
              onChangeText={handleChangeText("uf")}
              style={styles.input}
              maxLength={2}
              autoCapitalize="characters"
              autoCorrect={false}
            />
            <TextInput
              placeholder="Digite a cidade"
              value={dataLocation.city}
              onChangeText={handleChangeText("city")}
              style={styles.input}
              autoCorrect={false}
            />
          </View>

          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>{enterText}</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

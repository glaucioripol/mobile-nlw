import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import { describeHome, homeMessage, enterText } from "../../common/strings";
import { logo, backgroundHome } from "../../assets";

import { styles } from "./styles";

export const Home: React.FC = () => {
  const navigation = useNavigation()
  function handleNavigateToPoints(){
    navigation.navigate('Points')
  }
  
  return (
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
  );
};

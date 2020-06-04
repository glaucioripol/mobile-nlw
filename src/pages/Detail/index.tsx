import React from "react";
import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { Feather as Icon, FontAwesome as FAIcon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import { addressText, whatsappText, emailText } from "../../common/strings";

import { styles } from "./styles";

export const Detail: React.FC = () => {
  const { goBack, navigate } = useNavigation();
  function handleOnPressReturn() {
    goBack();
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleOnPressReturn}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Image
          style={styles.pointImage}
          source={{
            uri:
              "https://cdn.vox-cdn.com/thumbor/wg0JG0pgUHhQEBMYvLAGCXi1AVM=/0x0:5760x3840/1200x675/filters:focal(2329x1554:3249x2474)/cdn.vox-cdn.com/uploads/chorus_image/image/66656302/GettyImages_1203053955.0.jpg",
          }}
        />

        <Text style={styles.pointName}>aa</Text>

        <Text style={styles.pointItems}>lampira</Text>
        <Text style={styles.pointItems}>oio</Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>{addressText}</Text>
          <Text style={styles.addressContent}>Betim, mg</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={() => {}}>
          <FAIcon name="whatsapp" size={20} color="#FFF" />
          <Text style={styles.buttonText}>{whatsappText}</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={() => {}}>
          <Icon name="mail" size={20} color="#FFF" />
          <Text style={styles.buttonText}>{emailText}</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

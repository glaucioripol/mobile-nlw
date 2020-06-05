import React, { useEffect, useState } from "react";
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
import { useRoute } from "@react-navigation/native";

import * as MailComposer from "expo-mail-composer";

import { api } from "../../services/api";

import { addressText, whatsappText, emailText } from "../../common/strings";

import { styles } from "./styles";

interface RouteParams {
  pointId: number;
}

interface IPointInfo {
  image: string;
  city: string;
  uf: string;
  name: string;
  email: string;
  whatsapp: string;
  items: { title: string }[];
}

export const Detail: React.FC = () => {
  const route = useRoute();
  const { goBack } = useNavigation();

  const [pointData, setPointData] = useState<IPointInfo>({} as IPointInfo);

  const { pointId } = route.params as RouteParams;

  function handleOnPressReturn() {
    goBack();
  }

  function composeEmail() {
    MailComposer.composeAsync({
      subject: "Interesse na coleta de residuos",
      recipients: [pointData.email],
    });
  }

  useEffect(retrieveSelectedPoint, []);
  function retrieveSelectedPoint() {
    api.get(`/points/${pointId}`).then(({ data }) => setPointData(data));
  }

  // colocar um loader
  if (!pointData.name) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleOnPressReturn}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Image style={styles.pointImage} source={{ uri: pointData.image }} />

        <Text style={styles.pointName}>{pointData.name}</Text>

        {pointData.items.map(({ title }) => (
          <Text style={styles.pointItems}>{title}</Text>
        ))}

        <View style={styles.address}>
          <Text style={styles.addressTitle}>{addressText}</Text>
          <Text
            style={styles.addressContent}
          >{`${pointData.city}, ${pointData.uf}`}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={() => {}}>
          <FAIcon name="whatsapp" size={20} color="#FFF" />
          <Text style={styles.buttonText}>{whatsappText}</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={composeEmail}>
          <Icon name="mail" size={20} color="#FFF" />
          <Text style={styles.buttonText}>{emailText}</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { SvgUri } from "react-native-svg";
import * as Location from "expo-location";

import { welcomePoints, searchInMapAPoint } from "../../common/strings";

import { api } from "../../services/api";

import { styles } from "./styles";

interface IItemResponse {
  id: number;
  title: string;
  image_url: string;
}

interface IPointResponse {
  id: number;
  image: string;
  name: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  // items: {
  //   title: string;
  // }[];
}

export const Points: React.FC = () => {
  const [itemsCollect, setItemsCollect] = useState<IItemResponse[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [points, setPoints] = useState<IPointResponse[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const { goBack, navigate } = useNavigation();
  function handleOnPressReturn() {
    goBack();
  }

  function handleOnPressToDetail(pointId: number) {
    return () => navigate("Detail", { pointId });
  }

  function handleSelecItem(id: number) {
    return () => {
      if (selectedItems.includes(id)) {
        const filteredItems = selectedItems.filter((item) => item !== id);
        setSelectedItems(filteredItems);
      } else {
        setSelectedItems([...selectedItems, id]);
      }
    };
  }

  // get location
  useEffect(getUserLocation, []);
  function getUserLocation() {
    loadPosition();
  }

  async function loadPosition() {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      // refatorar
      Alert.alert(
        "Oooops...",
        "Precisamos da sua permissão para obter sua localização"
      );
      return;
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();
    // setInitialPosition([latitude, longitude]); // ta pegando errado no emulador
    setInitialPosition([-19.9434317, -44.1055362]);
  }

  // requests
  useEffect(retrieveItemsToCollect, []);
  function retrieveItemsToCollect(): void {
    api //definir tipo para desestruturar
      .get("/items")
      .then(({ data }) => {
        setItemsCollect(data.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(retrievePointOfCollect, []);
  function retrievePointOfCollect() {
    api
      .get("points", {
        params: {
          city: "betim",
          uf: "mg",
          items: String([1, 2]),
        },
      })
      .then(({ data }) => {
        setPoints(data.points);
      })
      .catch((e) => console.log("tenso", e));
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleOnPressReturn}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>
        <Text style={styles.title}>{welcomePoints}</Text>
        <Text style={styles.description}>{searchInMapAPoint}</Text>

        <View style={styles.mapContainer}>
          {initialPosition[0] !== 0 && (
            <MapView
              style={styles.map}
              loadingEnabled={initialPosition[0] === 0}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map(({ id, latitude, longitude, image, name }) => (
                <Marker
                  key={id.toString()}
                  onPress={handleOnPressToDetail(id)}
                  coordinate={{ latitude, longitude }}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image
                      style={styles.mapMarkerImage}
                      source={{
                        uri: image
                      }}
                    />
                    <Text style={styles.mapMarkerTitle}>{name}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          )}
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {itemsCollect?.map(({ id, title, image_url }) => {
            return (
              <TouchableOpacity
                style={[
                  styles.item,
                  selectedItems.includes(id) && styles.selectedItem,
                ]}
                key={id.toString()}
                activeOpacity={0.6}
                onPress={handleSelecItem(id)}
              >
                <SvgUri
                  width={42}
                  height={42}
                  uri={image_url.replace("localhost", "192.168.100.25")}
                />
                <Text style={styles.itemTitle}>{title}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

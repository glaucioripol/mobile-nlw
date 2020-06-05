import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { SvgUri } from "react-native-svg";

import { welcomePoints, searchInMapAPoint } from "../../common/strings";

import { api } from "../../services/api";

import { styles } from "./styles";

interface IItemResponse {
  id: number;
  title: string;
  image_url: string;
}
// https://youtu.be/xYeaHqpTo3Y?t=5422
export const Points: React.FC = () => {
  const [itemsCollect, setItemsCollect] = useState<IItemResponse[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const { goBack, navigate } = useNavigation();
  function handleOnPressReturn() {
    goBack();
  }

  function handleOnPressToDetail() {
    navigate("Detail");
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

  // requests
  function retrieveItemsToCollect(): void {
    api //definir tipo para desestruturar
      .get("/items")
      .then(({ data }) => {
        setItemsCollect(data.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(retrieveItemsToCollect, []);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleOnPressReturn}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>
        <Text style={styles.title}>{welcomePoints}</Text>
        <Text style={styles.description}>{searchInMapAPoint}</Text>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -19.9375236,
              longitude: -44.1245426,
              latitudeDelta: 0.14,
              longitudeDelta: 0.14,
            }}
          >
            <Marker
              onPress={handleOnPressToDetail}
              coordinate={{ latitude: -19.9375236, longitude: -44.1245426 }}
            >
              <View style={styles.mapMarkerContainer}>
                <Image
                  style={styles.mapMarkerImage}
                  source={{
                    uri:
                      "https://cdn.vox-cdn.com/thumbor/wg0JG0pgUHhQEBMYvLAGCXi1AVM=/0x0:5760x3840/1200x675/filters:focal(2329x1554:3249x2474)/cdn.vox-cdn.com/uploads/chorus_image/image/66656302/GettyImages_1203053955.0.jpg",
                  }}
                />
                <Text style={styles.mapMarkerTitle}>nome da api</Text>
              </View>
            </Marker>
          </MapView>
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

import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { SvgUri } from "react-native-svg";

import { welcomePoints, searchInMapAPoint } from "../../common/strings";

import { styles } from "./styles";

export const Points: React.FC = () => {
  const { goBack, navigate } = useNavigation();
  function handleOnPressReturn() {
    goBack();
  }

  function handleOnPressToDetail() {
    navigate('Detail')
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
          <TouchableOpacity style={styles.item}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.100.25:3333/uploads/oleo.svg"
            />
            <Text style={styles.itemTitle}>oleo</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

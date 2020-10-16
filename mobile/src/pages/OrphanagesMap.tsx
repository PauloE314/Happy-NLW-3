import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Text, StatusBar } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { Feather } from "@expo/vector-icons";

import mapMarker from "../images/mapMarker.png";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import api from "../services/api";

interface IOrphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function App() {
  const navigation = useNavigation();
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);

  useFocusEffect(() => {
    api.get("orphanages").then((response) => {
      setOrphanages(response.data);
    });
  });

  function handleDetailNavigation(id: number) {
    navigation.navigate("OrphanageDetails", { id });
  }

  function handleCreateNavigation() {
    navigation.navigate("SelectMapPosition");
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      {/* Map view */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -7.076493,
          longitude: -34.8521337,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map((orphanage) => (
          <Marker
            key={orphanage.id}
            icon={mapMarker}
            calloutAnchor={{
              x: 2.7,
              y: 0.8,
            }}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }}
          >
            <Callout
              tooltip
              onPress={() => handleDetailNavigation(orphanage.id)}
            >
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} orfanatos encontrados
        </Text>

        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleCreateNavigation}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 16,
    justifyContent: "center",
    elevation: 3,
  },

  calloutText: {
    color: "#0089a5",
    fontFamily: "Nunito_700Bold",
    fontSize: 14,
  },

  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: "#FFF",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 3,
  },

  footerText: {
    color: "#8fa7b3",
    fontFamily: "Nunito_700Bold",
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: "#15c3d6",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },
});

import React, { FC, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  Animated,
} from "react-native";

import Paginator from "../components/Paginator";
import { getCurrentUserData } from "../services/firebaseServices";
import { ICreatorsData } from "./HomeScreen";

interface IRenderItem {
  item?: any;
}

const initialState: ICreatorsData = {
  description: "",
  email: "",
  expertise: "",
  id: "",
  name: "",
  socialMedia: {
    facebook: "",
    instagram: "",
    tiktok: "",
  },
  test: false,
  userLocation: {
    latitude: 0,
    longitude: 0,
  },
};

const dataArray = [
  {
    image: require("../assets/nailstwo.jpg"),
  },
  {
    image: require("../assets/nailstwo.jpg"),
  },
  {
    image: require("../assets/nailstwo.jpg"),
  },
  {
    image: require("../assets/nailstwo.jpg"),
  },
  {
    image: require("../assets/nailstwo.jpg"),
  },
];

const RenderItem: FC<IRenderItem> = ({ item }: any) => {
  return (
    <View style={styles.flatlistContainer}>
      <Image style={styles.flatlistImage} source={item.image} />
    </View>
  );
};

const CreatorsScreen = (props: any) => {
  const creatorsData = props.route.params.creatorData;
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const [dataFromFS, setDataFromFS] = useState();

  const fecthCurrentUserData = async (docName: string | null) => {
    console.log(
      "TAG FIRESTORE data of a user: ",
      await getCurrentUserData(docName)
    );
    console.log("TAG kommer vi hit?");
  };

  useEffect(() => {
    if(props.route.params.isProfile && props.route.params.docID){
      fecthCurrentUserData(props.route.params.docID.providerData[0].email);
    };
    // console.log('TAG props.route.params.isProfile: ', props.route.params.isProfile);
    // console.log('TAG props.route.params.docID: ', props.route.params.docID);
  }, []);

  return props.route.params.creatorData ? (
    <ScrollView style={styles.container}>
      <Image
        style={styles.imageConatiner}
        source={require("../assets/nailstwo.jpg")}
      />

      <View style={styles.descriptionContainer}>
        <Text style={styles.titleText}>{creatorsData.expertise}</Text>
        <Text style={styles.underText}>{creatorsData.name}</Text>
        <Text style={styles.descriptionText}>{creatorsData.description}</Text>

        <Text style={styles.underText}>{creatorsData.email}</Text>
      </View>

      <View style={{ flex: 3, alignItems: "center" }}>
        <FlatList
          data={dataArray}
          renderItem={({ item }) => <RenderItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig}
        />
        <Paginator data={dataArray} scrollX={scrollX} />
      </View>
    </ScrollView>
  ) : props.route.params.isProfile ? (
    <Text style={{ color: "black" }}>
      props.route.params.isProfile == {props.route.params.isProfile}
    </Text>
  ) : (
    <Text>Allt är null</Text>
  );
};

export default CreatorsScreen;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  descriptionContainer: {
    padding: 32,
  },
  imageConatiner: {
    height: 300,
    width: "100%",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Cochin",
    paddingBottom: 16,
  },
  underText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Cochin",
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: "Cochin",
    paddingBottom: 16,
  },
  flatlistContainer: {
    paddingBottom: 16,
    paddingTop: 16,
    width: Dimensions.get("window").width,
  },
  flatlistImage: {
    flex: 0.7,
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: 500,
  },
});

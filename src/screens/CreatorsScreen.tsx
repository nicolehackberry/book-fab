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
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";

import Paginator from "../components/Paginator";
import { RootState } from "../redux/store";
import { setUserData } from "../services/firebaseServices";
import { ICreatorsData } from "./HomeScreen";
import { ErrorComponent } from "../components/ErrorComponent";
import { setCreatorsImages } from "../redux/actions/localDataActions";

interface IRenderItem {
  item?: any;
  callback?: (value: string[]) => void;
}

export const initialState: ICreatorsData = {
  description: "",
  email: "",
  expertise: "",
  id: "",
  name: "",
  profileImage: "",
  images: [
    "file:///var/mobile/Containers/Data/Application/31879708-644B-46D8-A045-D4DECCA81508/Library/Caches/ExponentExperienceData/%2540xloopez%252Fbook-fab/ImagePicker/41442699-1948-4C81-AA43-1699B208E328.jpg",
  ],
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
  require("../assets/nailstwo.jpg"),
  require("../assets/nailstwo.jpg"),
  require("../assets/nailstwo.jpg"),
  require("../assets/nailstwo.jpg"),
  require("../assets/nailstwo.jpg"),
];

const RenderItem: FC<IRenderItem> = ({ item }: any) => {
  return (
    <View style={styles.flatlistContainer}>
      <Image style={styles.flatlistImage} source={{ uri: item }} />
    </View>
  );
};

const RenderDefaultItem: FC<IRenderItem> = ({ item }: any) => {
  return (
    <View style={styles.flatlistContainer}>
      <Image style={styles.flatlistImage} source={item} />
    </View>
  );
};

const RenderPickImagesItem: FC<IRenderItem> = ({ item, callback }) => {
  const dispatch = useDispatch();

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) return;
    if (result?.uri) dispatch(setCreatorsImages(result.uri));
  };

  return (
    <View style={styles.flatlistContainer}>
      <ImageBackground
        style={styles.flatlistImage}
        resizeMode={"cover"}
        source={{ uri: item }}
      >
        <LinearGradient
          colors={["#00000000", "#000000"]}
          style={styles.gradient}
        >
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => {
              pickImages();
            }}
          >
            <Text style={{ color: "white" }}>Add Images</Text>
            <Entypo name="images" size={24} color="white" />
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const CreatorsScreen = (props: any) => {
  const creatorsData = props.route.params.creatorData;
  const userId = props.route.params.isProfile
    ? props.route.params.docID.providerData[0].email
    : "";
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const userLocation = useSelector(
    (state: RootState) => state.localData.userLocation
  );
  const images = useSelector(
    (state: RootState) => state.localData.creatorImage
  );
  const imageFallback = images.length ? images : initialState.images;
  const creatorData = props.route.params.creatorData
    ? props.route.params.creatorData
    : undefined;
  const [formValues, setFormValues] = useState<ICreatorsData>(
    creatorsData ? creatorsData : initialState
  );
  const [test, setTest] = useState(true);

  const setUserDataToFS = (id: string, data: ICreatorsData) =>
    setUserData(id, data);

  const onFormItemChange = (field: string, value: any) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      onFormItemChange("profileImage", result.uri);
    }
  };

  useEffect(() => {
    if (userLocation) {
      onFormItemChange("userLocation", userLocation);

      setTest(false);
    } else {
      setTest(true);
    }
  }, [userLocation]);

  return props.route.params.creatorData ? (
    <ScrollView style={styles.container}>
      {creatorsData.profileImage ? (
        <Image
          style={styles.imageConatiner}
          source={{ uri: creatorsData.profileImage }}
        />
      ) : (
        <Image
          style={styles.imageConatiner}
          source={require("../assets/nailstwo.jpg")}
        />
      )}

      <View style={styles.descriptionContainer}>
        <Text style={styles.titleText}>{creatorsData.expertise}</Text>
        <Text style={styles.underText}>{creatorsData.name}</Text>
        <Text style={styles.descriptionText}>{creatorsData.description}</Text>

        <Text style={styles.underText}>{creatorsData.email}</Text>
      </View>

      <View style={{ flex: 3, alignItems: "center" }}>
        {creatorsData.images ? (
          <>
            <FlatList
              data={creatorsData.images}
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
          </>
        ) : (
          <>
            <FlatList
              data={dataArray}
              renderItem={({ item }) => <RenderDefaultItem item={item} />}
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
          </>
        )}

        <Paginator
          data={creatorsData.images ? creatorsData.images : dataArray}
          scrollX={scrollX}
        />
      </View>
    </ScrollView>
  ) : props.route.params.isProfile ? (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={styles.imageConatiner}
        resizeMode={"cover"}
        source={
          creatorsData || formValues.profileImage !== initialState.profileImage
            ? { uri: formValues.profileImage }
            : require("../assets/nailstwo.jpg")
        }
      >
        <LinearGradient
          colors={["#00000000", "#000000"]}
          style={styles.gradient}
        >
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => {
              pickImage();
            }}
          >
            <Text style={{ color: "white" }}>Add profile image</Text>
            <Entypo name="image" size={24} color="white" />
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.descriptionContainer}>
        <TextInput
          editable
          multiline
          placeholder={
            creatorData ? formValues.expertise : "Enter you'r area of expertise"
          }
          defaultValue={creatorData ? formValues.expertise : ""}
          onChangeText={(text) => onFormItemChange("expertise", text)}
          style={styles.textInput}
        />

        <TextInput
          editable
          multiline
          placeholder={
            creatorsData ? formValues.name : "Enter you'r display ame"
          }
          defaultValue={creatorsData ? formValues.name : ""}
          onChangeText={(text) => onFormItemChange("name", text)}
          style={styles.textInput}
        />

        <TextInput
          editable
          multiline
          placeholder={
            creatorsData
              ? formValues.description
              : "Enter a description of what you do"
          }
          defaultValue={creatorsData ? formValues.description : ""}
          onChangeText={(text) => onFormItemChange("description", text)}
          style={styles.textInput}
        />

        <TextInput
          editable
          multiline
          placeholder={creatorsData ? formValues.email : "E-mail"}
          defaultValue={creatorsData ? formValues.email : ""}
          onChangeText={(text) => onFormItemChange("email", text)}
          style={styles.textInput}
        />
      </View>

      <View style={{ flex: 3, alignItems: "center" }}>
        <FlatList
          data={imageFallback}
          renderItem={({ item }) => (
            <RenderPickImagesItem
              item={item}
              callback={([...value]: string[]) =>
                onFormItemChange("images", [...value])
              }
            />
          )}
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
        {creatorsData ? (
          <Paginator data={creatorsData.images} scrollX={scrollX} />
        ) : (
          <Paginator data={imageFallback} scrollX={scrollX} />
        )}
      </View>

      <Button
        disabled={test}
        style={styles.button}
        mode={"contained"}
        onPress={() => {
          setUserDataToFS(userId, { ...formValues, images });
          props.route.params.navigation.navigate("ProfileScreen");
        }}
      >
        Save changes
      </Button>
    </ScrollView>
  ) : (
    <ErrorComponent />
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
    minHeight: 300,
    minWidth: 150,
    height: 300,
    flex: 1,
    resizeMode: "cover",
    width: "100%",
  },
  gradient: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
  textInput: {
    margin: 10,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 25,
    justifyContent: "space-evenly",
  },
  button: {
    margin: 10,
    marginBottom: 50,
  },
});

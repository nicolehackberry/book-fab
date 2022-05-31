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
} from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";

import Paginator from "../components/Paginator";
import { RootState } from "../redux/store";
import { getCurrentUserData, setUserData } from "../services/firebaseServices";
import { ICreatorsData } from "./HomeScreen";
import { ErrorComponent } from "../components/ErrorComponent";

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
  const userId = props.route.params.isProfile
    ? props.route.params.docID.providerData[0].email
    : "";
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const userLocation = useSelector(
    (state: RootState) => state.localData.userLocation
  );
  const creatorData = props.route.params.creatorData
    ? props.route.params.creatorData
    : undefined;
  const [formValues, setFormValues] = useState<ICreatorsData>(
    creatorsData ? creatorsData : initialState
  );
  const [test, setTest] = useState(false);

  const [dialogVisible, setDialogVisible] = useState(false);
  const showHideDialog = () => setDialogVisible(!dialogVisible);

  const setUserDataToFS = (id: string, data: ICreatorsData) =>
    setUserData(id, data);

  useEffect(() => {
    //console.log("TAG lyssnar på form values: ", userLocation);
    if (userLocation) {
      onFormItemChange("userLocation", userLocation);
      setTest(true);
    }
  }, [userLocation]);

  const onFormItemChange = (field: string, value: any) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  const fecthCurrentUserData = async (docName: string | null) => {
    console.log(
      "TAG FIRESTORE data of a user: ",
      await getCurrentUserData(docName)
    );
    console.log("TAG kommer vi hit?");
  };

  useEffect(() => {
    if (props.route.params.isProfile && props.route.params.docID) {
      fecthCurrentUserData(props.route.params.docID.providerData[0].email);
    }
    console.log('TAG props.route.params.isProfile: ', props.route.params);
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
    <ScrollView style={styles.container}>
      <Image
        style={styles.imageConatiner}
        source={require("../assets/nailstwo.jpg")}
      />

      <View style={styles.descriptionContainer}>
        <TextInput
          //mode="outlined"
          //label={"Label 1"}
          editable
          multiline
          placeholder={
            creatorData ? formValues.expertise : "Enter you'r area of expertise"
          }
          defaultValue={creatorData ? formValues.expertise : ""}
          //right={<TextInput.Icon name="label-outline" onPress={() => {}} />}
          onChangeText={(text) => onFormItemChange("expertise", text)}
          style={styles.textInput}
        />

        <TextInput
          //mode="outlined"
          //label={'Label 2'}
          editable
          multiline
          placeholder={
            creatorsData ? formValues.name : "Enter you'r display ame"
          }
          defaultValue={creatorsData ? formValues.name : ""}
          //right={<TextInput.Icon name="script-outline" onPress={() => {}} />}
          onChangeText={(text) => onFormItemChange("name", text)}
          style={styles.textInput}
        />

        <TextInput
          //mode="outlined"
          //label={'Label 2'}
          editable
          multiline
          placeholder={
            creatorsData
              ? formValues.description
              : "Enter a description of what you do"
          }
          defaultValue={creatorsData ? formValues.description : ""}
          //right={<TextInput.Icon name="script-outline" onPress={() => {}} />}
          onChangeText={(text) => onFormItemChange("description", text)}
          style={styles.textInput}
        />

        <TextInput
          //mode="outlined"
          //label={'Label 2'}
          editable
          multiline
          placeholder={creatorsData ? formValues.email : "E-mail"}
          defaultValue={creatorsData ? formValues.email : ""}
          //right={<TextInput.Icon name="script-outline" onPress={() => {}} />}
          onChangeText={(text) => onFormItemChange("email", text)}
          style={styles.textInput}
        />

        {/* <TextInput
          //mode="outlined"
          //label={'Label 2'}
          editable
          multiline
          keyboardType='numeric'
          placeholder={creatorsData ? formValues.userLocation.latitude : "E-mail"}
          defaultValue={creatorsData ? formValues.email : ""}
          //right={<TextInput.Icon name="script-outline" onPress={() => {}} />}
          onChangeText={(text) => onFormItemChange("email", text)}
          style={styles.textInput}
        /> */}

        {/* <Text style={styles.titleText}>{creatorsData.expertise}</Text>
        <Text style={styles.underText}>{creatorsData.name}</Text>
        <Text style={styles.descriptionText}>{creatorsData.description}</Text>

        <Text style={styles.underText}>{creatorsData.email}</Text> */}
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

      <Button
        disabled={test ? false : true}
        style={styles.button}
        mode={"contained"}
        onPress={() => {
          setUserDataToFS(userId, formValues);
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

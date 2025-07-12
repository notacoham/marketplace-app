import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { app } from "../../firebaseConfig";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

export default function AddPostScreen() {
  const [image, setImage] = useState(null);
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod = (value) => (value.image = image);

  return (
    <View className="p-10">
      <Text className="text-[27px] font-bold">Add New Post</Text>
      <Text className="text-[18px] text-gray-500 mb-7">
        Create New Post and Start Selling
      </Text>
      <Formik
        initialValues={{
          name: "",
          desc: "",
          category: "",
          address: "",
          price: "",
          image: "",
        }}
        onSubmit={(value) => onSubmitMethod(value)}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            console.log("Title not present");
            ToastAndroid.show("You must have a title", ToastAndroid.SHORT);

            errors.name = "Title not Present";
          }
          return errors;
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          errors,
        }) => {
          return (
            <View>
              <TouchableOpacity onPress={pickImage}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 100, height: 100, borderRadius: 15 }}
                  />
                ) : (
                  <Image
                    style={{ width: 100, height: 100, borderRadius: 15 }}
                    source={require("../../assets/images/placeholder.jpg")}
                  />
                )}
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Title"
                value={values?.title}
                onChangeText={handleChange("title")}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={values?.desc}
                numberOfLines={5}
                onChangeText={handleChange("desc")}
              />
              <TextInput
                style={styles.input}
                placeholder="Price"
                value={values?.price}
                keyboardType="numeric"
                onChangeText={handleChange("price")}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={values?.address}
                onChangeText={handleChange("address")}
              />
              {/* Category List Dropdown */}
              <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 15 }}>
                <Picker
                  className="border-2"
                  selectedValue={values?.category}
                  onValueChange={(itemValue) =>
                    setFieldValue("category", itemValue)
                  }
                >
                  {categoryList &&
                    categoryList.map((item, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={item?.name}
                          value={item?.name}
                        />
                      );
                    })}
                </Picker>
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                className="p-4 bg-blue-500 rounded-full mt-10"
              >
                <Text className="text-white text-center text-[16px] ">
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    paddingHorizontal: 17,
    fontSize: 17,
    marginTop: 10,
    marginBottom: 5,
    textAlignVertical: "top",
  },
});

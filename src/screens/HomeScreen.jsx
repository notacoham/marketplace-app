import { SafeAreaView, View } from "react-native";
import Header from "../components/HomeScreen/Header";
import Slider from "../components/HomeScreen/Slider";
import { app } from "../../firebaseConfig";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [sliderList, setSliderList] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    getSliders();
  }, []);

  // Get HomeScreen Sliders
  const getSliders = async () => {
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };
  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="py-8 px-6">
        <Header />
        <Slider sliderList={sliderList} />
      </View>
    </SafeAreaView>
  );
}

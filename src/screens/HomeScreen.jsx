import { SafeAreaView, ScrollView, View } from "react-native";
import Header from "../components/HomeScreen/Header";
import Slider from "../components/HomeScreen/Slider";
import { app } from "../../firebaseConfig";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import Categories from "../components/HomeScreen/Categories";
import LatestItemList from "../components/HomeScreen/LatestItemList";

export default function HomeScreen() {
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    getSliders();
    getCategoryList();
    getLatestItemList();
  }, []);

  // Get HomeScreen Sliders
  const getSliders = async () => {
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const getLatestItemList = async () => {
    setLatestItemList([]);
    const querySnapShot = await getDocs(collection(db, "UserPost"));
    querySnapShot.forEach((doc) => {
      console.log(doc.data());
      setLatestItemList((latestItemList) => [...latestItemList, doc.data()]);
    });
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView className="py-8 px-6">
        <Header />
        <Slider sliderList={sliderList} />
        <Categories categoryList={categoryList} />
        <LatestItemList latestItemList={latestItemList} />
      </ScrollView>
    </SafeAreaView>
  );
}

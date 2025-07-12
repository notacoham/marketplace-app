import { SafeAreaView, View } from "react-native";
import Header from "../components/HomeScreen/Header";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View className="py-8 px-6 bg-white flex flex-1">
        <Header />
      </View>
    </SafeAreaView>
  );
}

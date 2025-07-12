import { View, Text, FlatList, Image } from "react-native";

export default function Slider({ sliderList }) {
  return (
    <View className="mt-5">
      <FlatList
        data={sliderList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View>
              <Image
                source={{ uri: item?.image }}
                className="h-[140px] w-[330px] mr-3 rounded-lg object-contain"
              />
            </View>
          );
        }}
      />
    </View>
  );
}

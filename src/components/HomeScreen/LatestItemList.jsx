import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";

export default function LatestItemList({ latestItemList }) {
  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">Latest Items</Text>
      <FlatList
        numColumns={2}
        data={latestItemList}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity className="flex-1 m-2 p-2 rounded-lg border-[1px] border-slate-200">
              <Image
                source={{ uri: item.image }}
                className="w-full h-[140px] rounded-lg"
              />
              <View>
                <Text className="text-[15px] font-bold mt-2">{item.title}</Text>
                <Text className="text-[20px] font-bold text-blue-500">
                  $ {item.price}
                </Text>
                <Text className="text-blue-500 bg-blue-200 p-[2px] mt-1 rounded-full px-2 w-[70px] text-center text-[12px]">
                  {item.category}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

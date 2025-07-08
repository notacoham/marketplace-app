import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React from "react";

export default function LoginScreen() {
  return (
    <View>
      <Image
        source={require("./../../assets/images/login.jpg")}
        className="w-full h-[400px] object-cover"
      />
      <View className="p-8 bg-white mt-[-20px] rounded-t-3xl">
        <Text className="text-[35px] font-bold">Community Marketplace</Text>
        <Text className="text-[18px] text-slate-500 mt-6">
          Buy Sell Marketplace where you can sell old items and make new money
        </Text>
        <TouchableOpacity
          onPress={() => console.log("Sign In")}
          className="p-4 bg-blue-500 rounded-full mt-20"
        >
          <Text className="text-white text-center text-[18px]">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

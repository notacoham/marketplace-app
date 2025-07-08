import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow, isLoading } = useOAuth({ strategy: "oauth_google" });

  const onPress = useCallback(async () => {
    try {
      // Close any existing browser sessions
      await WebBrowser.dismissBrowser();
      
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
      
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Handle sign in or sign up if needed
      }
    } catch (error) {
      if (error.message.includes("You're already signed in")) {
        // Handle already signed in case
        console.log("User is already signed in");
        // You might want to navigate to your main app screen here
      } else if (error.message.includes("Another web browser is already open")) {
        // Try to dismiss the browser and let the user try again
        await WebBrowser.dismissBrowser();
      } else {
        console.error("OAuth error", error);
      }
    }
  }, []);

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
          onPress={onPress}
          disabled={isLoading}
          className={`p-4 ${isLoading ? 'bg-blue-300' : 'bg-blue-500'} rounded-full mt-20`}
        >
          <Text className="text-white text-center text-[18px]">
            {isLoading ? "Loading..." : "Get Started"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

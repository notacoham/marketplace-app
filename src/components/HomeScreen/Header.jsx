import { View, Text, Image, TextInput } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  const { user } = useUser();
  return (
    <View>
      <View className="flex flex-row items-center gap-2">
        <Image
          source={{ uri: user?.imageUrl }}
          className="rounded-full w-12 h-12"
        />
        <View>
          <Text className="text-[16px]">Welcome</Text>
          <Text className="text-[20px]">{user?.fullName}</Text>
        </View>
      </View>

      <View className="flex flex-row items-center gap-2 p-3 border-[1px] border-blue-500 bg-white rounded-full px-5 mt-5">
        <Ionicons name="search" size={24} color="gray" />
        <TextInput
          placeholder="Search"
          className="ml-2 text-[18px]"
          onChangeText={(text) => {
            console.log(text);
          }}
        />
      </View>
    </View>
  );
}

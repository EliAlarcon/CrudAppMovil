import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { styles } from "../theme/styles";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { ProductCardComponent } from "./components/ProductCardComponent";
import { onValue, ref } from "firebase/database";
import { dbRealTime } from "../configs/firebaseConfig";
import { FlatList } from "react-native-gesture-handler";

export interface Product {
  id: string;
  brand: string;
  model: string;
  serialNumber: string;
  price: number;
  systemOperating: string;
}

export const HomeScreen = () => {
  const navigation = useNavigation();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllMessages();
  }, []);

  const getAllMessages = () => {
    const dbRef = ref(dbRealTime, "products/");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      const getKeys = Object.keys(data);
      const listProducts: Product[] = [];
      getKeys.forEach((key) => {
        const value = { ...data[key], id: key };
        listProducts.push(value);
      });
      setProducts(listProducts);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text> Insertar un nuevo Producto</Text>
        <Button
          icon="store-plus"
          mode="contained"
          onPress={() =>
            navigation.dispatch(
              CommonActions.navigate({ name: "RegisterProduct" })
            )
          }
        >
          Nuevo Producto
        </Button>
      </View>
      <View>
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductCardComponent products={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

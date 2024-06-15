import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import { ref, update } from "firebase/database";
import { Product } from "../HomeScreen";
import { dbRealTime } from "../../configs/firebaseConfig";
import { styles } from "../../theme/styles";

export const EditProductScreen = () => {
  const route = useRoute();
  //@ts-ignore
  const { products } = route.params;

  const [editFormProduct, setEditFormProduct] = useState<Product>({
    id: "",
    brand: "",
    model: "",
    serialNumber: "",
    price: 0,
    systemOperating: "",
  });

  useEffect(() => {
    setEditFormProduct(products);
  }, []);

  const navigation = useNavigation();

  const handlerSetValues = (key: string, value: string) => {
    setEditFormProduct({ ...editFormProduct, [key]: value });
  };

  const handlerUpdateProduct = async () => {
    const dbRef = ref(dbRealTime, "products/" + editFormProduct.id);
    await update(dbRef, {
      brand: editFormProduct.brand,
      model: editFormProduct.model,
      price: editFormProduct.price,
      systemOperating: editFormProduct.systemOperating,
    });
    navigation.dispatch(CommonActions.navigate({name: 'Home'}))
  };

  return (
    <View style={styles.root}>
      <Text variant="titleMedium">Editar Registro de Computadora</Text>
      <View>
        <TextInput
          mode="outlined"
          label="Marca"
          value={editFormProduct.brand}
          style={styles.inputs}
          onChangeText={(value) => handlerSetValues("brand", value)}
        />
        <TextInput
          mode="outlined"
          label="Modelo"
          value={editFormProduct.model}
          style={styles.inputs}
          onChangeText={(value) => handlerSetValues("model", value)}
        />
        <TextInput
          mode="outlined"
          label="Precio"
          value={editFormProduct.price.toString()}
          style={styles.inputs}
          onChangeText={(value) => handlerSetValues("price", value)}
        />
        <TextInput
          mode="outlined"
          label="Sistema Operativo"
          value={editFormProduct.systemOperating}
          style={styles.inputs}
          onChangeText={(value) => handlerSetValues("systemOperating", value)}
        />
      </View>
      <Button
        icon="content-save-edit-outline"
        mode="contained"
        onPress={handlerUpdateProduct}
      >
        Actualizar
      </Button>
    </View>
  );
};

import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { styles } from "../theme/styles";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { push, ref, set, update } from "firebase/database";
import { dbRealTime } from "../configs/firebaseConfig";
import { Product } from "./HomeScreen";

//Interfaz del formulario de registro
interface FormProduct {
  brand: string;
  model: string;
  serialNumber: string;
  price: number;
  systemOperating: string;
}

export const RegisterProductScreen = () => {

  const [formProduct, setFormProduct] = useState<FormProduct>({
    brand: "",
    model: "",
    serialNumber: "",
    price: 0,
    systemOperating: "",
  });

  const navigation = useNavigation();

  const handlerSetValues = (key: string, value: string) => {
    setFormProduct({ ...formProduct, [key]: value });
  };


  const hadlerSaveProduct = async () => {
    //console.log(formProduct);
    //1. Referencia a la BDD y creación tabla */
    const dbRef = ref(dbRealTime, "products/");
    //2. Crear una colección - evitando sobreescritura de la data
    const saveProduct = push(dbRef);
    //3. Almacenar en la DBB
    try {
      await set(saveProduct, formProduct);
      //4. Limpiar formulario
      setFormProduct({
        brand: "",
        model: "",
        serialNumber: "",
        price: 0,
        systemOperating: "",
      });
    } catch (ex) {
      console.log(ex);
    }
    navigation.dispatch(CommonActions.navigate({ name: "Home" }));
  };

  return (
    <View style={styles.root}>
      <Text variant="titleMedium">Registro Nueva Computadora</Text>
      <View>
        <TextInput
          mode="outlined"
          label="Marca"
          placeholder="Escriba la marca"
          style={styles.inputs}
          onChangeText={(value) => handlerSetValues("brand", value)}
        />
        <TextInput
          mode="outlined"
          label="Modelo"
          placeholder="Escriba el modelo"
          style={styles.inputs}
          onChangeText={(value) => handlerSetValues("model", value)}
        />
        <TextInput
          mode="outlined"
          label="Número de serie"
          placeholder="Escriba el número de serie"
          style={styles.inputs}
          onChangeText={(value) => handlerSetValues("serialNumber", value)}
        />
        <TextInput
          mode="outlined"
          label="Precio"
          placeholder="Escriba el precio"
          style={styles.inputs}
          onChangeText={(value) => handlerSetValues("price", value)}
        />
        <TextInput
          mode="outlined"
          label="Sistema Operativo"
          placeholder="Escriba el sistema operativo"
          style={styles.inputs}
          onChangeText={(value) => handlerSetValues("systemOperating", value)}
        />
      </View>
      <Button icon="content-save" mode="contained" onPress={hadlerSaveProduct}>
        Registrar
      </Button>
    </View>
  );
};

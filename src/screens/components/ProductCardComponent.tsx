import { CommonActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { View } from "react-native";
import { styles } from "../../theme/styles";
import { Product } from "../HomeScreen";
import { ref, remove } from "firebase/database";
import { dbRealTime } from "../../configs/firebaseConfig";

interface Props {
  products: Product;
}

export const ProductCardComponent = ({ products }: Props) => {
  const navigation = useNavigation();

  const handlerDeletMessage = async () => {
    const dbRef = ref(dbRealTime, "products/" + products.id);
    await remove(dbRef);
  };

  return (
    <Card style={styles.card}>
        <Card.Title
          title={"Marca: " + products.brand}
          subtitle={"Modelo: " + products.model}
          right={()=><Text variant="titleMedium">Precio: {products.price} </Text>}
          left={() => <Avatar.Icon icon={"laptop"} />}
          style={{gap: 15}}
        />
        <Card.Actions>
        <Button onPress={() =>
            navigation.dispatch(CommonActions.navigate({name: "EditProduct", params: {products}}))
          }>Modificar</Button>
        <Button onPress={handlerDeletMessage}>Borrar</Button>
      </Card.Actions>
    </Card>
  );
};

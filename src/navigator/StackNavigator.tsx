import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/HomeScreen";
import { RegisterProductScreen } from "../screens/RegisterProductScreen";
import { EditProductScreen } from "../screens/components/EditProductScreen";

const Stack = createStackNavigator();

//Interfaz de rutas
interface Routes {
  name: string;
  screen: () => JSX.Element; //elemento JSX
  headerShown?: boolean;
}

//Arreglo que contiene las rutas de la aplicación
const routes: Routes[] = [
  { name: "Home", screen: HomeScreen },
  { name: "RegisterProduct", screen: RegisterProductScreen, headerShown: true },
  { name: "EditProduct", screen: EditProductScreen, headerShown: true },
];
export const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={"Home"}>
      {routes.map((item, index) => (
        <Stack.Screen
          key={index}
          name={item.name}
          //Si hay un valor asignado en headerShown asignar ese valor si no asignar false
          options={{ headerShown: item.headerShown ?? false }}
          component={item.screen}
        />
      ))}
    </Stack.Navigator>
  );
};

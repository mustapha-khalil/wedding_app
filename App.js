import "react-native-gesture-handler";

import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { enableScreens } from "react-native-screens";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";

import Colors from "./constants/Colors";
import InviteesScreen from "./screens/InviteesScreen";
import inviteeDetailScreen from "./screens/InviteeDetailScreen";
import TablesScreen from "./screens/TablesScreen";
import inviteeListReducer from "./store/reducers/InviteeList";
import TableDetailScreen from "./screens/TableDetailScreen";

enableScreens();

const rootReducer = combineReducers({
  inviteeList: inviteeListReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  const ListStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen
          name="inviteesList"
          component={InviteesScreen}
          options={{
            title: "Invitee List",
          }}
        />
        <Stack.Screen
          name="inviteeDetails"
          component={inviteeDetailScreen}
          options={{
            title: "Invitee Details",
          }}
        />
      </Stack.Navigator>
    );
  };

  const TableStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen
          name="tables"
          component={TablesScreen}
          options={{
            title: "Tables",
          }}
        />
        <Stack.Screen
          name="table"
          component={TableDetailScreen}
          options={{
            title: "Table Number",
          }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: Colors.accentColor,
            tabBarItemStyle: {
              fontSize: 25,
            },
            tabBarStyle: {
              fontSize: 20,
            },
            tabBarLabelStyle: {
              fontSize: 12,
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "listTab") {
                iconName = focused ? "checkbox" : "checkbox-outline";
              } else if (route.name === "tablesTab") {
                iconName = focused ? "grid-sharp" : "grid-outline";
              }
              return <Ionicons name={iconName} size={25} color={"red"} />;
            },
          })}
        >
          <Tab.Screen
            name="listTab"
            component={ListStackNavigator}
            options={{
              title: "Invitee List",
            }}
          />
          <Tab.Screen
            name="tablesTab"
            component={TableStackNavigator}
            options={{
              title: "Tables",
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

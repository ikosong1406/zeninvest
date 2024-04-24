import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import Splash from "./src/screens/Splash";
import Authentication from "./src/screens/Authentication";
import BottomTab from "./src/components/BottomTab";
import Portfolio from "./src/components/Portfolio";
import Colors from "./src/components/Colors";
import Deposit from "./src/components/Deposit";
import Withdraw from "./src/components/Withdraw";
import Transaction from "./src/components/Transaction";
import StockDetails from "./src/components/StockDetails";
import Invest1 from "./src/components/Invest1";
import Invest2 from "./src/components/Invest2";
import Success from "./src/components/Success";
import TransactionDetails from "./src/components/TransactionDetails";
import StockList from "./src/components/StockList";
import Account from "./src/components/Account";
import Setting from "./src/components/Setting";

const Stack = createStackNavigator();

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // async function getData() {
  //   const data = await AsyncStorage.getItem("isLoggedIn");
  //   setIsLoggedIn(data);
  // }

  // useEffect(() => {
  //   getData();
  // });

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={Colors.slateGray} />
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={Authentication}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tab"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Portfolio"
          component={Portfolio}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Deposit"
          component={Deposit}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Withdraw"
          component={Withdraw}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Transaction"
          component={Transaction}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StockDetails"
          component={StockDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Invest1"
          component={Invest1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Invest2"
          component={Invest2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TransactionDetails"
          component={TransactionDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StockList"
          component={StockList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

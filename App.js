import React, { useState, useEffect } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Header } from 'react-native-elements';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Switch,
  Button
} from "react-native";



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const HomeScreen = ({ navigation }) => {

  const [task, setTask] = useState([]);
 
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // async function addTask() {
  //   const search = task.filter(task => task === newTask);

  //   if (search.length !== 0) {
  //     Alert.alert("Atenção", "Nome da tarefa repetido!");
  //     return;
  //   }

  //   setTask([...task, newTask]);
  //   setNewTask("");

  //   Keyboard.dismiss();
  // }

  async function removeTask(item) {
    setTask(task.filter(tasks => tasks !== item))

  }

  useEffect(() => {
    async function carregaDados() {
      const task = await AsyncStorage.getItem("task");

      if (task) {
        setTask(JSON.parse(task));
      }
    }
    carregaDados();
  }, []);

  useEffect(() => {
    async function salvaDados() {
      AsyncStorage.setItem("task", JSON.stringify(task));
    }
    salvaDados();
  }, [task]);

  return (
    <>

      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior="padding"
        style={{ flex: 1 }}
        enabled={Platform.OS === "ios"}
      >
        <View style={styles.container}>
          <View style={styles.Body}>
            <FlatList
              data={task}
              keyExtractor={item => item.toString()}
              showsVerticalScrollIndicator={false}
              style={styles.FlatList}
              renderItem={({ item }) => (
                <View style={styles.ContainerView}>
                  {/* <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}>
                  </Switch> */}
                  <Text style={styles.Texto}>{item}</Text>
                  <TouchableOpacity onPress={() => removeTask(item)}>
                    <MaterialIcons
                      name="delete-forever"
                      size={25}
                      color="#f64c75"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>

          {/* <View style={styles.Form}>
            <TextInput
              style={styles.Input}
              placeholderTextColor="#999"
              autoCorrect={true}
              value={newTask}
              placeholder="Adicione uma tarefa"
              maxLength={25}
              onChangeText={text => setNewTask(text)}
            />
            <TouchableOpacity style={styles.Button} onPress={() => addTask()}>
              <Ionicons name="ios-add" size={20} color="white" />
            </TouchableOpacity>
          </View> */}
        </View>
      </KeyboardAvoidingView>
        
      <Button
         title="Add new Task"
        onPress={() =>
        navigation.navigate('Profile', { name: 'Jane' })}
      />
    
    
    </>
  );

};


const ProfileScreen = () => {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  // const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  async function addTask() {
    const search = task.filter(task => task === newTask);

    if (search.length !== 0) {
      Alert.alert("Atenção", "Nome da tarefa repetido!");
      return;
    }

    setTask([...task, newTask]);
    setNewTask("");

    Keyboard.dismiss();
    window.location.reload(true);
  }

  // async function removeTask(item) {
  //   setTask(task.filter(tasks => tasks !== item))

  // }

  useEffect(() => {
    async function carregaDados() {
      const task = await AsyncStorage.getItem("task");

      if (task) {
        setTask(JSON.parse(task));
      }
    }
    carregaDados();
  }, []);

  useEffect(() => {
    async function salvaDados() {
      AsyncStorage.setItem("task", JSON.stringify(task));
    }
    salvaDados();
  }, [task]);

  return (
    <>

      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior="padding"
        style={{ flex: 1 }}
        enabled={Platform.OS === "ios"}
      >
        <View style={styles.container}>

          
          <View style={styles.Form}>
            <TextInput
              style={styles.Input}
              placeholderTextColor="#999"
              autoCorrect={true}
              value={newTask}
              placeholder="Adicione uma tarefa"
              maxLength={25}
              onChangeText={text => setNewTask(text)}
            />
            <TouchableOpacity style={styles.Button} onPress={() => addTask()}>
              <Ionicons name="ios-add" size={20} color="white" />
            </TouchableOpacity>
          </View>
        
        
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

// const App = () => {
//   return (
//     <NavigationContainer>
//       {/* Rest of your app code */}
//     </NavigationContainer>
//   );
// };







// export default function App() {
//   const [task, setTask] = useState([]);
//   const [newTask, setNewTask] = useState("");
//   const [isEnabled, setIsEnabled] = useState(false);
//   const toggleSwitch = () => setIsEnabled(previousState => !previousState);

//   async function addTask() {
//     const search = task.filter(task => task === newTask);

//     if (search.length !== 0) {
//       Alert.alert("Atenção", "Nome da tarefa repetido!");
//       return;
//     }

//     setTask([...task, newTask]);
//     setNewTask("");

//     Keyboard.dismiss();
//   }

//   async function removeTask(item) {
//     setTask(task.filter(tasks => tasks !== item))

//   }

//   useEffect(() => {
//     async function carregaDados() {
//       const task = await AsyncStorage.getItem("task");

//       if (task) {
//         setTask(JSON.parse(task));
//       }
//     }
//     carregaDados();
//   }, []);

//   useEffect(() => {
//     async function salvaDados() {
//       AsyncStorage.setItem("task", JSON.stringify(task));
//     }
//     salvaDados();
//   }, [task]);

//   return (
//     <>
//     <Header
//       leftComponent={{ icon: 'menu', color: '#fff' }}
//       centerComponent={{ text: 'To Learning', style: { color: '#fff' } }}
//       rightComponent={{ icon: 'home', color: '#fff' }}
//     >

//     </Header>

//       <KeyboardAvoidingView
//         keyboardVerticalOffset={0}
//         behavior="padding"
//         style={{ flex: 1 }}
//         enabled={Platform.OS === "ios"}
//       >
//         <View style={styles.container}>
//           <View style={styles.Body}>
//             <FlatList
//               data={task}
//               keyExtractor={item => item.toString()}
//               showsVerticalScrollIndicator={false}
//               style={styles.FlatList}
//               renderItem={({ item }) => (
//                 <View style={styles.ContainerView}>
//                   {/* <Switch
//                     trackColor={{ false: "#767577", true: "#81b0ff" }}
//                     thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
//                     ios_backgroundColor="#3e3e3e"
//                     onValueChange={toggleSwitch}
//                     value={isEnabled}>
//                   </Switch> */}
//                   <Text style={styles.Texto}>{item}</Text>
//                   <TouchableOpacity onPress={() => removeTask(item)}>
//                     <MaterialIcons
//                       name="delete-forever"
//                       size={25}
//                       color="#f64c75"
//                     />
//                   </TouchableOpacity>
//                 </View>
//               )}
//             />
//           </View>

//           <View style={styles.Form}>
//             <TextInput
//               style={styles.Input}
//               placeholderTextColor="#999"
//               autoCorrect={true}
//               value={newTask}
//               placeholder="Adicione uma tarefa"
//               maxLength={25}
//               onChangeText={text => setNewTask(text)}
//             />
//             <TouchableOpacity style={styles.Button} onPress={() => addTask()}>
//               <Ionicons name="ios-add" size={20} color="white" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
    backgroundColor: "#FFF"
  },
  Body: {
    flex: 1
  },
  Form: {
    padding: 0,
    height: 60,
    justifyContent: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    paddingTop: 13,
    borderTopWidth: 1,
    borderColor: "#eee"
  },
  Input: {
    flex: 1,
    height: 40,
    backgroundColor: "#eee",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#eee"
  },
  Button: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c6cce",
    borderRadius: 4,
    marginLeft: 10
  },
  FlatList: {
    flex: 1,
    marginTop: 5
  },
  Texto: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center"
  },
  ContainerView: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 4,
    backgroundColor: "#eee",

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#eee"
  }
});



export default App;
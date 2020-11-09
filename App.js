import 'react-native-gesture-handler';
import { Header } from 'react-native-elements';
import React, { useState, useEffect } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Keyboard,
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
          options={
            {
              title: 'To Learning',
              headerTintColor: 'white', 
              headerStyle: {
                backgroundColor: '#2196F3'
              } 
            }
          }

        />
        <Stack.Screen name="New Task" component={ProfileScreen}
          options={
            {
              headerTintColor: 'white', 
              headerStyle: {
                backgroundColor: '#2196F3'
              } 
            }
          }
        
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const HomeScreen = ({ navigation }) => {

  const [task, setTask] = useState([{}]);
 
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
                  
                  <Text style={styles.Texto}>{item.nome}</Text>
                  
                  <View style={styles.divDisplayData}>
                    <MaterialIcons name="access-time" size={25} />
                    <Text style={styles.Texto}>{item.de} - {item.ate}</Text>
                  </View>
                  
                  
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
        </View>
      </KeyboardAvoidingView>
        
      <Button
         title="Add new Task"
        onPress={() =>
        navigation.navigate('New Task', { name: 'Jane' })}
      />
    
    
    </>
  );

};


const ProfileScreen = () => {
  const [task, setTask] = useState([{}]);
  const [newTask, setNewTask] = useState("");
  const [descriptionTask, setDescriptionTask] = useState("");
  const [de, setDe] = useState("");
  const [ate, setAte] = useState("");

  async function addTask() {
    
    if (newTask.length == 0 || newTask.trim() == "") {
      Alert.alert("Atenção", "Informe o nome da tarefa");
      return;
    }

    if(de.length == 0 || ate.length == 0){
      Alert.alert("Atenção", "Informe o periodo de estudo");
      return;
    }
    
    const nDe = de.toString().slice(0,2) + "/" + de.toString().slice(2,4)+"/"+de.toString().slice(4,8);
    const nAte = ate.toString().slice(0,2) + "/" + ate.toString().slice(2,4)+"/"+ate.toString().slice(4,8);
    
    setTask([...task, {"nome": newTask, "desc":descriptionTask,"de": nDe, "ate":nAte}]);
    setNewTask("");

    Keyboard.dismiss();
    window.location.reload(true);
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

          <View style={styles.Form}>
            <TextInput
              style={styles.Input}
              placeholderTextColor="#999"
              autoCorrect={true}
              value={newTask}
              placeholder="New task"
              maxLength={25}
              onChangeText={text => setNewTask(text)}
            />
          <TouchableOpacity style={styles.Button} onPress={() => addTask()}>
            <Ionicons name="ios-add" size={20} color="white" />
          </TouchableOpacity>
          </View>

          <View style={styles.Form}>
            <TextInput
              style={styles.InputDesc}
              placeholderTextColor="#999"
              autoCorrect={true}
              value={descriptionTask}
              placeholder="Description"
              maxLength={100}
              onChangeText={text => setDescriptionTask(text)}
            />
          </View>

          <View style={styles.FormData}>

            <TextInput
              style={styles.InputData}
              placeholderTextColor="#999"
              autoCorrect={true}
              value={de}
              placeholder="From"
              maxLength={8}
              keyboardType="numeric"
              onChangeText={text => setDe(text)}
            />
            <TextInput
              style={styles.InputData}
              placeholderTextColor="#999"
              autoCorrect={true}
              value={ate}
              placeholder="Until"
              maxLength={8}
              keyboardType="numeric"
              onChangeText={text => setAte(text)}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};



// Estilos da pagina
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 0,
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
    borderColor: "#eee",
    paddingBottom:30
  },
  FormData: {
    //padding: 0,
    height: 60,
    justifyContent: "space-around",
    alignSelf: "stretch",
    flexDirection: "row",
    paddingTop: 30,
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
  InputDesc: {
    flex: 1,
    height: 70,
    backgroundColor: "#eee",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#eee"
  },
  InputData: {
    height: 40,
    width: '30%',
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
  },
  divDisplayData: {
    //padding: 0,
    //height: 60,
    justifyContent: "space-around",
    alignSelf: "stretch",
    flexDirection: "row",
    paddingTop: 30,
    borderTopWidth: 1,
    borderColor: "#eee"
  }
});



export default App;
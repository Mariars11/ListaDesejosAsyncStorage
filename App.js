import React, { useState, useEffect, useId } from 'react'
import {StyleSheet, Button, View, TextInput, FlatList, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function App() {
    const [input, setInput] = useState('');  
    const [desejos, setDesejos] = useState([]);      
      

    useEffect(() => {
      loadData();
    }, [])
    
    async function loadData(){
      const data = await AsyncStorage.getItem('desejos');
      if(data !== null){
        setDesejos(JSON.parse(data));
      }
    }

    async function addDesejo(){
        const desejo = {id: Date.now(), name: input};
        const updateDesejo = [...desejos, desejo];
        setDesejos(updateDesejo);
        await AsyncStorage.setItem('desejos', JSON.stringify(updateDesejo));
        setInput('');
    }

    return (
      <View style={styles.container}>
        <View style={styles.viewInputBtn}>
          <TextInput
            style={styles.inputDesejo}
            value={input}
            placeholder="Adicione um desejo"
            onChangeText={(text) => {
              setInput(text)
            }}
          />
          <View>
              <Button title="+" color="black" onPress={() => addDesejo()}/>
          </View>

        </View>

        <FlatList
            data={desejos}
            renderItem={({item}) => <Item title={item.name} />}
            key={useId()}
        />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  
  inputDesejo:{
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
    width: 300,
  },
  viewInputBtn:{
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  item: {
    backgroundColor: '#d6d6d4',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
  }
});

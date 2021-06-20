import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './src/Home'
import Item from './src/Item'
import Scan from './src/Scan'
import ListProdutos from './src/ListItem'

const Stack = createStackNavigator()

function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: 'PDA-Mobile' }}
        />
        <Stack.Screen
          name='Item'
          component={Item}
          options={{ title: 'Cadastra Item' }}
        />
        <Stack.Screen
          name='Scan'
          component={Scan}
          options={{ title: 'Ler Código de Barras' }}
        />
        <Stack.Screen
          name='ListProdutos'
          component={ListProdutos}
          options={{ title: 'Lista de Produtos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

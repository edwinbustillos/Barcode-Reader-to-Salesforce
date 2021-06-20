import React from 'react'
import { Text, StyleSheet, View, BackHandler, Image } from 'react-native'

//const Separator = () => <View style={styles.separator} />

export default function Home ({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tela}
        resizeMode='contain'
        source={require('../assets/machine.png')}
      />
      <Text
        onPress={() => navigation.navigate('Scan')}
        style={{
          shadowOpacity: 1,
          elevation: 5,
          shadowRadius: 2.22,
          borderRadius: 12,
          borderWidth: 1,
          paddingTop: 11,
          color: '#fff',
          backgroundColor: '#b80026',
          borderColor: '#5a0012',
          height: 50,
          justifyContent: 'center',
          alignSelf: 'center',
          paddingLeft: 10,
          paddingRight: 10,
          fontSize: 18,
          fontWeight: 'bold',
          width: '100%',
          textAlign: 'center'
        }}
      >
        {' '}
        LER CÓDIGO DE BARRAS{' '}
      </Text>
      <Text
        onPress={() => navigation.navigate('ListProdutos')}
        style={{
          borderRadius: 12,
          shadowOpacity: 1,
          fontWeight: 'bold',
          elevation: 5,
          shadowRadius: 2.22,
          borderWidth: 1,
          borderColor: '#0034c3',
          paddingTop: 15,
          color: '#fff',
          backgroundColor: '#0060ff',
          justifyContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
          textAlign: 'center',
          height: 50,
          paddingLeft: 10,
          paddingRight: 10,
          top: 10,
          fontSize: 18,
          width: '100%'
        }}
      >
        {' '}
        VER LISTA{' '}
      </Text>
      <Text
        onPress={() => {
          BackHandler.exitApp()
        }}
        style={{
          borderRadius: 12,
          shadowOpacity: 1,
          fontWeight: 'bold',
          elevation: 5,
          shadowRadius: 2.22,
          borderWidth: 1,
          borderColor: '#888',
          paddingTop: 15,
          color: '#fff',
          backgroundColor: '#000',
          justifyContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
          textAlign: 'center',
          height: 50,
          paddingLeft: 10,
          paddingRight: 10,
          top: 20,
          fontSize: 18,
          width: '100%'
        }}
      >
        {' '}
        SAIR{' '}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 10
  },
  botao: {
    marginTop: 20,
    padding: 100
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  tela: {
    width: '100%',
    height: '70%',
    alignContent: 'center'
  }
})

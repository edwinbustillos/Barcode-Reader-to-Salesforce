import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

export default function ScanBarcode ({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    navigation.navigate('Item', { barcode: data })
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        cornerPoints
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.cameraContainer}
      >
        <Image style={styles.qr} source={require('../assets/barcode.png')} />
        <Text onPress={() => navigation.navigate('Home')} style={styles.cancel}>
          [ CANCELAR ]
        </Text>
      </BarCodeScanner>
      {scanned && (
        <Text
          onPress={() => setScanned(false)}
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
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  qr: {
    flex: 1,
    width: '80%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    top: '20%'
  },
  cameraContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#000',
    padding: 20
  },
  spinner: {
    width: 'auto',
    minWidth: 300,
    borderColor: 'gray',
    marginBottom: 30,
    borderWidth: 2
  },
  campo: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 2,
    backgroundColor: '#F4F4F4',
    fontSize: 24
  },
  cancel: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    width: '70%',
    height: '70%',
    color: 'white',
    top: '25%'
  }
})

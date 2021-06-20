import React, { Component } from 'react'
import { StyleSheet, View, Text, Alert, TextInput, Button } from 'react-native'
import InputSpinner from 'react-native-input-spinner'
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('barcode.db')

export default class Item extends Component {
  constructor (props) {
    super(props)
    this.state = {
      valor: 1
    }
  }

  componentDidMount () {
    db.transaction(tx => {
      //tx.executeSql('drop table if exists produtos;')
      tx.executeSql(
        'create table if not exists produtos (id integer primary key not null unique, data date, codigo_barras varchar(50),quantidade varchar(10),status varchar(20));'
      )
    })
  }

  add (codigo, qtd) {
    //DEfine Date now
    let day = new Date().getDate()
    let month = new Date().getMonth() + 1
    let year = new Date().getFullYear()
    let date_now = year + '-' + month + '-' + day
    let status = 'capturado'
    db.transaction(tx => {
      tx.executeSql(
        'insert into produtos (data,codigo_barras,quantidade,status) values (?,?,?,?)',
        [date_now, codigo, qtd, status],
        (tx, results) => {
          //console.warn('Results', results.rowsAffected);
          //console.warn(JSON.stringify(this.props))
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Item',
              'Cadastrado !',
              [
                {
                  text: 'Ok',
                  onPress: () => this.props.navigation.navigate('ListProdutos')
                }
              ],
              { cancelable: false }
            )
          } else {
            Alert.alert('Registro com Erro!')
          }
        }
      )
      //tx.executeSql('select * from produtos', [], (_, { rows }) => console.warn(JSON.stringify(rows)))
    })
  }

  render () {
    let quantidade = 0
    const barcode = this.props.route.params.barcode
    return (
      <View style={styles.container}>
        <TextInput style={styles.campo} value={barcode} textAlign={'center'} />
        <InputSpinner
          value={this.state.valor}
          style={styles.spinner}
          height={50}
          min={1}
          max={10}
          background={'#F4F4F4'}
          rounded={false}
          buttonFontSize={40}
          fontSize={30}
          precision={0}
          onChange={value => {
            this.setState({ valor: value })
          }}
        />
        <Text
          onPress={() =>
            this.add(this.props.route.params.barcode, this.state.valor)
          }
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
          CADASTRAR{' '}
        </Text>
        <Text
          onPress={() => this.props.navigation.navigate('Home')}
          style={{
            borderRadius: 12,
            shadowOpacity: 1,
            fontWeight: 'bold',
            elevation: 1,
            shadowRadius: 0.22,
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
            bottom: 5,
            fontSize: 18,
            width: '100%'
          }}
        >
          {' '}
          VOLTAR PARA HOME{' '}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  spinner: {
    width: 'auto',
    minWidth: 300,
    borderColor: 'gray',
    marginBottom: 0,
    borderWidth: 1,
    borderRadius: 12
  },
  campo: {
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    backgroundColor: '#F4F4F4',
    fontSize: 24,
    borderRadius: 12
  }
})

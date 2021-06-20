import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native'
import * as SQLite from 'expo-sqlite'
import axios from 'axios'

const db = SQLite.openDatabase('barcode.db')
export default class ListItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dados: []
    }
  }

  dadosSelect () {
    this.setState({
      dados: [{ id: 0, codebar: '------------', quantity: 0 }]
    })
    db.transaction(tx => {
      //tx.executeSql('drop table if exists produtos;')
      tx.executeSql(
        'create table if not exists produtos (id integer primary key not null unique, data date, codebar varchar(50),quantity varchar(10),status varchar(20));'
      )
      tx.executeSql('select * from produtos', [], (_, { rows }) => {
        var len = rows['_array'].length
        for (let i = 0; i < len; i++) {
          this.state.dados.push(rows['_array'][i])
        }
      })
    })
  }

  deleteProduto (id) {
    db.transaction(tx => {
      tx.executeSql('delete from produtos where id=?', [id], (tx, results) => {
        this.dadosSelect()
      })
    })
  }

  deleteAviso (id) {
    Alert.alert(
      'Remover Produto',
      'Deseja Deletar o Registro:' + id + '?',
      [
        {
          text: 'Não'
          //onPress: () => this.props.navigation.navigate('ListProdutos'),
        },
        {
          text: 'Sim',
          onPress: () => this.deleteProduto(id)
        }
      ],
      { cancelable: true }
    )
  }

  componentDidMount () {
    this.dadosSelect()
  }

  async postApiToken (id, codebar, quantity) {
    let data = new FormData()
    //SALESFORCE USER,PASSWORD,CLIENT_ID,CLIENTE_SECRET
    data.append('username', '')
    data.append('password', '')
    data.append('grant_type', 'password')
    data.append(
      'client_id',
      ''
    )
    data.append(
      'client_secret',
      ''
    )

    await axios
      .post('https://login.salesforce.com/services/oauth2/token', data, {
        headers: {
          'Content-Type':
            'multipart/form-data; boundary=<calculated when request is sent>',
          'Content-Length': '<calculated when request is sent>',
          Host: '<calculated when request is sent>'
          //other header fields
        }
      })
      .then(async response => {
        //console.warn(response.data.access_token)
        //Token Gerado vai para segunda requisição
        await axios.post(
          'https://your-host-salesforce-org/services/apexrest/AddProduct',
          {
            name: codebar,
            codeNumber: codebar,
            quantity: quantity
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': '<calculated when request is sent>',
              Host: '<calculated when request is sent>',
              Authorization: 'Bearer ' + response.data.access_token
              //other header fields
            }
          }
        )
        this.deleteProduto(id)
      })
      .catch(error => {
        //console.warn(error);
        Alert.alert(
          'Erro ao Sincronizar',
          'Verifique sua conexão!: ' + error,
          [{ text: 'Ok' }],
          { cancelable: true }
        )
      })

    //console.warn(JSON.stringify(res.data.access_token))
  }

  sendAviso (id, codebar, quantity) {
    Alert.alert(
      'Sincronizar Produto',
      'Enviar para Salesforce, registro:' + id + ' ?',
      [
        {
          text: 'Não'
          //onPress: () => this.props.navigation.navigate('ListProdutos'),
        },
        {
          text: 'Sim',
          onPress: () => this.postApiToken(id, codebar, quantity)
          //onPress: () => this.props.navigation.navigate('ListProdutos'),
        }
      ],
      { cancelable: true }
    )
  }

  render () {
    //console.warn(JSON.stringify(this.state.dados))
    return (
      <FlatList
        style={styles.container}
        data={this.state.dados}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', height: 50, marginBottom: 10 }}>
            <Text
              onPress={() => this.deleteAviso(item.id)}
              style={{
                shadowOpacity: 1,
                elevation: 5,
                shadowRadius: 2.22,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
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
                fontSize: 20,
                fontWeight: 'bold'
              }}
            >
              X
            </Text>
            <Text
              style={{
                shadowOpacity: 1,
                fontWeight: 'bold',
                elevation: 5,
                shadowRadius: 2.22,
                borderWidth: 1,
                borderColor: '#888',
                paddingTop: 15,
                color: '#000',
                backgroundColor: '#ccc',
                flexGrow: 2,
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                height: 50,
                paddingLeft: 10,
                paddingRight: 10
              }}
              key={item.id}
            >
              {item.id} | {item.codebar}
            </Text>
            <Text
              style={{
                shadowOpacity: 1,
                elevation: 5,
                shadowRadius: 2.22,
                borderWidth: 1,
                borderColor: '#000',
                paddingTop: 15,
                color: '#fff',
                backgroundColor: '#000',
                height: 50,
                paddingLeft: 10,
                paddingRight: 10
              }}
            >
              {item.quantity == null ? '0.0' : item.quantity}
            </Text>
            <Text
              onPress={() =>
                this.sendAviso(item.id, item.codebar, item.quantity)
              }
              style={{
                paddingTop: 11,
                fontSize: 20,
                fontWeight: 'bold',
                color: '#fff',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                height: 50,
                backgroundColor: '#0060ff',
                borderColor: '#0034c3',
                paddingLeft: 10,
                paddingRight: 10
              }}
            >
              >
            </Text>
          </View>
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20
  },
  campo: {
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 30,
    backgroundColor: '#F4F4F4',
    fontSize: 24
  }
})

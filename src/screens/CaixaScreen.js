import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Alert, Button, StyleSheet, Image, FlatList, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { firebase } from '../../firebaseConfig';
import * as Print from 'expo-print';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [pedidoData, setPedidoData] = useState({
    rua: '',
    cliente: '',
    telefone: '',
    bairro: '',
    referencia: '',
    numero: '',
    valor: '',
    observacao: '',
    taxaEntrega: '',
    adicional: '',
    total: '',
    via2: '',
    tipoEntrega: ''
  });

  const [order, setOrder] = useState({
    rua: '',
    cliente: '',
    telefone: '',
    bairro: '',
    referencia: '',
    numero: '',
    valor: '',
    taxaEntrega: '',
    total: '',
    adicional: '',
    observacao: '',
    via2: '',
    tipoEntrega: ''
  });

  const [caixaDate, setCaixaDate] = useState({
    rua: '',
    cliente: '',
    telefone: '',
    bairro: '',
    referencia: '',
    numero: '',
    valor: '',
    observacao: '',
    taxaEntrega: '',
    adicional: '',
    total: '',
    via2: '',
    tipoEntrega: ''
  });

  const confirmarPesquisa = async () => {
    pesquisarPorRua(searchQuery);
  };

  const pesquisarPorRua = async (pesquisa) => {
    const resultados = [];
    const querySnapshot = await firebase.firestore().collection("Caixa").get();
    querySnapshot.forEach((doc) => {
      const pedido = doc.data();
      const rua = pedido.rua ? pedido.rua.toLowerCase() : '';
      const cliente = pedido.cliente ? pedido.cliente.toLowerCase() : '';
      const numero = pedido.numero ? pedido.numero.toString() : '';

      if (rua.includes(pesquisa.toLowerCase()) || numero.includes(pesquisa.toLowerCase()) || cliente.includes(pesquisa.toLowerCase())) {
        resultados.push({ id: doc.id, ...pedido });
      }
    });
    setResults(resultados);
  };

  const apagarPedido = () => {
    if (!selectedPedido) {
      console.log("ID do pedido não está definido.");
      return;
    }

    const pedidoRef = firebase.firestore().collection("Caixa").doc(selectedPedido);
    pedidoRef.delete().then(() => {
      alert("Pedido apagado com sucesso!");
      confirmarPesquisa();
    }).catch((error) => {
      console.log("Erro ao apagar o documento:", error);
    });
  };

  const limitadorDeTexto = (text, maxLength) => {
    if (!text) {
      return '';
    }

    if (typeof text !== 'string') {
      text = text.toString();
    }

    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  };

  useEffect(() => {
    const valor = parseFloat(pedidoData.valor) || 0;
    const taxaEntrega = parseFloat(pedidoData.taxaEntrega) || 0;
    const adicional = parseFloat(pedidoData.adicional) || 0;
    const total = parseFloat(valor + taxaEntrega + adicional)|| 0;
    setPedidoData({ ...pedidoData, total: total.toString() });
  }, [pedidoData.numero, pedidoData.valor, pedidoData.taxaEntrega, pedidoData.adicional]);

  const handlePress = () => {
    setModalVisible(true);
  };

  const caixaMotoBoy_1 = () => {
    navigation.navigate('QUIDO')
     setModalVisible(false);
   }  

   const caixaMotoBoy_2 = () => {
     navigation.navigate('MIOJO')
      setModalVisible(false);
    }  

   const caixaMotoBoy_3 = () => {
     navigation.navigate('UENDER')
      setModalVisible(false);
    }  

    const calcularTotal = (valor, adicional, taxaEntrega) => {
     const total = parseFloat(valor) + parseFloat(adicional) + parseFloat(taxaEntrega);
     return total.toFixed(2);
   };

   const apagarTudo = async () => {
    const collectionRef = firebase.firestore().collection("Caixa");
  
    try {
      const snapshot = await collectionRef.get();
      const batch = firebase.firestore().batch();
  
      snapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
  
      await batch.commit();
      alert("Todos os pedidos foram apagados com sucesso!");
    } catch (error) {
      console.log("Erro ao apagar os documentos:", error);
    }
  } 

   const [modalVisible, setModalVisible] = useState(false);

   const Importar_Pedidos_1 = async (docId, setPedidoData) => {
    const pedidoRef = firebase.firestore().collection("Caixa").doc(docId);
    try {
      const doc = await pedidoRef.get();
      if (doc.exists) {
        const pedido = doc.data();
        const total = pedido.valor + pedido.taxaEntrega + pedido.adicional;
        const caixaDate = {
          rua: pedido.rua || '',
          cliente: pedido.cliente || '',
          telefone: pedido.telefone || '',
          bairro: pedido.bairro || '',
          referencia: pedido.referencia || '',
          numero: pedido.numero || '',
          valor: pedido.valor || 0,
          taxaEntrega: pedido.taxaEntrega || 0,
          total: pedido.total || 0,
          adicional: pedido.adicional || 0,
          observacao: pedido.observacao || '',
          via2: pedido.via2 || 0,
          tipoEntrega: pedido.tipoEntrega || '',
        };
  
        await firebase.firestore().collection('QUIDO').doc(docId).set(caixaDate);
        console.log('Pedido salvo com sucesso!');
  
        await pedidoRef.delete();
        console.log('Pedido apagado da coleção Caixa!');
  
        // Atualize o estado para acionar o useEffect
        setPedidoData(prevData => [...prevData, caixaDate]);
      } else {
        console.log("O pedido não foi encontrado!");
      }
    } catch (error) {
      console.log("Erro ao obter o documento:", error);
    }
  };

  const calcularTotalGeral = (pedidos) => {
    return pedidos.reduce((acc, pedido) => {
      const totalPedido = parseFloat(pedido.valor) + parseFloat(pedido.adicional) + parseFloat(pedido.taxaEntrega);
      return acc + totalPedido;
    }, 0).toFixed(2);
  };

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firebase.firestore().collection('QUIDO').get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPedidoData(data); // Atualize o estado com os dados da coleção MIOJO
      console.log(data);
    };
    fetchData();
  }, []);

  const Importar_Pedidos_2 = async (docId, setPedidoData) => {
    const pedidoRef = firebase.firestore().collection("Caixa").doc(docId);
    try {
      const doc = await pedidoRef.get();
      if (doc.exists) {
        const pedido = doc.data();
        const total = pedido.valor + pedido.taxaEntrega + pedido.adicional;
        const caixaDate = {
          rua: pedido.rua,
          cliente: pedido.cliente,
          numero: pedido.numero,
          telefone: pedido.telefone,
          tipoEntrega: pedido.tipoEntrega,
          observacao: pedido.observacao,
          valor: pedido.valor,
          taxaEntrega: pedido.taxaEntrega,
          total: total,
          adicional: pedido.adicional,
        };
  
        await firebase.firestore().collection('MIOJO').doc(docId).set(caixaDate);
        console.log('Pedido salvo com sucesso!');
  
        await pedidoRef.delete();
        console.log('Pedido apagado da coleção Caixa!');
  
        // Atualize o estado para acionar o useEffect
        setPedidoData(prevData => [...prevData, caixaDate]);
      } else {
        console.log("O pedido não foi encontrado!");
      }
    } catch (error) {
      console.log("Erro ao obter o documento:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firebase.firestore().collection('MIOJO').get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPedidoData(data); // Atualize o estado com os dados da coleção MIOJO
      console.log(data);
    };
    fetchData();
  }, []);

  const Importar_Pedidos_3 = async (docId, setPedidoData) => {
    const pedidoRef = firebase.firestore().collection("Caixa").doc(docId);
    try {
      const doc = await pedidoRef.get();
      if (doc.exists) {
        const pedido = doc.data();
        const total = pedido.valor + pedido.taxaEntrega + pedido.adicional;
        const caixaDate = {
          rua: pedido.rua,
          cliente: pedido.cliente,
          numero: pedido.numero,
          telefone: pedido.telefone,
          tipoEntrega: pedido.tipoEntrega,
          observacao: pedido.observacao,
          valor: pedido.valor,
          taxaEntrega: pedido.taxaEntrega,
          total: total,
          adicional: pedido.adicional,
        };
  
        await firebase.firestore().collection('UENDER').doc(docId).set(caixaDate);
        console.log('Pedido salvo com sucesso!');
  
        await pedidoRef.delete();
        console.log('Pedido apagado da coleção Caixa!');
  
        // Atualize o estado para acionar o useEffect
        setPedidoData(prevData => [...prevData, caixaDate]);
      } else {
        console.log("O pedido não foi encontrado!");
      }
    } catch (error) {
      console.log("Erro ao obter o documento:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firebase.firestore().collection('UENDER').get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPedidoData(data); // Atualize o estado com os dados da coleção MIOJO
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
        <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
              <TouchableOpacity style={modalMtb.modalOverlay} onPress={()=> setModalVisible(false)}>
                <View style={modalMtb.modalContent}>
                  <TouchableOpacity 
                    style={[modalMtb.optionButton, {
                      borderWidth: 2,
                      borderColor: 'blue',
                      backgroundColor:'skyblue'}]} 
                    onPress={() => caixaMotoBoy_1(navigation)}
                  >
                  <Text style={modalMtb.optionText}>QUIDO</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[modalMtb.optionButton, {
                    borderWidth: 2,
                    borderColor: 'green',
                    backgroundColor:'#70bf5d'}]} 
                  onPress={() => caixaMotoBoy_2(navigation)}
                >
                  <Text style={modalMtb.optionText}>MIOJO</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[modalMtb.optionButton, {
                    borderWidth: 2,
                    borderColor: 'black',
                    backgroundColor:'white'}]}  
                  onPress={() => caixaMotoBoy_3(navigation)}
                >
                  <Text style={modalMtb.optionText}>UENDER</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>

      <View style={{flexDirection: 'row'}}>
       <StatusBar style="light" translucent={true} backgroundColor="transparent" />
      <TouchableOpacity style={{
        alignSelf: 'flex-start',
        backgroundColor: 'red', 
        width: '80%',     
        height: 40, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: 40,
        borderTopStartRadius: 50}} onPress={confirmarPesquisa}>
        <Text style={{color:'white',fontWeight:'bold',fontSize:20,}} >Fixos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        alignSelf: 'flex-end',
        backgroundColor: 'red', 
        width: '20%',     
        height: 40, 
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center', 
        marginBottom: 40,
        borderTopEndRadius: 50}} onPress={handlePress}>
          <Image
          source={require("./../../assets/Not.png")}
          style={{
            width: '60%',
            height: '60%',
            color: 'red',
          }}
          />     
      </TouchableOpacity>
      </View>      
      <TextInput
        style={styles.input}
        placeholder="Buscar por nome da Rua, Nome e Número..."
        placeholderTextColor={'white'}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        style={{ flex: 1, width: '70%' }}
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { marginTop: 20 }]}>
            <View>
            <View style={styles.btnmoto}>
                <TouchableOpacity style={[styles.btncardsM, { backgroundColor: 'skyblue' }]} onPress={() => Importar_Pedidos_1(item.id, confirmarPesquisa)}>
                    <Text style={[styles.txtcardsbtn, { color: 'black'}]}>Q</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btncardsM, { backgroundColor: 'green' }]} onPress={() => Importar_Pedidos_2(item.id, confirmarPesquisa)}>
                    <Text style={[styles.txtcardsbtn, { color: 'black'}]}>M</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btncardsM, {backgroundColor: 'gray' }]} onPress={() => Importar_Pedidos_3(item.id, confirmarPesquisa)}>
                    <Text style={[styles.txtcardsbtn, { color: 'black'}]}>U</Text>
                </TouchableOpacity> 
            </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{limitadorDeTexto(item.cliente, 20)}</Text>
                <Text>{item.via2}</Text>
              </View>
              <View style={{ backgroundColor: 'gray', height: 1, width: '90%', marginTop: 5, marginBottom: 5 }} />
              <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Text style={{ fontWeight: 'bold' }}>Rua: </Text>
                <Text>{limitadorDeTexto(item.rua, 21)}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Text style={{ fontWeight: 'bold' }}>Número: </Text>
                <Text>{limitadorDeTexto(item.numero ? item.numero : '', 26)}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Text style={{ fontWeight: 'bold' }}>Observação: </Text>
                <Text>{limitadorDeTexto(item.observacao, 15)}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Text style={{ fontWeight: 'bold' }}>Valor Marmita: </Text>
                <Text>{limitadorDeTexto(item.valor, 28)}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}>Total: </Text>
                <Text>{limitadorDeTexto(item.total, 28)}</Text>
              </View>
              <TouchableOpacity
                style={[styles.btncards, { backgroundColor: 'red' }]}
                onPress={() => {
                  setSelectedPedido(item.id); // Define o pedido selecionado para deletar
                  Alert.alert(
                    "Confirmar",
                    `Tem certeza que deseja apagar o pedido do cliente ${item.cliente}?`,
                    [
                      {
                        text: "Não",
                        style: "cancel"
                      },
                      {
                        text: "Sim",
                        onPress: apagarPedido
                      }
                    ]
                  );
                }}
              >
                <Text style={styles.txtcardsbtn}>Apagar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
                <View style={{ padding: 10, backgroundColor: 'lightgray', width: '100%', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Total Geral: {calcularTotalGeral(results)}</Text>
          </View>
    </View>
  );
}

const modalMtb = StyleSheet.create({
  container: {
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderWidth: 2,
    borderColor: 'red',
    width: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  optionButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    width: '95%',
    alignItems: 'center',
  },
  optionText: {
    color: 'black',
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  topbar: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'red', 
    width: '65%',     
    height: 40, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 40,
    borderRadius: 50,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    color: 'white',
    paddingLeft: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '95%',
    borderRadius: 10,    
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderColor: 'red',
    width: '100%',
    alignItems: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    height: '70%',
    width: '80%',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  btncards: {
    width: 90,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtcardsbtn: {
    fontWeight: 'bold',
    color: 'white',
  },
  btncardsM: {
    borderWidth: 1,
    borderColor: 'black',
    width:40,
    height:30,
    borderRadius:15, 
    backgroundColor:'skyblue',
    justifyContent:'center',
    alignItems:'center', 
  },
  btnmoto: { 
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingBottom: 10,
  },
  tipoEntregaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16
  },
  tipoEntregaButton: {
    width: 90,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red'
  },
  tipoEntregaButtonSelected: {
    backgroundColor: 'red'
  },
  tipoEntregaText: {
    color: 'black'
  },
  valorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  valorButton: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10
  },
  valorText: {
    color: 'black'
  },
  valueControl: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  controlButton: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 5
  },
  controlButtonText: {
    color: 'black'
  },
  taxaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16
  }
});

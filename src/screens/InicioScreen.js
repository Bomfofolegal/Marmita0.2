import React, { useState,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Alert ,Button, StyleSheet, FlatList, Modal, TouchableOpacity,ScrollView, Image } from 'react-native';
import { firebase } from '../../firebaseConfig';
import * as Print from 'expo-print';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
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

    const [order, setOrder] = useState({
      rua: '',
      cliente: '',
      telefone: '',
      bairro: '',
      referencia: '',
      numero: '',
      valor: 0,
      taxaEntrega: '',
      total: '',
      adicional: '',
      observacao: '',
      via2: '',
      tipoEntrega: ''
    });


  const confirmarPesquisa = async () => {
    pesquisarPorRua(searchQuery);
  };


  const pesquisarPorRua = async (pesquisa) => {
    const resultados = [];
  
    for (const colecao of baseCollectionNames) {
      const querySnapshot = await firebase.firestore().collection(colecao).get();
      querySnapshot.forEach((doc) => {
        const pedido = doc.data();
        const rua = pedido.rua.toLowerCase();
        const cliente = pedido.cliente.toLowerCase();
        const numero = pedido.numero.toString();
  
        if (
          rua.includes(pesquisa.toLowerCase()) ||
          numero.includes(pesquisa.toLowerCase()) ||
          cliente.includes(pesquisa.toLowerCase())
        ) {
          resultados.push({ id: doc.id, ...pedido });
        }
      });
    }
  
    setResults(resultados);
  };

  const abrirModalEditar = async (docId) => {
  
    try {
      for (const colecao of baseCollectionNames) {
        const pedidoRef = firebase.firestore().collection(colecao).doc(docId);
        const doc = await pedidoRef.get();
  
        if (doc.exists) {
          setSelectedPedido(docId);
          setPedidoData(doc.data());
          setModalVisible(true);
          return; // Interrompe a busca ao encontrar o documento
        }
      }
  
      // Se não encontrar o documento em nenhuma coleção
      console.log(`O documento com ID ${docId} não foi encontrado em nenhuma coleção`);
    } catch (error) {
      console.log("Erro ao obter o documento:", error);
    }
  };
  

  const salvarAlteracoes = async () => {
    try {
      let colecaoEncontrada = null;
  
      // Encontra a coleção correta baseada no selectedPedido
      for (const colecao of baseCollectionNames) {
        const pedidoRef = firebase.firestore().collection(colecao).doc(selectedPedido);
        const doc = await pedidoRef.get();
  
        if (doc.exists) {
          colecaoEncontrada = colecao;
          break;
        }
      }
  
      if (!colecaoEncontrada) {
        console.log(`O documento com ID ${selectedPedido} não foi encontrado em nenhuma coleção`);
        return;
      }
  
      const pedidoRef = firebase.firestore().collection(colecaoEncontrada).doc(selectedPedido);
      await pedidoRef.set(pedidoData);
  
      alert("Dados alterados com sucesso!");
      setModalVisible(false);      
    } catch (error) {
      console.log("Erro ao salvar os dados:", error);
    }
  };
  
  const apagarPedido = async () => {
    try {
      let colecaoEncontrada = null;
  
      // Encontra a coleção correta baseada no selectedPedido
      for (const colecao of baseCollectionNames) {
        const pedidoRef = firebase.firestore().collection(colecao).doc(selectedPedido);
        const doc = await pedidoRef.get();
  
        if (doc.exists) {
          colecaoEncontrada = colecao;
          break;
        }
      }
  
      if (!colecaoEncontrada) {
        console.log(`O documento com ID ${selectedPedido} não foi encontrado em nenhuma coleção`);
        return;
      }
  
      const pedidoRef = firebase.firestore().collection(colecaoEncontrada).doc(selectedPedido);
      await pedidoRef.delete();
  
      alert("Pedido apagado com sucesso!");
      setModalVisible(false);
      confirmarPesquisa();
    } catch (error) {
      console.log("Erro ao apagar o documento:", error);
    }
  };
  
  const limitadorDeTexto = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  };

  const handleChange = (name, value) => {
    setPedidoData({ ...pedidoData, [name]: value });
  };

  const handlePhoneChange = (text) => {
    if (text === '') {
      setPedidoData({ ...pedidoData, telefone: '' });
    } else {
      const formattedText = formatPhoneNumber(text);
      setPedidoData({ ...pedidoData, telefone: formattedText });
    }
  };

  const limparCampos = () => {
    setPedidoData({
      rua: '',
      cliente: '',
      telefone: '',
      bairro: '',
      referencia: '',
      numero: '',
      valor: '',
      taxaEntrega: '',
      total: '',
      observacao: '',
      adicional: '',
      via2: '',
      tipoEntrega: ''
    });
  };

  const handleValueChange = (increment) => {
    let newValue = parseFloat(pedidoData.valor) + increment;
    if (newValue < 0) newValue = 0;
    setPedidoData({ ...pedidoData, valor: newValue.toString() });
  };

  const handleValueChange2v = (increment) => {
    // Verificar e garantir que pedidoData.via2 seja um número válido
    let currentValue = parseFloat(pedidoData.via2);
    if (isNaN(currentValue)) {
        currentValue = 0;
    }

    let newValue = currentValue + increment;
    if (newValue < 0) newValue = 0;

    setPedidoData({ ...pedidoData, via2: newValue.toString() });
};


  useEffect(() => {
    const valor = parseFloat(pedidoData.valor) || 0;
    const taxaEntrega = parseFloat(pedidoData.taxaEntrega) || 0;
    const adicional =  parseFloat(pedidoData.adicional) || 0;
    const total = valor + taxaEntrega + adicional;
    setPedidoData({ ...pedidoData, total: total.toString() });
  }, [pedidoData.valor, pedidoData.taxaEntrega, pedidoData.adicional]);

  const limparTexto = () => {
    setSearchQuery('');
  };

  const handleMarmitaChange1 = (marmita) => {
    if (marmita === 0) {
        setPedidoData({ ...pedidoData, valor: '0' });
        return;
    }

    let currentValue = parseFloat(pedidoData.valor);
    if (isNaN(currentValue)) {
        currentValue = 0;
    }

    let newValue = currentValue + marmita;

    if (marmita === 16 && newValue < 16) newValue = 16;
    else if (marmita === 18 && newValue < 18) newValue = 18;
    else if (marmita === 20 && newValue < 20) newValue = 20;
    else if (marmita === 26 && newValue < 26) newValue = 26;

    setPedidoData({ ...pedidoData, valor: newValue.toString() });
};

const marmitas = [
    { label: '0', value: 0 },
    { label: 'P', value: 16 },
    { label: 'M', value: 18 },
    { label: 'G', value: 20 },
    { label: 'G1', value: 26 },
];

  const handleTaxaChange = (value) => {
    setPedidoData({ ...pedidoData, taxaEntrega: value.toString() });
  };

  const handleAdicional = (value) => {
    setPedidoData({ ...pedidoData, adicional: value.toString() });
  };

  const getNextDocId = async () => {
    const snapshot = await firebase.firestore().collection('pedidos').get();
    return snapshot.size + 1;
  };

  const formatPhoneNumber = (text) => {
    const cleaned = ('' + text).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{0,5})(\d{0,4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}${match[3] ? '-' + match[3] : ''}`;
    }
    return text;
  };

  const formatarMoeda = (valor) => {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    return formatter.format(valor);
};

const baseCollectionNames = ["pedidos", "pedidos1", "pedidos2", "pedidos3"]; // Adicione as coleções aqui

const getCollectionName = async (docId) => {
  let collectionName = null;

  // Procurar uma coleção com menos de 250 documentos
  for (const name of baseCollectionNames) {
    const collectionRef = firebase.firestore().collection(name);
    const snapshot = await collectionRef.get();
    if (snapshot.size < 290) {
      collectionName = name;
      break;
    }
  }

  // Se não encontrar, crie uma nova coleção
  if (!collectionName) {
    const newIndex = baseCollectionNames.length;
    collectionName = `${baseCollectionNames[0]}${newIndex}`;
    baseCollectionNames.push(collectionName);
  }

  return collectionName;
};

const Imprimir_pedidos = async (docId) => {
  try {
    for (const colecao of baseCollectionNames) {
      const pedidoRef = firebase.firestore().collection(colecao).doc(docId);
      const doc = await pedidoRef.get();

      if (doc.exists) {
        const pedido = doc.data();
        const total = (pedido.valor || 0) + (pedido.taxaEntrega || 0) + (pedido.adicional || 0);

        let recibo2v = '';
        let adicional2 = '';

        if (pedido.adicional && pedido.adicional > 1) {
          for (let i = 0; i <= pedido.adicional; i += 100) {
            adicional2 += `+ ${formatarMoeda(pedido.adicional)}`;
          }
        }

        const pedidoData = {
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

        // Salva no Firestore
        await firebase.firestore().collection('Caixa').doc(docId).set(pedidoData);
        console.log('Pedido salvo com sucesso!');

        for (let i = 0; i < (pedido.via2 || 0); i++) {
          recibo2v += `
            <p>
            <div style="font-weight: bold;">=====================</div>
            <p>
            <div style="display: inline;text-align:right;font-weight: bold;">Rua: ${pedido.rua} - Nº${pedido.numero}</div>
            <p>
            <div style="display: inline;font-weight: bold;">Cliente: ${pedido.cliente}</div>
            <p>
            <div style="display: inline;font-weight: bold;">TOTAL: ${formatarMoeda(pedido.total)} / ${pedido.tipoEntrega}</div>
            <div style="font-weight: bold;">=====================</div>
            <p>
          `;
        }

        const htmlToPrint = `
          <style>
            body {
              font-size: 20px;
              font-family: Arial, sans-serif;
              padding: 0;
            }
            .resultado {
              padding: 0;
              border: 0 solid #ccc;
              background-color: #fff;
              max-width: 400px;
            }
            .resultado p {
              margin: 5px 0;
            }
            .resultado p:first-child {
              margin-top: 0;
            }
            .resultado p:last-child {
              margin-bottom: 0;
            }
            .titulo {
              font-size: 30px;
              font-weight: bold;
              text-align: left;
              margin-bottom: 10px;
            }
            .info {
              font-size: 17px;
              margin-bottom: 5px;
            }
          </style>
          <div class="resultado">
            <div class="titulo">Marmitex Conventos</div>
            <strong>===================</strong>
            <p><strong>Tipo:</strong> Delivery </p>
            <strong>===================</strong></p>
            <strong>=======CLIENTE======</strong>
            <div class="info"><strong>Cliente...:</strong> ${pedido.cliente}</div>
            <div class="info"><strong>Telefone:</strong> ${pedido.telefone}</div>
            <strong>======ENDEREÇO======</strong>
            <div class="info"><strong>Rua........:</strong> ${pedido.rua}</div>
            <div class="info"><strong>Num......:</strong> ${pedido.numero}</div>
            <div class="info"><strong>Bairro....:</strong> ${pedido.bairro}</div>
            <div class="info"><strong>Ref........:</strong> ${pedido.referencia}</div>
            <div class="info"><strong>Obs.......:</strong> ${pedido.observacao}</div>
            <div class="info"><strong>Valor.....:</strong> ${formatarMoeda(pedido.valor)} ${adicional2}</div>
            <div class="info"><strong>Taxa......: </strong> ${formatarMoeda(pedido.taxaEntrega)}</div>
            <div class="info"><strong>TOTAL...: </strong> ${formatarMoeda(pedido.total)}</div>
            <div class="info"><strong>Status...:</strong> ${pedido.tipoEntrega}</div>
            <div></div>
            <strong>=====================</strong>
            ${recibo2v}
          </div>
        `;

        await Print.printAsync({
          html: htmlToPrint
        });

        // Se o documento foi encontrado e impresso, interrompe a busca nas outras coleções
        return;
      }
    }

    // Se não encontrar o documento em nenhuma coleção
    console.log(`O pedido com ID ${docId} não foi encontrado em nenhuma coleção`);
  } catch (error) {
    console.log("Erro ao obter o documento:", error);
  }
};



  return (
    
      <View style={styles.container}>      
       <StatusBar style="light" translucent={true} backgroundColor="transparent" />  
      <TouchableOpacity style={{
        alignSelf: 'flex-start',
        backgroundColor: 'orange', 
        width: '100%',     
        height: 40, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: 40,
        borderTopStartRadius: 50,
        borderTopEndRadius: 50}} 
        onPress={confirmarPesquisa}>
        <Text style={{
          color:'white',
          fontWeight:'bold',
          fontSize:20}} >Pesquisar</Text>
      </TouchableOpacity>
      <View style={styles.container2}>

      <TextInput
        style={styles.input}
        placeholder="Buscar por nome da Rua, Nome e Número..."
        placeholderTextColor={'white'}
        value={searchQuery}
        onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={[styles.input2,{backgroundColor:'red'}]} onPress={() => limparTexto()}>
              <Text style={[styles.controlButtonText,{alignContent:'auto',fontSize: 30, fontWeight:'bold'}]}>X</Text>
          </TouchableOpacity>
      </View>
          <FlatList
            style={{ flex: 1, width: 'auto' }}
            data={results}
            keyExtractor={(item) => item.id}            
            renderItem={({ item }) => (
              <View style={[styles.card, { marginTop: 20, width: 'auto' , height: 'auto' }]}>
                <View>
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
                        <Text>{limitadorDeTexto(item.numero, 28)}</Text>
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
                    <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
                        <TouchableOpacity style={[styles.btncards, { backgroundColor: 'orange' }]} onPress={() => abrirModalEditar(item.id)}>
                            <Text style={styles.txtcardsbtn}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btncards, { backgroundColor: 'green' }]} onPress={() => Imprimir_pedidos(item.id)}>
                            <Text style={styles.txtcardsbtn}>Imprimir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            )}
        />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
        <View style={styles.modalContainer1}>
          <TextInput     
            style={[styles.input1,{color:'black'}]}       
            value={pedidoData.cliente}
            placeholder='Nome do Cliente'
            onChangeText={(text) => handleChange('cliente', text)}
          />
          </View>
          <View style={styles.modalContent} >
            <ScrollView contentContainerStyle={{ paddingBottom: 0 }}>
              <Text>Observação</Text>
              <TextInput
                style={[styles.input,{color:'black'}]}
                placeholder="Observação"
                value={pedidoData.observacao}
                onChangeText={(text) => handleChange('observacao', text)}
              />              
              <Text>Referência</Text>
              <TextInput
                style={[styles.input,{color:'black'} ]}
                placeholder="Referência"
                value={pedidoData.referencia}
                onChangeText={(text) => handleChange('referencia', text)}
              />
              <Text>Total</Text>
              <TextInput
                style={[styles.input,{color:'black'}]}
                placeholder="Total"
                keyboardType="numeric"
                value={pedidoData.total}
                onChangeText={(text) => handleChange('total', text)}         
              />
              <Text>Valor</Text>
              <View style={styles.valorContainer}>
                  {marmitas.map((marmita) => (
                <TouchableOpacity key={marmita.label} style={styles.valorButton} onPress={() => handleMarmitaChange1(marmita.value)}>
                  <Text style={styles.valorText}>{marmita.label}</Text>
                </TouchableOpacity>
              ))}
                <View style={styles.valueControl}>
                  <TouchableOpacity style={[styles.controlButton,{backgroundColor:'red'}]} onPress={() => handleValueChange(-4)}>
                    <Text style={[styles.controlButtonText,{fontWeight:'bold'}]}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.valorText}>{pedidoData.valor}</Text>
                  <TouchableOpacity style={[styles.controlButton,{backgroundColor:'green'}]} onPress={() => handleValueChange(1)}>
                    <Text style={[styles.controlButtonText,{fontWeight:'bold'}]}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text>Segunda Via</Text>
              <View style={{flexDirection: 'row',width: '85%',color:'black'}}>
              <TouchableOpacity style={[styles.controlButton,{height: 35, width: 30,backgroundColor:'red',}]} onPress={() => handleValueChange2v(-1)}>
                    <Text style={[styles.controlButtonText,{fontWeight:'bold'}]}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={[styles.input,{flexDirection: 'row',width: '80%',color:'black'}]}
                placeholder="Via"
                value={pedidoData.via2}
                keyboardType="numeric"
                onChangeText={(text) => handleChange('via2', text)}
              />
              <TouchableOpacity style={[styles.controlButton,{height: 35, width: 30, backgroundColor:'green'}]} onPress={() => handleValueChange2v(1)}>
                    <Text style={[styles.controlButtonText,{fontWeight:'bold'}]}>+</Text>
              </TouchableOpacity>
              </View>
              <Text>Status</Text>
              <View style={[styles.tipoEntregaContainer,{marginBottom:15,marginTop:15}]}>
                <TouchableOpacity
                  style={[styles.tipoEntregaButton, pedidoData.tipoEntrega === 'Não Pago' && styles.tipoEntregaButtonSelected]}
                  onPress={() => handleChange('tipoEntrega', 'Não Pago')}
                >
                  <Text style={styles.tipoEntregaText}>Não Pago</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tipoEntregaButton, pedidoData.tipoEntrega === 'Pago' && styles.tipoEntregaButtonSelected]}
                  onPress={() => handleChange('tipoEntrega', 'Pago')}
                >
                  <Text style={styles.tipoEntregaText}>Pago</Text>
                </TouchableOpacity>
              </View>
              <Text>Adicional</Text>
              <TextInput
                style={[styles.input,{color:'black'}]}
                placeholder="Adicional"
                value={pedidoData.adicional}
                keyboardType="numeric"
                onChangeText={(text) => handleChange('adicional', text)}
              />
              <Text>Rua</Text>
              <TextInput
                style={[styles.input,{color:'black'}]}
                placeholder="Rua"
                value={pedidoData.rua}
                onChangeText={(text) => handleChange('rua', text)}
              />
              <Text>Número</Text>
              <TextInput
                style={[styles.input,{color:'black'}]}
                placeholder="Número"
                value={pedidoData.numero}
                keyboardType="numeric"
                onChangeText={(text) => handleChange('numero', text)}
              />
              <Text>Bairro</Text>
              <TextInput
                style={[styles.input,{color:'black'}]}
                placeholder="Bairro"
                value={pedidoData.bairro}
                onChangeText={(text) => handleChange('bairro', text)}
              />
              <Text>Taxa de Entrega</Text>
              <TextInput
                style={[styles.input,{color:'black'}]}
                placeholder="Taxa de Entrega"
                onChangeText={(text) => handleTaxaChange(text)}
                value={pedidoData.taxaEntrega}
                keyboardType="numeric"
              />
              <Text>Telefone</Text>
              <TextInput
                style={[styles.input,{color:'black'}]}
                placeholder="Telefone"
                maxLength={15}
                value={pedidoData.telefone}
                keyboardType="numeric"
                onChangeText={handlePhoneChange}
              />
            </ScrollView>
            <View style={styles.modalButtons}>
              <View style={{marginTop:0,flexDirection: 'row',justifyContent:'space-between',width:'100%'}}>
                <TouchableOpacity 
                    style={[styles.btncards, { backgroundColor: 'red' }]}  
                    onPress={() => {
                      Alert.alert(
                        "Confirmar",
                        `Tem certeza que deseja apagar o pedido do cliente ${pedidoData.cliente}?`,
                        [
                          {
                            text: "Não",
                            style: "cancel"
                          },
                          { 
                            text: "Sim", 
                            onPress: () => apagarPedido() 
                          }
                        ]
                      );
                    }}
                  >
                    <Text style={styles.txtcardsbtn}>Apagar</Text> 
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.btncards,{backgroundColor:'green'}]} onPress={salvarAlteracoes} >
                    <Text style={styles.txtcardsbtn}>Salvar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.btncards,{backgroundColor:'orange'}]} onPress={() => setModalVisible(false)}>
                    <Text style={styles.txtcardsbtn}>Cancelar</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'black',
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
    // padding: 16,
  },

  container2: {
    backgroundColor:'black',
    flexDirection: 'row',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input1: {
    color:'white',
    paddingLeft:10,
    height: 40,
    fontSize: 27,
    fontStyle: 'italic',
    paddingEnd: 10,
    width: '95%',
    borderRadius:10,
    textAlign: 'center'
  },
  input: {
    color:'white',
    paddingLeft:10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    width: '90%',
    borderRadius:10
  },

  input2: {
    color:'white',
    paddingLeft:10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    width: '10%',
    borderRadius:10
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    borderLeftWidth:3,
    borderTopWidth:3,
    borderColor:'orange',
    width:'100%',
    alignItems:'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',    
    backgroundColor: 'rgba(0, 0, 0, 0.5)',   
  },
  modalContainer1: {
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',    
    backgroundColor: 'white',    
    width: 'auto',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'orange',
    alignSelf: 'center',    
  },
  modalContent: {
    borderWidth: 2,
    borderColor: 'orange', 
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
    width:70,
    height:30,
    borderRadius:15, 
    backgroundColor:'skyblue',
    justifyContent:'center',
    alignItems:'center'
  },

  txtcardsbtn: {
    fontWeight:'bold'
  },

  tipoEntregaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16
  },

  tipoEntregaButton: {
    width:90,
    height:30,
    borderRadius:15, 
    // backgroundColor:'skyblue',
    justifyContent:'center',
    alignItems:'center',
    borderWidth: 1,
    borderColor: 'orange'
  },
  tipoEntregaButtonSelected: {
    backgroundColor: 'orange',
    borderWidth: 2,
    borderColor: 'red',
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
    color: 'white'
  },

  controlButtonText3: {
    color: 'black',
    fontSize: '20',
  },
  taxaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16
  }
});

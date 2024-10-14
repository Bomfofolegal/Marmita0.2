import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { firebase } from '../../firebaseConfig';


export default function OrderScreen() {
  const [order, setOrder] = useState({
    rua: '',
    cliente: '',
    telefone: '',
    bairro: '',
    referencia: '',
    numero: '',
    valor: '',
    taxaEntrega: '0',
    total: '',
    adicional: '',
    observacao: '',
    via2: '',
    tipoEntrega: 'Não Pago'
  });

  const [caixaDate, setCaixaDate] = useState({
    rua: '',
    cliente: '',
    numero: '',
    valor: '',
    observacao: '',
    taxaEntrega: '',
    adicional: '',
    total: '',
    tipoEntrega: ''
  });

  const handleChange = (name, value) => {
    setOrder({ ...order, [name]: value });
  };

  const baseCollectionNames = ["pedidos", "pedidos1", "pedidos2", "pedidos3"];

  const getNextDocId = async () => {
    let maxDocId = 0;

    // Objeto para armazenar os máximos IDs encontrados em cada coleção
    let maxDocIds = {};

    // Loop para encontrar o máximo ID em cada coleção
    for (const collectionName of baseCollectionNames) {
        const collectionRef = firebase.firestore().collection(collectionName);
        const snapshot = await collectionRef.orderBy('doc', 'desc').limit(1).get();

        if (!snapshot.empty) {
            const lastDoc = snapshot.docs[0];
            const lastDocData = lastDoc.data();
            const lastDocId = lastDocData.doc || 0;
            maxDocIds[collectionName] = lastDocId;
        } else {
            maxDocIds[collectionName] = 0;
        }

        if (maxDocIds[collectionName] > maxDocId) {
            maxDocId = maxDocIds[collectionName];
        }
    }

    // Verificar lacunas nos IDs de documentos
    let docId = maxDocId + 1;

    return docId;
};

const getCollectionName = async (docId) => {
    let collectionName = null;

    // Procurar uma coleção com menos de 10 documentos
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

  
  const armazenarValores = async () => {
      const { rua, cliente, telefone, bairro, referencia, numero, via2, observacao, valor, taxaEntrega, total, tipoEntrega, adicional } = order;
  
      const parsedValor = parseFloat(valor);
      const parsedTaxaEntrega = parseFloat(taxaEntrega);
      const parsedTotal = parseFloat(total);
      const parsedAdicional = parseFloat(adicional);

      try {
          const docId = await getNextDocId();
          const collectionName = await getCollectionName(docId);

          await firebase.firestore().collection(collectionName).doc(docId.toString()).set({
              doc: docId,
              rua,
              cliente,
              bairro,
              referencia,
              numero,
              observacao,
              via2,
              valor: parsedValor || 0,
              taxaEntrega: parsedTaxaEntrega || 0,
              total: parsedTotal || 0 ,
              adicional: parsedAdicional || 0,
              tipoEntrega,
              telefone,
          });
  
          Alert.alert("Sucesso", "Dados armazenados com sucesso!");
          limparCampos();
      } catch (error) {
          console.error("Erro ao armazenar os dados: ", error);
          Alert.alert("Erro", "Erro ao armazenar os dados");
      }
  };

    const limparCampos = () => {
      setOrder({
        rua: '',
        cliente: '',
        telefone: '',
        bairro: '',
        referencia: '',
        numero: '',
        valor: '',
        taxaEntrega: '0',
        total: '',
        observacao: '',
        adicional: '',
        via2: '',
        tipoEntrega: 'Não Pago'
      });
    };

    const handleValueChange = (increment) => {
      let newValue = parseFloat(order.valor) + increment;
      if (newValue < 0) newValue = 0;
      setOrder({ ...order, valor: newValue.toString() });
    };

    const handleTaxaChange = (value) => {
      setOrder({ ...order, taxaEntrega: value.toString() });
    };

    const formatPhoneNumber = (text) => {
      const cleaned = ('' + text).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{2})(\d{0,5})(\d{0,4})$/);
      if (match) {
        return `(${match[1]}) ${match[2]}${match[3] ? '-' + match[3] : ''}`;
      }
      return text;
    };

    const handlePhoneChange = (text) => {
      // Verifica se o texto está vazio
      if (text === '') {
        // Se estiver vazio, atualize o estado para o texto vazio
        setOrder({ ...order, telefone: '' });
      } else {
        // Caso contrário, formate o texto
        const formattedText = formatPhoneNumber(text);
        setOrder({ ...order, telefone: formattedText });
      }
    };  

    useEffect(() => {
      const valor = parseFloat(order.valor) || 0;
      const taxaEntrega = parseFloat(order.taxaEntrega) || 0;
      const adicional = parseFloat(order.adicional) || 0;
      const numero = order.numero || 0;
      const total = valor + taxaEntrega + adicional;
      setOrder({ ...order, total: total.toString() });
    }, [order.valor,order.numero , order.taxaEntrega, order.adicional]);

    const handleMarmitaChange = (marmita1) => {
      let newValue;
      if (order.valor !== '') {
        newValue = parseFloat(order.valor) + marmita1;
      } else {
        newValue = marmita1;
      }
    
      if (marmita1 === 16 && newValue < 16) newValue = 16;
      else if (marmita1 === 18 && newValue < 18) newValue = 18;
      else if (marmita1 === 20 && newValue < 20) newValue = 20;
      else if (marmita1 === 26 && newValue < 26) newValue = 26;
    
      setOrder({ ...order, valor: newValue.toString() });
    };  

    const marmitas = [
      { label: 'P', value: 16 },
      { label: 'M', value: 18 },
      { label: 'G', value: 20 },
      { label: 'G1', value: 26 },
    ];

    return (
      <View style={styles.container}>
        <StatusBar style="light" translucent={true} backgroundColor="transparent" />
        <TouchableOpacity style={{    
                flexWrap: 'nowrap',
                alignSelf: 'flex-start',
                backgroundColor: 'orange', 
                width: '100%',     
                height: 40, 
                justifyContent: 'center', 
                alignItems: 'center', 
                marginBottom: 40,
                borderTopStartRadius: 50,
                borderTopEndRadius: 50 }} onPress={armazenarValores}>
          <Text style={[styles.Texto, { fontSize: 20, color: 'white', fontWeight: 'bold' }]}>Salvar Cliente</Text>
        </TouchableOpacity>
        <ScrollView style={{ width: '90%' }} contentContainerStyle={{ paddingBottom: 400 }}>
          <Text style={[styles.Texto, { marginTop: 30 }]}>Rua</Text>
          <TextInput placeholder="Rua" value={order.rua} onChangeText={(text) => handleChange('rua', text)} style={styles.input} />
          <Text style={styles.Texto}>Cliente</Text>
          <TextInput placeholder="Cliente" value={order.cliente} onChangeText={(text) => handleChange('cliente', text)} style={styles.input} />     
          <Text style={styles.Texto}>Número</Text>
          <TextInput placeholder="Número" value={order.numero} onChangeText={(text) => handleChange('numero', text)} style={styles.input} keyboardType="numeric"/>
          <Text style={styles.Texto}>Segunda Via</Text>
          <TextInput placeholder="Via" value={order.via2} onChangeText={(text) => handleChange('via2', text)} style={styles.input} keyboardType="numeric"/>
          <Text style={styles.Texto}>Observação</Text>
          <TextInput placeholder="Observação" value={order.observacao} onChangeText={(text) => handleChange('observacao', text)} style={styles.input} />
          <Text style={styles.Texto}>Referência</Text>
          <TextInput placeholder="Referência" value={order.referencia} onChangeText={(text) => handleChange('referencia', text)} style={styles.input} />        
          <Text style={styles.Texto}>Bairro</Text>
          <TextInput placeholder="Bairro" value={order.bairro} onChangeText={(text) => handleChange('bairro', text)} style={styles.input} />
          <Text style={styles.Texto}>Valor</Text>        
          <View style={styles.valorContainer}>
            {marmitas.map((marmitas) => (
              <TouchableOpacity key={marmitas.label} style={styles.valorButton} onPress={() => handleMarmitaChange(marmitas.value)}>
                <Text style={styles.valorText}>{marmitas.label}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.valueControl}>
              <TouchableOpacity style={[styles.controlButton,{backgroundColor:'red'}]} onPress={() => handleValueChange(-5)}>
                <Text style={[styles.controlButtonText,{fontWeight:'bold'}]}>-</Text>
              </TouchableOpacity>
              <Text style={styles.valorText}>{order.valor}</Text>
              <TouchableOpacity style={[styles.controlButton,{backgroundColor:'green'}]} onPress={() => handleValueChange(1)}>
                <Text style={[styles.controlButtonText,{fontWeight:'bold'}]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.Texto}>Taxa de Entrega</Text>
          <View style={styles.taxaContainer}>
            {[0, 3, 5, 7, 9, 12].map((value) => (
              <TouchableOpacity key={value} style={styles.valorButton} onPress={() => handleTaxaChange(value)}>
                <Text style={styles.valorText}>{value}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={[styles.Texto,{fontSize:20}]}>Total</Text>
          <TextInput
          style={[styles.input,{fontSize:20,fontWeight:'bold'}]} 
           placeholder="Total" 
           value={order.total}          
           editable={true}
           />
           <Text style={styles.Texto}>Telefone</Text>
           <TextInput placeholder="Telefone" maxLength={15} value={order.telefone} onChangeText={handlePhoneChange} style={styles.input} keyboardType="numeric" />
        </ScrollView>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      flex: 1,
      alignItems: 'center'
    },
    input: {
      color: 'white',
      paddingLeft: 10,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      width: '100%',
      borderRadius: 10
    },
    Texto: {
      color: 'white',
      marginBottom: 5
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
      color: 'white'
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
    taxaContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 16
    }
  });


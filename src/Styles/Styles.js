import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const Azulfraco = '#0291de';
const Azulagua = '#2d9cf7';
const Cinzaclaro = '#e3e3e3';
const CinzaPoucoescuro = '#b8b6b6';
const Verdenormal = '#5ce675';
const verdemuitofraco = '#61cf7e'
const verdeninvus = "#01CC60"

export const styles_Tela_inical =StyleSheet.create({
    View: {
        flex: 1,
        backgroundColor: '#181818',
      },
      BotaoTouch: {
        alignItems: 'center',
        backgroundColor: 'skyblue',
        padding: 20,
      },
      TextoBotao: {
        fontSize: 20,
      },
      Viewbarra: {
        justifyContent: 'center',
        backgroundColor: '#181818',
        width: '100%',
        height: 150,
      },
      Textbarra: {
        fontSize: 30,
        textAlign: 'center',
        position: 'relative',
        top: 20,
        fontWeight:'bold',
        color:'white'
      },
      ViewAdicionarCliente: {
        backgroundColor: '#9e9e9e',
        width: '100%',
        height: 55,
        justifyContent: 'space-between',
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:2,
        borderTopWidth:2,
        borderColor:'white',
      },
      btnListacompleta:{
        backgroundColor:'#10c740',
        borderRadius: 10,
        padding:10, 
        justifyContent:'center',
        alignItems:'center',
        marginLeft:15
      },
      btnfiltrarpordata:{
        backgroundColor:'#3da8ff',
        borderRadius: 10,
        padding:10, 
        justifyContent:'center',
        alignItems:'center',
        marginLeft:15
      },
      btnadicionarcliente:{
        backgroundColor:'#3da8ff',
        borderRadius: 10,
        padding:10, 
        justifyContent:'center',
        alignItems:'center',
        
        marginLeft:40
      },
      btnAbrirModal:{
        marginRight:20
      },
    
      TextAdicionarCliente: {
        fontSize: 15,
        textAlign: 'left',
        color: 'black',
        fontWeight:'bold'
      },
      clientesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'center', // Adicionado para centralizar os itens horizontalmente
        marginTop:20,
        marginBottom:20,
        marginRight:20
      },
      clienteContainer: {
        flexDirection: 'column',
        marginBottom: 20,
        marginRight: 20,
      },
      closeButton: {
        alignSelf: 'flex-end',
      },
      btnLogoff:{
        backgroundColor:'#181818',
        width:130,
        height:40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        marginTop:15
      },
      btnTextlogoff:{
        color:'red',
        fontWeight:'500',
        fontSize:15,
        marginLeft:10
      },
      btnFiado:{
        backgroundColor:'#181818',
        width:130,
        height:40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        marginTop:40
      },
      btnTextFiado:{
        color:'skyblue',
        fontWeight:'500',
        fontSize:15,
        marginLeft: 10
      },

      btnPago:{
        backgroundColor:'#181818',
        width:130,
        height:40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        marginTop:20
      },
      btnTextPago:{
        color:'skyblue',
        fontWeight:'500',
        fontSize:15,
        marginLeft: 10
      },
      /////////////MODAL///////////////
      btnCadastro: {
        marginTop: 30,
        width: '30%',
        height: 40,
        backgroundColor: 'darkorange',
        borderRadius: 20,
        justifyContent: 'center',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        flexDirection:'row',
     
      },
      modalContent: {
        backgroundColor:'white',
        width: '50%',
        height: '100%',
        alignItems: 'center',
        flexDirection:'column',
      },
      modalText: {
        color:'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop:20
      },
      fecharmodal: {
        backgroundColor:'rgba(0, 0, 0, 0.5)',
        width:'50%',
        height:'100%'
      },
      closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    
      },
      textInput2: {
        width: '60%',
        height: 40,
        backgroundColor: '#181818',
        borderRadius: 20,
        paddingLeft: 10,
        marginBottom: 20,
        color: 'white',
      },
      InputDate:{
        width:105,
        height: 40,
        backgroundColor: 'white',
        borderTopRightRadius:20,
        color: '#181818',
        borderTopColor:'green',
        fontWeight:'bold',
        justifyContent:'center',
        alignItems:'center'
        
      },
      CardContainer:{
        flexDirection: 'column',
         alignItems: 'center', 
        backgroundColor:'white', 
        borderRadius:8,
        marginLeft:20,
        borderBottomWidth:3,
        borderRightWidth:3,
        borderColor:'darkorange',
        marginBottom:20
      },
      CardPadding:{
        padding:10,
      },
      textoNomeCard:{
        fontSize:14,
        fontWeight:'bold',
        marginBottom:4,
        width:'100%',
        textAlign:'center'
      },
      textCampoCard:{
        fontSize:14,
        fontWeight:'bold',
        marginBottom:1,
      },
      textValorCampoCard:{
        fontSize:12,
        fontWeight:'normal',
        marginBottom:4,
        width:200
      },
      textValorCampoCardStatus:{
        fontSize:12,
        fontWeight:'normal',
        marginBottom:4,
        width:130,
        color:'white',
        backgroundColor:'orange',
        padding:4,
        textAlign:'center',
        borderRadius:10
      },
      botaomovi:{
        fontSize:12,
        fontWeight:'bold',
        color:'white'
      },
      textInputADD: {
        width: '70%',
        height: 40,
        backgroundColor: '#181818',
        borderRadius: 20,
        paddingLeft: 10,
        marginTop:15,
        marginBottom:15,
        color: 'white'
      },
      textInputFiltranome: {
        width: '70%',
        height: 40,
        backgroundColor: '#181818',
        borderRadius: 20,
        paddingLeft: 10,
        marginTop:15,
        marginBottom:15,
        color: 'white',
        borderTopRightRadius:0,
        borderBottomRightRadius:0
      },
      pesquisalupa:{
        backgroundColor:'gray',
        height:40,
        width:50,
        justifyContent:'center',
        alignItems:'center',
        borderTopRightRadius:20,
        borderBottomRightRadius:20
      }
})

export const Styles_ScreenBebidas =StyleSheet.create({

    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#181818'
        
      },
      ViewTotal:{
        backgroundColor: verdemuitofraco,
        flexDirection:'row',
        width:'90%',
        height:55,
        alignItems:'center',
        justifyContent:'flex-start',
        // borderRadius:20,
        marginBottom:90,
        borderColor:'gray',
        borderWidth:2,
        borderRadius:5
        
      },
      ViewItens:{
        backgroundColor:Azulfraco,
        flexDirection:'row',
        width:'95%',
        height:55,
        alignItems:'center',
        justifyContent:'flex-start',
        borderRadius:20,
        marginTop:50
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'white',
        marginLeft:25,
        marginRight:50
      },
      title2: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'white',
        marginLeft:20,
        marginRight:20
      },
      btnstyles:{
        marginRight:20,
        backgroundColor:Azulagua,
        width:45,
        height:45,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center'
      },
      addButton: {
        backgroundColor: Azulfraco,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
      },
      removeButton: {
        backgroundColor: 'red',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
      },
      buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize:17,
        marginLeft:15
      },
      touchback:{
        alignItems:'flex-start',
        justifyContent:'center',
        backgroundColor: Cinzaclaro,
        width:'80%',
        height:40,
        borderRadius:20,
        marginRight:20,
        marginLeft:15
      },
      btnstyles2:{
        backgroundColor:'white',
        width:30,
        height:30,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center'
      },
      itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '70%',
        marginBottom: 10,
      },
      selectButton: {
        backgroundColor: Azulagua,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
      },
      totalText: {
        fontSize: 18,
        fontWeight: '900',
        color:'black',
        marginLeft:50,
        marginRight:50
      },
      modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      modifyNameInput: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        flex: 1,
        marginRight: 10,
      },
      modifyNameButton: {
        backgroundColor: Azulagua,
        paddingHorizontal: 20,
        paddingVertical: 10,
      },
      closeButton: {
        backgroundColor: 'gray',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 10,
      },
      /////////////////////↓MODAL↓//////////////////////////
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      modalView: {
        width: '80%',
        height: '70%',
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 5,
      },
      flatListContent: {
        marginLeft:30
      },
      modalItemContainer: {
        flexDirection: 'row',
        alignItems:'flex-start',
        justifyContent:'space-between',
        width:'90%',
        marginBottom:10,
        
    
      },
      fecharButton: {
        width: '80%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 9,
        marginBottom: 7,
        marginTop: -9,
      },
      btnadicionar_item:{
        backgroundColor:'green',
        width:150,
        height:25,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30,
        marginBottom:20
      },
      modalView_2: {
        width: '60%',
        height: '40%',
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent:'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 5,
      },
      textInput_itemnome: {
        width: '90%',
        height: 40,
        backgroundColor: '#181818',
        borderRadius: 20,
        paddingLeft: 10,
        marginBottom:10,
        color: 'white',
      },
      btnsalvaritem:{
        backgroundColor:'green',
        width:110,
        height:35,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30,
        marginTop:50
      },
      
})


export const Styles_Informação_A_B = StyleSheet.create({
    View:{
        backgroundColor:"white", 
        width:150,
        height:200,
        alignContent:'center',
        borderRadius:10,
        borderColor:"#f77102",
        borderWidth:4
    },
    Barra_item_UN:{
        backgroundColor:`${Azulfraco}`,
        width:142,
        height:30,
        alignContent:'center',
        position:'absolute', 
        left:0, 
        top:0,
        borderRadius:4
    },
    Text_Barra:{
        color:'white',
        fontWeight:'bold',
        position:'absolute',
        left:10,top:5
    },
    Text_Barra_2:{
        color:'white',
        fontWeight:'bold',
        position:'absolute',
        left:105,
        top:5
    },
    Btn_color_bebidas:{
        backgroundColor:`${Azulagua}`,
         width:74,
         height:30,
         alignContent:'center', 
         position:'absolute', 
         left:10, 
         top:40,
         borderRadius:4,
         justifyContent:'center'
    },
    Btn_color_comidas:{
        backgroundColor:"orange",
        width:74,
        height:30,
        alignContent:'center', 
        position:'absolute', 
        left:10, 
        top:80,
        borderRadius:4,
        justifyContent:'center'
    },
    Quantidade:{
        backgroundColor:"black", 
        width:30,
        height:30,
        alignContent:'center', 
        position:'absolute', 
        left:100, 
        top:40,
        borderRadius:4,
        justifyContent:'center'
    },
    Quantidade_2:{
        backgroundColor:"black", 
        width:30,
        height:30,
        alignContent:'center', 
        position:'absolute', 
        left:100, 
        top:80,
        borderRadius:4,
        justifyContent:'center'
    },
    total:{
        backgroundColor:"lightgreen", 
        width:122,
        height:30,
        alignContent:'center', 
        position:'absolute', 
        left:10, 
        top:120,
        borderRadius:4,
        justifyContent:'center'
    },
    Valor_informado:{
        backgroundColor:"green", 
        width:122,
        height:30,
        alignContent:'center', 
        position:'absolute', 
        left:10, 
        top:155,
        borderRadius:4,
        justifyContent:'center'
    }

})


export const styles_ScreenLogin = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '60%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 20,
  },
  btnCadastro: {
    width: '60%',
    height: 40,
    backgroundColor: 'darkorange',
    borderRadius: 20,
    justifyContent: 'center',
    marginBottom:10
  },
  btnCadastro2:{
    width: '70%',
    height: 40,
    backgroundColor: 'darkorange',
    borderRadius: 20,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '60%',
    height: 320,
    borderRadius:40,
    alignItems: 'center',
    justifyContent:'center',
    marginBottom:100
  },
  modalText: {
    color:'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  closeButton: {
    marginRight:270,
    marginBottom:10
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',

  },
  textInput2: {
    width: '100%',
    height: 40,
    backgroundColor: '#181818',
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom:10,
    color: 'white',
  },
  modalContainer_2:{
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
  }
});

export const styles_ScreenComida = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#181818'
    
  },
  ViewTotal:{
    backgroundColor: verdemuitofraco,
    flexDirection:'row',
    width:'90%',
    height:55,
    alignItems:'center',
    justifyContent:'flex-start',
    // borderRadius:20,
    marginBottom:90,
    borderColor:'gray',
    borderWidth:2,
    borderRadius:5
    
  },
  ViewItens:{
    backgroundColor:'orange',
    flexDirection:'row',
    width:'95%',
    height:55,
    alignItems:'center',
    justifyContent:'flex-start',
    borderRadius:20,
    marginTop:50
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'#181818',
    marginLeft:25,
    marginRight:50
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'#181818',
    marginLeft:20,
    marginRight:20
  },
  btnestilo:{
    marginRight:20,
    backgroundColor:'darkorange',
    width:45,
    height:45,
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center'
  },
  addButton: {
    backgroundColor: Azulfraco,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize:17,
    marginLeft:15
  },
  touchback:{
    alignItems:'flex-start',
    justifyContent:'center',
    backgroundColor: Cinzaclaro,
    width:'80%',
    height:40,
    borderRadius:20,
    marginRight:20,
    marginLeft:15
  },
  btnestilo2:{
    backgroundColor:'white',
    width:30,
    height:30,
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center'
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    marginBottom: 10,
  },
  selectButton: {
    backgroundColor: Azulagua,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '900',
    color:'black',
    marginLeft:50,
    marginRight:50
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modifyNameInput: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  modifyNameButton: {
    backgroundColor: Azulagua,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  closeButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  /////////////////////↓MODAL↓//////////////////////////
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 5,
  },
  flatListContent: {
    marginLeft:30
  },
  modalItemContainer: {
    flexDirection: 'row',
    alignItems:'flex-start',
    justifyContent:'space-between',
    width:'90%',
    marginBottom:10,
  },
  fecharButton: {
    width: '80%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 9,
    marginBottom: 7,
    marginTop: -9,
  },
});


export const style_Tela_usuario = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    paddingTop: Constants.statusBarHeight,
  },
  topbarperfil: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    height: 60,
  },
  topbarperfil2: {
    marginLeft:190
  },
  textperfil: {
    color: 'white',
    fontSize: 16,
    marginLeft: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  fecharmodal: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#242424',
    height: 200,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  modalText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
  btnLogoff: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor:'white',
    justifyContent:'center',
    width:'40%',
    height:40,
    borderRadius:20

  },
  btnTextlogoff: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  viewcontainer: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  btnbebidas: {
    backgroundColor: Azulagua,
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 10,

  },
  textbtnbebidas: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  btncomidas: {
    backgroundColor: 'orange',
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 10,
    marginTop:10
  },
  textbtncomidas: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  btnTotal: {
    backgroundColor: 'gray',
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 10,
    marginTop:10,
    
  },
  textbtnTotal: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  itemNome: {
    color: 'white',
    fontSize: 14,
  },
  itemPreco: {
    color: 'white',
    fontSize: 16,
    textAlign:'center'
  },
  itemQuantidade: {
    color: 'white',
    fontSize: 16,
    textAlign:'right'
  },
});



export const styles_ScreenPago =StyleSheet.create({
  View: {
      flex: 1,
      backgroundColor: '#181818',
    },
    BotaoTouch: {
      alignItems: 'center',
      backgroundColor: 'skyblue',
      padding: 20,
    },
    TextoBotao: {
      fontSize: 20,
    },
    Viewbarra: {
      justifyContent: 'center',
      backgroundColor: '#181818',
      width: '100%',
      height: 10,
    },
    Textbarra: {
      fontSize: 30,
      textAlign: 'center',
      position: 'relative',
      top: 20,
      fontWeight:'bold',
      color:'white'
    },
    ViewAdicionarCliente: {
      backgroundColor: '#9e9e9e',
      width: '100%',
      height: 55,
      justifyContent: 'space-between',
      flexDirection:'row',
      alignItems:'center',
      borderBottomWidth:2,
      borderTopWidth:2,
      borderColor:'white',
    },
    btnListacompleta:{
      backgroundColor:'#10c740',
      borderRadius: 10,
      padding:10, 
      justifyContent:'center',
      alignItems:'center',
      marginLeft:15
    },
    btnfiltrarpordata:{
      backgroundColor:'#3da8ff',
      borderRadius: 10,
      padding:10, 
      justifyContent:'center',
      alignItems:'center',
      marginLeft:15
    },
    btnadicionarcliente:{
      backgroundColor:'#3da8ff',
      borderRadius: 10,
      padding:10, 
      justifyContent:'center',
      alignItems:'center',
      
      marginLeft:40
    },
    btnAbrirModal:{
      marginRight:20
    },
  
    TextAdicionarCliente: {
      fontSize: 15,
      textAlign: 'left',
      color: 'black',
      fontWeight:'bold'
    },
    clientesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent:'center', // Adicionado para centralizar os itens horizontalmente
      marginTop:20,
      marginBottom:20,
      marginRight:20
    },
    clienteContainer: {
      flexDirection: 'column',
      marginBottom: 20,
      marginRight: 20,
    },
    closeButton: {
      alignSelf: 'flex-end',
    },
    btnLogoff:{
      backgroundColor:'#181818',
      width:130,
      height:40,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      borderRadius:20,
      marginTop:15
    },
    btnTextlogoff:{
      color:'red',
      fontWeight:'500',
      fontSize:15,
      marginLeft:10
    },
    btnFiado:{
      backgroundColor:'#181818',
      width:130,
      height:40,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      borderRadius:20,
      marginTop:40
    },
    btnTextFiado:{
      color:'skyblue',
      fontWeight:'500',
      fontSize:15,
      marginLeft: 10
    },

    btnPago:{
      backgroundColor:'#181818',
      width:130,
      height:40,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      borderRadius:20,
      marginTop:20
    },
    btnTextPago:{
      color:'skyblue',
      fontWeight:'500',
      fontSize:15,
      marginLeft: 10
    },
    /////////////MODAL///////////////
    btnCadastro: {
      marginTop: 30,
      width: '30%',
      height: 40,
      backgroundColor: 'darkorange',
      borderRadius: 20,
      justifyContent: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      flexDirection:'row',
   
    },
    modalContent: {
      backgroundColor:'white',
      width: '50%',
      height: '100%',
      alignItems: 'center',
      flexDirection:'column',
    },
    modalText: {
      color:'black',
      fontSize: 18,
      fontWeight: 'bold',
      marginTop:20
    },
    fecharmodal: {
      backgroundColor:'rgba(0, 0, 0, 0.5)',
      width:'50%',
      height:'100%'
    },
    closeButtonText: {
      color: 'white',
      fontWeight: 'bold',
  
    },
    textInput2: {
      width: '60%',
      height: 40,
      backgroundColor: '#181818',
      borderRadius: 20,
      paddingLeft: 10,
      marginBottom: 20,
      color: 'white',
    },
    InputDate:{
      width:105,
      height: 40,
      backgroundColor: 'white',
      borderTopRightRadius:20,
      color: '#181818',
      borderTopColor:'green',
      fontWeight:'bold',
      justifyContent:'center',
      alignItems:'center'
      
    },
    CardContainer:{
      flexDirection: 'column',
       alignItems: 'center', 
      backgroundColor:'white', 
      borderRadius:8,
      marginLeft:20,
      borderBottomWidth:3,
      borderRightWidth:3,
      borderColor:'#1c8a00',
      marginBottom:20
    },
    CardPadding:{
      padding:10,
    },
    textoNomeCard:{
      fontSize:14,
      fontWeight:'bold',
      marginBottom:4,
      width:'100%',
      textAlign:'center'
    },
    textCampoCard:{
      fontSize:14,
      fontWeight:'bold',
      marginBottom:1,
    },
    textValorCampoCard:{
      fontSize:12,
      fontWeight:'normal',
      marginBottom:4,
      width:200
    },
    textValorCampoCardStatus:{
      fontSize:12,
      fontWeight:'normal',
      marginBottom:4,
      width:130,
      color:'white',
      backgroundColor:'orange',
      padding:4,
      textAlign:'center',
      borderRadius:10
    },
    botaomovi:{
      fontSize:12,
      fontWeight:'bold',
      color:'white'
    },
    textInputADD: {
      width: '70%',
      height: 40,
      backgroundColor: '#181818',
      borderRadius: 20,
      paddingLeft: 10,
      marginTop:15,
      marginBottom:15,
      color: 'white'
    },
    textInputFiltranome: {
      width: '70%',
      height: 40,
      backgroundColor: '#181818',
      borderRadius: 20,
      paddingLeft: 10,
      marginTop:15,
      marginBottom:15,
      color: 'white',
      borderTopRightRadius:0,
      borderBottomRightRadius:0
    },
    pesquisalupa:{
      backgroundColor:'gray',
      height:40,
      width:50,
      justifyContent:'center',
      alignItems:'center',
      borderTopRightRadius:20,
      borderBottomRightRadius:20
    }
})
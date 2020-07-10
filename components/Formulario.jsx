import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableHighlight, Alert } from "react-native";
import { Picker } from "react-native";
// import { consultarAPI } from '../api/api';
import axios from 'axios';

const Formulario = ({moneda, criptomoneda, setMoneda, setCriptomoneda, setPuedeConsultar}) => {

  const [criptomonedaData, setCriptomonedaData] = useState([]);

useEffect(()=>{
    const consultarAPI = async () => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
        const resultado = await axios.get(url);
        setCriptomonedaData(resultado.data.Data); 
    };
    consultarAPI();
}, [])

  const obtenerMoneda = (moneda) => {
    setMoneda(moneda);
  };

  const obtenerCriptomoneda = (criptomoneda) => {
    setCriptomoneda(criptomoneda);
  };

  const cotizarPrecio = () => {
    if(moneda.trim() === '' || criptomoneda.trim() === ''){
        mostrarAlerta();
        return;
    }
    setPuedeConsultar(true);
  };

  const mostrarAlerta = () => {
      Alert.alert(
          'Oops...',
          'Ambos campos son obligatorios',
          [
              {
                  text: 'Entendido'
              }
          ]
      )
  }

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        onValueChange={(moneda) => obtenerMoneda(moneda)}
        selectedValue={moneda}
        itemStyle={{height: 120}}
      >
        <Picker.Item label="-Seleccionar-" value="" />
        <Picker.Item label="USA Dólares" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
        <Picker.Item label="Peso Colombiano" value="COP" />
      </Picker>

      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        onValueChange={(criptomoneda) => obtenerCriptomoneda(criptomoneda)}
        selectedValue={criptomoneda}
        itemStyle={{height: 120}}
      >
          <Picker.Item label="-Seleccionar-" value="" />
          {criptomonedaData.map(elemento => (  
            <Picker.Item key={elemento.CoinInfo.Id} label={elemento.CoinInfo.FullName} value={elemento.CoinInfo.Name}/>
          ))}
      </Picker>

    <TouchableHighlight onPress={()=>cotizarPrecio()} style={styles.btnCotizar}>
        <Text style={styles.txtCotizar}>
            Cotizar
        </Text>
    </TouchableHighlight>

    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    textTransform: "uppercase",
    fontSize: 22,
    marginVertical: 20,
  },
  btnCotizar: {
    backgroundColor: '#6C63FF',
    padding: 10,
    marginTop: 20,
    marginBottom: 40
  },
  txtCotizar: {
    color: '#FFF',
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center'
  }
});

export default Formulario;

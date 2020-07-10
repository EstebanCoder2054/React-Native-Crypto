import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import axios from 'axios';

import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";

const App = () => {
  const [moneda, setMoneda] = useState("");
  const [criptomoneda, setCriptomoneda] = useState("");
  const [puedeConsultar, setPuedeConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando ] = useState(false);

  useEffect(() => {
    const cotizarCCriptomoneda = async () => {
      if(puedeConsultar){
        setCargando(true);
        let url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda},ETH&tsyms=${moneda}`;
        let resultado = await axios.get(url);
        setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
        setPuedeConsultar(false);
        setCargando(false);
      }
    };
    cotizarCCriptomoneda();
  }, [puedeConsultar]);



  return (
    <ScrollView>
      <View>
        <StatusBar style="light" />
        <Header />
        <Image
          style={styles.image}
          source={require("./assets/img/business.png")}
        />

        <View style={styles.contenido}>
          <Formulario
            moneda={moneda}
            criptomoneda={criptomoneda}
            setMoneda={setMoneda}
            setCriptomoneda={setCriptomoneda}
            setPuedeConsultar={setPuedeConsultar}
          />
        </View>

      {cargando ? (<ActivityIndicator size='large' color='#6C63FF' />) : ( <View style={styles.contenido}>
          <Cotizacion resultado={resultado}/>
        </View>)}
       


      </View>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
    marginHorizontal: "2.5%",
  },
  contenido: {
    marginHorizontal: "2.5%",
  },
});

import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native'
const Header = () => {
    return ( 
        <Text style={styles.encabezado}>
            Crypto Native
        </Text>
     );
}
 
export default Header;

const styles = StyleSheet.create({
    encabezado: {
        paddingTop: Platform.OS === 'ios' ? 50 : 40,
        backgroundColor: '#6C63FF',
        paddingBottom: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20,
        color: '#FFF',
        marginBottom: 30
    }
});
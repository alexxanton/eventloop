import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Crear los estilos para el PDF
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});

// Crear el componente de documento
const MyDocument = () => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.text}>Este es un ejemplo de un documento PDF generado en React.</Text>
      </View>
    </Page>
  </Document>
);

const MiComponente = () => {
  return (
    <div>
      <h1>Generar PDF</h1>
      <PDFDownloadLink document={<MyDocument />} fileName="documento.pdf">
        {({ loading }) => (loading ? 'Cargando documento...' : 'Descargar PDF')}
      </PDFDownloadLink>
    </div>
  );
};

export default MiComponente;

import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function BarcodeScannerScreen({ navigation, route }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const preservedName = route.params?.preservedName || '';
  const preservedPrice = route.params?.preservedPrice || '';

  const BARCODE_TYPES = [
    'ean13',
    'ean8',
    'code128',
    'code39',
    'qr',
    'upc_a',
    'upc_e',
    'itf14',
  ];

  function handleBarcodeScanned({ data }) {
    if (scanned) return;
    setScanned(true);

    navigation.navigate('Home', {
      scannedBarcode: data,
      preservedName,
      preservedPrice,
    });
  }

  if (!permission) {
    return (
      <View style={styles.centered}>
        <Text styles={styles.text}>Carregando permissões da câmera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.permissionTitle}>Acesso à câmera</Text>
        <Text style={styles.permissionText}>
          Precisamos da permissão da câmera para ler o código de barras.
        </Text>
        <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
          <Text style={styles.permissionBtnText}>Permitir acesso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: BARCODE_TYPES }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />

      <View style={styles.overlay}>
        <View style={styles.scanArea} />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Leitor de Código de Barras</Text>
        <Text style={styles.panelSubtitle}>
          {scanned
            ? 'Código lido! Redirecionando...'
            : 'Aponte a câmera para um código de barras ou QR code.'}
        </Text>

        {scanned && (
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.retryBtnText}>Ler novamente</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() =>
            navigation.navigate('Home', {
              preservedName,
              preservedPrice,
            })
          }
        >
          <Text style={styles.backBtnText}>← Voltar sem ler</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e102f',
  },

  camera: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 16, 101, 0.25)',
  },

  scanArea: {
    width: 270,
    height: 180,
    borderWidth: 3,
    borderColor: '#c084fc',
    borderRadius: 24,
    backgroundColor: 'rgba(192, 132, 252, 0.08)',
    shadowColor: '#c084fc',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 14,
    elevation: 12,
  },

  panel: {
    backgroundColor: '#2e1065',
    padding: 26,
    paddingBottom: 40,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 1,
    borderColor: '#7e22ce',
    shadowColor: '#581c87',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 14,
  },

  panelTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#faf5ff',
    marginBottom: 8,
    textAlign: 'center',
  },

  panelSubtitle: {
    fontSize: 15,
    color: '#e9d5ff',
    marginBottom: 22,
    textAlign: 'center',
    lineHeight: 22,
  },

  retryBtn: {
    backgroundColor: '#9333ea',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#a855f7',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 8,
  },

  retryBtnText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 16,
  },

  backBtn: {
    borderWidth: 1.5,
    borderColor: '#a855f7',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#3b0764',
  },

  backBtnText: {
    color: '#f3e8ff',
    fontWeight: '700',
    fontSize: 15,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
    backgroundColor: '#1e102f',
  },

  text: {
    color: '#e9d5ff',
    fontSize: 16,
    textAlign: 'center',
  },

  permissionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#faf5ff',
    marginBottom: 14,
    textAlign: 'center',
  },

  permissionText: {
    fontSize: 16,
    color: '#e9d5ff',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 23,
  },

  permissionBtn: {
    backgroundColor: '#9333ea',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 32,
    shadowColor: '#a855f7',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 8,
  },

  permissionBtnText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 16,
  },
});
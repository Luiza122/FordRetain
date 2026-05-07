import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
} from "react-native";
import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../firebase/productService";

function formatPrice(value) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  const number = parseInt(digits, 10);
  return (number / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function rawPrice(formatted) {
  const digits = formatted.replace(/\D/g, "");
  if (!digits) return "";
  return (parseInt(digits, 10) / 100).toFixed(2);
}

export default function HomeScreen({ navigation, route }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [barcode, setBarcode] = useState("");
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  async function loadProducts() {
    try {
      const productList = await getProducts();
      setProducts(productList);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os produtos.");
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (route.params?.scannedBarcode) {
      setBarcode(String(route.params.scannedBarcode));
    }
    if (route.params?.preservedName !== undefined) {
      setName(route.params.preservedName);
    }
    if (route.params?.preservedPrice !== undefined) {
      setPrice(route.params.preservedPrice);
    }
  }, [route.params?.scannedBarcode]);

  function clearForm() {
    setName("");
    setPrice("");
    setBarcode("");
    setEditingProductId(null);
  }

  async function handleSaveProduct() {
    if (!name.trim() || !price.trim()) {
      Alert.alert("Atenção", "Preencha nome e preço do produto.");
      return;
    }

    const productData = {
      name: name.trim(),
      price: rawPrice(price), 
      barcode: barcode ? String(barcode).trim() : "",
    };

    try {
      if (editingProductId) {
        await updateProduct(editingProductId, productData);
        Alert.alert("Sucesso", "Produto atualizado com sucesso!");
      } else {
        await createProduct(productData);
        Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
      }
      clearForm();
      await loadProducts();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar o produto.");
    }
  }

  function handleEditProduct(product) {
    setName(product.name || "");
    const digits = String(Math.round(parseFloat(product.price || 0) * 100));
    setPrice(formatPrice(digits));
    setBarcode(product.barcode || "");
    setEditingProductId(product.id);
  }

  function handleCancelEdit() {
    clearForm();
  }

  function handleDeleteProduct(productId) {
    if (Platform.OS === "web") {
      const confirmDelete = window.confirm("Deseja excluir?");
      if (confirmDelete) confirmDeleteProduct(productId);
    } else {
      Alert.alert("Confirmar exclusão", "Deseja excluir?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: () => confirmDeleteProduct(productId),
        },
      ]);
    }
  }

  async function confirmDeleteProduct(productId) {
    try {
      await deleteProduct(productId);
      if (editingProductId === productId) clearForm();
      Alert.alert("Sucesso", "Produto excluído!");
      await loadProducts();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao excluir.");
    }
  }

  function handleOpenScanner() {
    navigation.navigate("BarcodeScanner", {
      preservedName: name,
      preservedPrice: price,
    });
  }

  function handlePriceChange(text) {
    setPrice(formatPrice(text));
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Produtos</Text>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            {editingProductId ? "Editar produto" : "Novo produto"}
          </Text>

          <TouchableOpacity style={styles.scanBtn} onPress={handleOpenScanner}>
            <Text style={styles.scanBtnText}>Ler código de barras</Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Nome do produto"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <TextInput
            placeholder="Preço (ex: R$ 12,90)"
            placeholderTextColor="#999"
            value={price}
            onChangeText={handlePriceChange}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            placeholder="Código de barras"
            placeholderTextColor="#999"
            value={barcode}
            onChangeText={setBarcode}
            style={styles.input}
          />

          <TouchableOpacity style={styles.saveBtn} onPress={handleSaveProduct}>
            <Text style={styles.saveBtnText}>
              {editingProductId ? "Atualizar produto" : "Cadastrar produto"}
            </Text>
          </TouchableOpacity>

          {editingProductId && (
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={handleCancelEdit}
            >
              <Text style={styles.cancelBtnText}>Cancelar edição</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.sectionTitle}>Produtos cadastrados</Text>

        {products.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
        ) : (
          products.map((item) => (
            <View key={item.id} style={styles.productCard}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>
                {parseFloat(item.price || 0).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
              <Text style={styles.productBarcode}>
                Código: {item.barcode || "Sem código de barras"}
              </Text>
              <View style={styles.productActions}>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => handleEditProduct(item)}
                >
                  <Text style={styles.editBtnText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => {
                    console.log("CLICOU NO EXCLUIR")
                    handleDeleteProduct(item.id)
                  }}
                >
                  <Text style={styles.deleteBtnText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: "#1e102f",
  },

  container: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#faf5ff",
  },

  logoutBtn: {
    backgroundColor: "#7f1d1d",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },

  logoutText: {
    color: "#fee2e2",
    fontWeight: "800",
    fontSize: 13,
  },

  card: {
    backgroundColor: "#2e1065",
    borderRadius: 22,
    padding: 18,
    marginBottom: 26,
    borderWidth: 1,
    borderColor: "#7e22ce",
    shadowColor: "#581c87",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#f3e8ff",
    marginBottom: 14,
  },

  scanBtn: {
    backgroundColor: "#581c87",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#a855f7",
  },

  scanBtnText: {
    color: "#f3e8ff",
    fontWeight: "700",
    fontSize: 15,
  },

  input: {
    backgroundColor: "#1e102f",
    borderWidth: 1.5,
    borderColor: "#7e22ce",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    color: "#faf5ff",
    fontSize: 15,
  },

  saveBtn: {
    backgroundColor: "#9333ea",
    borderRadius: 14,
    padding: 15,
    alignItems: "center",
    marginTop: 6,
    shadowColor: "#a855f7",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 8,
  },

  saveBtnText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 15,
  },

  cancelBtn: {
    borderWidth: 1.5,
    borderColor: "#c084fc",
    borderRadius: 14,
    padding: 13,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#3b0764",
  },

  cancelBtnText: {
    color: "#f3e8ff",
    fontWeight: "700",
  },

  emptyText: {
    color: "#d8b4fe",
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
  },

  productCard: {
    backgroundColor: "#2e1065",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderLeftWidth: 5,
    borderLeftColor: "#c084fc",
    borderWidth: 1,
    borderColor: "#6b21a8",
  },

  productName: {
    fontSize: 17,
    fontWeight: "800",
    color: "#faf5ff",
    marginBottom: 5,
  },

  productPrice: {
    fontSize: 16,
    color: "#86efac",
    fontWeight: "800",
    marginBottom: 5,
  },

  productBarcode: {
    fontSize: 13,
    color: "#d8b4fe",
    marginBottom: 12,
  },

  productActions: {
    flexDirection: "row",
  },

  editBtn: {
    flex: 1,
    backgroundColor: "#581c87",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    marginRight: 5,
    borderWidth: 1,
    borderColor: "#a855f7",
  },

  editBtnText: {
    color: "#f3e8ff",
    fontWeight: "700",
  },

  deleteBtn: {
    flex: 1,
    backgroundColor: "#4c0519",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    marginLeft: 5,
    borderWidth: 1,
    borderColor: "#be123c",
  },

  deleteBtnText: {
    color: "#fecdd3",
    fontWeight: "700",
  },
});
import React, { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [timesPressed, setTimesPressed] = useState(0);

  let textLog = "";
  if (timesPressed > 1) {
    textLog = `${timesPressed}x onPress`;
  } else if (timesPressed > 0) {
    textLog = "onPress";
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* OPEN MODAL PRESSABLE */}
        <Pressable
          onPress={() => {
            setTimesPressed((c) => c + 1);
            setModalVisible(true);
          }}
          style={({ pressed }) => [
            styles.pressable,
            { backgroundColor: pressed ? "rgb(210,230,255)" : "white" },
          ]}
        >
          {({ pressed }) => (
            <Text style={styles.openText}>
              {pressed ? "Pressed!" : "Show modal message"}
            </Text>
          )}
        </Pressable>

        <View style={styles.logBox}>
          <Text>{textLog}</Text>
        </View>

        {/* MODAL */}
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(false);
          }}
        >
          <View style={styles.overlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>This is modal...</Text>

              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  pressable: {
    borderRadius: 8,
    padding: 12,
  },
  openText: {
    fontSize: 18,
  },
  logBox: {
    marginTop: 16,
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 24,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    marginBottom: 16,
    fontSize: 16,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  closeText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

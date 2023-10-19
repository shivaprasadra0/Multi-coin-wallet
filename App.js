import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { mnemonicToSeedSync, HDWallet } from "bip44";

const App = () => {
  const [mnemonicPhrase, setMnemonicPhrase] = useState("");
  const [accounts, setAccounts] = useState([]);

  const getAccounts = () => {
    const seed = mnemonicToSeedSync(mnemonicPhrase);
    const wallet = new HDWallet(seed);

    const accounts = [];
    for (let i = 0; i < wallet.getExtendedPublicKey().numChildren; i++) {
      const account = wallet.deriveChild(0, i);
      accounts.push(account.getAddress());
    }

    setAccounts(accounts);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Mnemonic Phrase:</Text>
      <TextInput
        style={{ width: "100%", borderColor: "black", borderWidth: 1, padding: 10 }}
        onChangeText={(text) => setMnemonicPhrase(text)}
        value={mnemonicPhrase}
      />
      <Button title="Get Accounts" onPress={getAccounts} />
      <Text style={{ marginTop: 20 }}>Accounts:</Text>
      <View>
        {accounts.map((account) => (
          <Text key={account}>{account}</Text>
        ))}
      </View>
    </View>
  );
};

export default App;

import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useUser } from '@clerk/clerk-expo'
import { useState } from "react";

export default function Profile(){
  const { user } = useUser()

  const [firstName, setFirstName] = useState(user?.firstName ?? "")
  const [lastName, setLastName] = useState(user?.lastName ?? "")

  async function handleUpdateProfile(){
    try{
      const result = await user?.update({
        firstName: firstName,
        lastName: lastName
      })
      console.log("USUARIO ATUALIZADO: ", result)
    }catch(err){
      console.log("ERRO AO ATUALIZAR: ", err)
    }
  }

  return(
    <View style={styles.container}>
      {user?.fullName && (
        <Text style={{ textAlign: 'center', marginBottom: 20 }}>Bem vindo: {user?.fullName}</Text>
      )}

      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Digite seu primeiro nome..."
        style={styles.input}
      />
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        placeholder="Digite sobrenome..."
        style={styles.input}
      />

      <Button
        title="Atualizar perfil"
        onPress={handleUpdateProfile}
        color="#121212"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#121212',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
});
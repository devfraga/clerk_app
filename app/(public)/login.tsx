import { StyleSheet, Text, View, Button, Pressable, TextInput } from "react-native";
import { useSignIn } from '@clerk/clerk-expo'
import { useState } from 'react'
import { Link } from 'expo-router'

export default function Login(){
  const { isLoaded, setActive, signIn } = useSignIn();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSignIn(){
    if(!isLoaded) return;

    try{

      const signinUser = await signIn.create({
        identifier: email,
        password: password
      })

      await setActive({ session: signinUser.createdSessionId })

    }catch(err){
      console.log(JSON.stringify(err, null, 2));
    }

  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Acessar conta</Text>

      <TextInput
        autoCapitalize="none"
        placeholder="Digite seu email..."
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        autoCapitalize="none"
        placeholder="Digite sua senha..."
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title="Acessar"
        color="#121212"
        onPress={handleSignIn}
      />

      <Link href="/register" asChild>
        <Pressable style={styles.button}>
          <Text>Ainda não possui uma conta? Cadastre-se</Text>
        </Pressable>
      </Link>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 14,
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
  button: {
    margin: 8,
    alignItems: 'center',
  },
});
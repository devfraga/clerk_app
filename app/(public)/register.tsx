import { StyleSheet, Text, View, Button, Pressable, TextInput } from "react-native";
import { useSignUp } from '@clerk/clerk-expo'
import { useState } from 'react'
import { Link } from 'expo-router'

export default function Register(){
  const { isLoaded, setActive, signUp } = useSignUp();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pendingEmailCode, setPendingEmailCode] = useState(false);
  const [code, setCode] = useState("")

  async function handleSignUp(){
    if(!isLoaded) return

    try{
      await signUp.create({
        emailAddress: email,
        password: password
      })

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
      setPendingEmailCode(true);

    }catch(e){
      console.log(e);
    }

  }


  async function handleVerifyUser(){
    if(!isLoaded) return;


      try{
        const completeSignup = await signUp?.attemptEmailAddressVerification({
          code
        })

        await setActive({ session: completeSignup.createdSessionId })

      }catch(e){
        console.log(e);
      }
  }

  return(
    <View style={styles.container}>
        {!pendingEmailCode && (
          <View>
            <Text style={styles.title}>Criar uma conta</Text>

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
              title="Criar uma conta"
              color="#121212"
              onPress={handleSignUp}
            />

            <Link href="/login" asChild>
              <Pressable style={styles.button}>
                <Text>Já possui uma conta? Faça o login</Text>
              </Pressable>
            </Link>
          </View>
        )}


        {pendingEmailCode && (
          <View>
            <Text style={styles.title}>Digite o código:</Text>
            <TextInput
              autoCapitalize="none"
              placeholder="Digite seu código..."
              style={styles.input}
              value={code}
              onChangeText={setCode}
            />
            <Button
              title="Ativar conta"
              color="#121212"
              onPress={handleVerifyUser}
            />
          </View>
        )}

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
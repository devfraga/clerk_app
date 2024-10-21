import { Stack } from "expo-router"

export default function PublicLayout(){
  return(
    <Stack
      screenOptions={{
        headerStyle:{
          backgroundColor: "#121212",
        },
        headerTintColor: "#FFF",
      }}
    >
      <Stack.Screen 
        name="login"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="register"
        options={{
          headerTitle: "Criar conta"
        }}
      />
    </Stack>
  )
}
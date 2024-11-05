import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';

const SignInScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState('johnd');
  const [password, setPassword] = useState('m38rmF$');  
  const [loading, setLoading] = useState(false);  

  const handleLogin = async () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    setLoading(true);  

    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Login successful');
        console.log(jsonResponse);  
        navigation.replace('Home');  
      } else {
        Alert.alert('Login failed', 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error during Login:', error);
      Alert.alert('Error', 'Something went wrong, please try again');
    } finally {
      setLoading(false);  
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Log in to your account</Text>
        <Image
          source={require('./(tabs)/img/DiNi.png')}  
          style={styles.logo}
        />

        <Text style={{ marginRight: 250, fontSize: 15 }}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={{ marginRight: 250, fontSize: 15 }}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry  
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Logging In...' : 'LogIn'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link}>
          <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
            <Text style={[styles.linkText, styles.textWithMargin]}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.replace('Forgot')}>
            <Text style={styles.linkText}>Forgot password</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  
  container: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
  title: {
    fontSize: 20,
    opacity: 0.5,
    marginBottom: 50,

  },
  logo: {
    width: 200,    
    height: 200,   
    marginBottom: 20, 
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#666666',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  textWithMargin: {
    marginRight: 5,
  },
});
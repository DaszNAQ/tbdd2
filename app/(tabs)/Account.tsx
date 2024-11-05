import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

type AccountScreenNavigationProp = {
  navigate: (screen: string) => void;
};

const AccountScreen = () => {
  const navigation = useNavigation<AccountScreenNavigationProp>();

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", onPress: () => console.log("User logged out") }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
            source={require('./img/DiNi.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>NAQ</Text>
        <Text style={styles.profileEmail}>nq6122003@gmail.com</Text>
      </View>

      {/* Options Section */}
      <View style={styles.optionsContainer}>
        <OptionItem
          icon="cart-outline"
          title="Order History"
          onPress={() => navigation.navigate('OrderHistory')}
        />
        <OptionItem
          icon="settings-outline"
          title="Account Settings"
          onPress={() => navigation.navigate('AccountSettings')}
        />
        <OptionItem
          icon="help-circle-outline"
          title="Help & Support"
          onPress={() => navigation.navigate('Help')}
        />
        <OptionItem
          icon="log-out-outline"
          title="Log Out"
          onPress={handleLogout}
        />
      </View>
    </ScrollView>
  );
};

// Custom component for each option item
const OptionItem = ({ icon, title, onPress }: { icon: string, title: string, onPress: () => void }) => (
  <TouchableOpacity style={styles.optionItem} onPress={onPress}>
    <Icon name={icon} size={24} color="#4CAF50" style={styles.optionIcon} />
    <Text style={styles.optionText}>{title}</Text>
    <Icon name="chevron-forward-outline" size={20} color="#999" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 30,
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  optionsContainer: {
    paddingHorizontal: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
});

export default AccountScreen;

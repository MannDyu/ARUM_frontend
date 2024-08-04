import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CenterItemProps {
  name: string;
  address: string;
  phone: string;
}

const CenterItem: React.FC<CenterItemProps> = ({ name, address, phone }) => {
  return (
    <TouchableOpacity style={styles.centerItem}>
      <Text style={styles.centerName}>{name}</Text>
      <Text style={styles.centerAddress}>{address}</Text>
      <Text style={styles.centerPhone}>{phone}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  centerItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 15,
    marginBottom: 15,
  },
  centerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  centerAddress: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  centerPhone: {
    fontSize: 14,
    color: '#555',
  },
});

export default CenterItem;
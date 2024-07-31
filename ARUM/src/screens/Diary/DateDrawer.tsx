import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Modal, TouchableOpacity, TextStyle } from 'react-native';
import { ListItem, Text, Button } from 'react-native-elements';


interface DateDrawerProps {
  isVisible: boolean;
  onClose: () => void;
  onDateSelect: (year: number, month: number) => void;
}

const DateDrawer: React.FC<DateDrawerProps> = ({ 
  isVisible = false, 
  onClose, 
  onDateSelect 
}) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const monthScrollViewRef = useRef<ScrollView>(null);

  

  const years = useMemo(() => 
    Array.from({ length: 6 }, (_, i) => currentYear - i),
    [currentYear]
  );
  const months = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => i + 1),
    []
  );

  useEffect(() => {
    if (isVisible && monthScrollViewRef.current) {
      setTimeout(() => {
        monthScrollViewRef.current?.scrollTo({ 
          y: (currentMonth - 1) * 50, 
          animated: false 
        });
      }, 100);
    }
  }, [isVisible, currentMonth]);

  const handleConfirm = () => {
    try {
      onDateSelect(selectedYear, selectedMonth);
      console.log('Selected date:', { year: selectedYear, month: selectedMonth });
    } catch (error) {
      console.error('Error selecting date:', error);
    }
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.bottomSheetContainer}>
          <Text h4 style={styles.title}>날짜 선택</Text>
          <View style={styles.pickerContainer}>
            <View style={styles.pickerWrapper}>
              <Text style={styles.label}>년도</Text>
              <ScrollView 
                style={styles.picker}
                accessible={true}
                accessibilityLabel="연도 선택"
              >
                {years.map((year) => (
                  <ListItem key={year} onPress={() => setSelectedYear(year)}>
                    <ListItem.Content>
                      <ListItem.Title style={year === selectedYear ? styles.selectedText : undefined}>
                        {year}
                      </ListItem.Title>
                    </ListItem.Content>
                    {year === selectedYear && <ListItem.CheckBox checked={true} />}
                  </ListItem>
                ))}
              </ScrollView>
            </View>
            <View style={styles.pickerWrapper}>
              <Text style={styles.label}>월</Text>
              <ScrollView 
                ref={monthScrollViewRef}
                style={styles.picker}
                accessible={true}
                accessibilityLabel="월 선택"
              >
                {months.map((month) => (
                  <ListItem key={month} containerStyle={styles.listItem} onPress={() => setSelectedMonth(month)}>
                    <ListItem.Content>
                      <ListItem.Title style={month === selectedMonth ? styles.selectedText : undefined}>
                        {month.toString().padStart(2, '0')}
                      </ListItem.Title>
                    </ListItem.Content>
                    {month === selectedMonth && <ListItem.CheckBox checked={true} />}
                  </ListItem>
                ))}
              </ScrollView>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="확인" onPress={handleConfirm} buttonStyle={styles.button} />
            <Button title="취소" onPress={onClose} buttonStyle={styles.button} type="outline" />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  bottomSheetContainer: {
    backgroundColor: 'white',
    padding: 20,
    maxHeight: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pickerWrapper: {
    flex: 1,
    marginHorizontal: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  picker: {
    maxHeight: 200,
  },
  selectedText: {
    fontWeight: 'bold',
    color: 'blue',
  },
  listItem:{
    height: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    width: 120,
  },
});

export default DateDrawer;
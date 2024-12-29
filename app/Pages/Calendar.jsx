import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const Calendar = () => {
  const router = useRouter();

  // Initial items state
  const [items, setItems] = useState({
    '2024-12-16': [{ name: 'Event 1' }],
    '2024-12-19': [{ name: 'Event 5' }],
    '2024-12-28': [{ name: 'Event 9' }],
    '2024-12-17': [{ name: 'Event 2' }, { name: 'Event 3' }],
  });

  const itemsRef = useRef(items);

  const loadItems = (day) => {
    const newItems = { ...itemsRef.current }; // Keep existing items

    // Generate additional days dynamically if necessary
    for (let i = -15; i <= 15; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000; // Each day in milliseconds
      const date = new Date(time).toISOString().split('T')[0]; // Format YYYY-MM-DD

      // Add an empty array if the date doesn't already exist
      if (!newItems[date]) {
        newItems[date] = [];
      }
    }

    itemsRef.current = newItems; // Update reference
    setItems(newItems); // Update state
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ backgroundColor: '#3243da', padding: 12, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.push('/Home')}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 20, marginLeft: 16 }}>School Calendar</Text>
      </View>

      {/* Agenda */}
      <Agenda
        items={items}
        selected={'2024-12-16'}
        loadItemsForMonth={loadItems}
        renderItem={(item) => (
          <View style={{ backgroundColor: '#E3F2FD', padding: 16, borderRadius: 8, marginTop:25 }}>
            <Text style={{ color: '#1E88E5', fontSize: 16 }}>{item.name}</Text>
          </View>
        )}
        renderEmptyDate={() => (
          <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#B0BEC5' }}>No Events on this Date</Text>
          </View>
        )}
        theme={{
          agendaDayTextColor: 'blue',
          agendaDayNumColor: 'blue',
          agendaTodayColor: 'red',
          agendaKnobColor: 'gray',
        }}
      />
    </View>
  );
};

export default Calendar;

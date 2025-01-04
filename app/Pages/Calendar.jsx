import React, { useState, useRef, memo, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import apiClient from '../utils/axiosInstance';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
const Calendar = () => {
  const router = useRouter();
  const [date, setDate] = useState(new Date())
  const [items, setItems] = useState({});
  const itemsRef = useRef(items);
  const [loading, setLoading] = useState(false)

  // Function to fetch events and holidays
  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch both events and holidays
      const [eventsResponse, holidaysResponse] = await Promise.all([
        apiClient.get('event'),
        apiClient.get('holiday'),
      ]);

      // Process events
      const events = eventsResponse?.data?.data.map((event) => ({
        date: event.date.split('T')[0], // Format YYYY-MM-DD
        name: event.name,
        type: 'Event',
        id: event._id,
      })) || [];

      // Process holidays
      const holidays = holidaysResponse?.data?.data.map((holiday) => ({
        date: holiday.date.split('T')[0], // Format YYYY-MM-DD
        name: holiday.name,
        type: 'Holiday',
        id: holiday._id,
      })) || [];

      // Combine events and holidays, grouped by date
      const newItems = {};
      [...events, ...holidays].forEach((item) => {
        if (!newItems[item.date]) {
          newItems[item.date] = [];
        }

        // Avoid duplicates using unique IDs
        if (!newItems[item.date].find((existing) => existing.id === item.id)) {
          newItems[item.date].push(item);
        }
      });

      itemsRef.current = newItems; // Update ref
      setItems(newItems); // Update state
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false)
    }
  };

  // Generate additional days dynamically
  const loadItems = (day) => {
    const newItems = { ...itemsRef.current };

    for (let i = -2; i <= 14; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000; // Each day in milliseconds
      const date = new Date(time).toISOString().split('T')[0];

      if (!newItems[date]) {
        newItems[date] = [];
      }
    }

    itemsRef.current = newItems; // Update ref
    setItems(newItems); // Update state
  };

  // Memoized RenderItem
  const RenderItem = memo(({ item }) => (
    <View
      style={{
        backgroundColor: item.type === 'Event' ? '#E3F2FD' : '#FFEBEE',
        padding: 16,
        borderRadius: 8,
        marginTop: 25,
      }}
    >
      <Text
        style={{
          color: item.type === 'Event' ? '#1E88E5' : '#D32F2F',
          fontSize: 16,
        }}
      >
        {item.name} ({item.type})
      </Text>
    </View>
  ));

  // Memoized RenderEmptyDate
  const RenderEmptyDate = memo(() => (
    <View className=' h-20 flex justify-end items-center mb-6 pb-6'>
      <Text className='text-blue-800 font-mediumM'>No Events or Holidays on this Date</Text>
    </View>
  ));

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View className="bg-[#3243da] justify-start p-3 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text className="text-xl tracking-wider text-white ml-4 font-mediumM">
          School Calendar
        </Text>
      </View>

      {/* Agenda */}
     {!loading ? <Agenda
        items={items}
        selected={date}
        loadItemsForMonth={loadItems}
        renderItem={(item) => <RenderItem item={item} />}
        renderEmptyDate={() => <RenderEmptyDate />}
        theme={{
          agendaDayTextColor: 'blue',
          agendaDayNumColor: 'blue',
          agendaTodayColor: 'red',
          agendaKnobColor: 'gray',
        }}
      />:  <ActivityIndicator animating={true} color={'#3243da'} size={46} className='mt-20'/>} 
    </View>
  );
};

export default Calendar;

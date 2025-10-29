// app/(tabs)/_layout.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#9932fa',
        tabBarInactiveTintColor: '#bbb',
        tabBarLabelStyle: { fontWeight: '600' },
        tabBarStyle: { 
          backgroundColor: '#fff', 
          borderTopLeftRadius: 20, 
          borderTopRightRadius: 20, 
          height: 65,
          position: 'absolute',  // Add this
          overflow: 'hidden',     // Add this
          borderTopWidth: 0,      // Add this
        }
      })}
      sceneContainerStyle={{ backgroundColor: 'transparent' }}  // Add this
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={27} />
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Tickets',
          tabBarIcon: ({ color, size }) => <Ionicons name="ticket-outline" color={color} size={27} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" color={color} size={27} />
        }}
      />
    </Tabs>
  );
}

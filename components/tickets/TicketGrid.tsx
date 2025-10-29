// components/tickets/TicketGrid.tsx
import React from 'react';
import { FlatList } from 'react-native';
import TicketCard from './TicketCard';

export default function TicketGrid({ tickets }) {
  return (
    <FlatList 
      data={tickets} numColumns={2}
      keyExtractor={t=>t.id}
      renderItem={({item})=><TicketCard {...item} />}
      contentContainerStyle={{padding:8}}
      showsVerticalScrollIndicator={false}
    />
  );
}

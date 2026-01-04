import { useHealthData } from '@/hooks/useHealthData';
import React, { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Dashboard() {
  const { steps, isAuthorized } = useHealthData();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh or re-fetch logic if hook supports it
    // For now just timeout
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View className="p-6">
          <View className="mb-6">
            <Text className="text-3xl font-bold text-slate-800 dark:text-white">Summary</Text>
            <Text className="text-slate-500 dark:text-slate-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </Text>
          </View>

          {/* Health Permissions Status */}
          {!isAuthorized && (
            <View className="bg-red-100 p-4 rounded-xl mb-6">
              <Text className="text-red-800 font-semibold">Health Access Required</Text>
              <Text className="text-red-600 text-sm mt-1">Please enable HealthKit permissions in settings.</Text>
            </View>
          )}

          {/* Metrics Grid */}
          <View className="flex-row flex-wrap justify-between gap-y-4">
            {/* Steps Card */}
            <View className="w-[48%] bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <View className="flex-row justify-between items-start mb-2">
                <View className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full">
                  {/* Icon placeholder */}
                  <Text className="text-orange-500 text-xs">👣</Text>
                </View>
              </View>
              <Text className="text-2xl font-bold text-slate-800 dark:text-white">{steps.toLocaleString()}</Text>
              <Text className="text-sm text-slate-500 dark:text-slate-400">Steps</Text>
            </View>

            {/* Calories Card (Placeholder) */}
            <View className="w-[48%] bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <View className="flex-row justify-between items-start mb-2">
                <View className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                  <Text className="text-red-500 text-xs">🔥</Text>
                </View>
              </View>
              <Text className="text-2xl font-bold text-slate-800 dark:text-white">--</Text>
              <Text className="text-sm text-slate-500 dark:text-slate-400">Kcal</Text>
            </View>

            {/* Heart Rate Card (Placeholder) */}
            <View className="w-full bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <View className="flex-row items-center gap-3 mb-2">
                <View className="bg-rose-100 dark:bg-rose-900/30 p-2 rounded-full">
                  <Text className="text-rose-500 text-xs">❤️</Text>
                </View>
                <Text className="text-base font-semibold text-slate-800 dark:text-white">Heart Rate</Text>
              </View>
              <View className="flex-row items-end gap-1">
                <Text className="text-3xl font-bold text-slate-800 dark:text-white">--</Text>
                <Text className="text-lg text-slate-500 dark:text-slate-400 mb-1">BPM</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

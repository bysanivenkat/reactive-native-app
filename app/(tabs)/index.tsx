import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React, { useCallback, useState } from 'react';
import { Image, RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Dashboard() {
  const { colorScheme } = useColorScheme();
  // const { steps, isAuthorized } = useHealthData();
  const steps = 8432;
  const isAuthorized = true;
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
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3b82f6" />}
      >
        <View className="p-6 pt-2">
          {/* Header */}
          <View className="mb-8">
            <Text className="text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase text-xs mb-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Activity
              </Text>
              <View className="bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-700">
                <Image
                  source={{ uri: 'https://i.pravatar.cc/150?img=68' }}
                  className="w-10 h-10"
                />
              </View>
            </View>
          </View>

          {/* Health Permissions Status */}
          {!isAuthorized && (
            <View className="bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/50 p-4 rounded-2xl mb-8 flex-row items-start gap-3">
              <MaterialCommunityIcons name="alert-circle" size={24} color="#f43f5e" />
              <View className="flex-1">
                <Text className="text-rose-900 dark:text-rose-100 font-bold text-base mb-1">Health Access Required</Text>
                <Text className="text-rose-700 dark:text-rose-200/80 text-sm leading-5">
                  Please enable HealthKit permissions in settings to track your activity.
                </Text>
              </View>
            </View>
          )}

          {/* Main Highlights */}
          <View className="flex-row flex-wrap justify-between gap-y-4">

            {/* Steps Card (Primary) */}
            <View className="w-[48%] bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800 relative overflow-hidden">
              <View className="absolute -right-4 -top-4 w-24 h-24 bg-orange-50 dark:bg-orange-500/10 rounded-full" />
              <View className="flex-row justify-between items-start mb-6">
                <View className="bg-orange-100 dark:bg-orange-500/20 p-2.5 rounded-full">
                  <MaterialCommunityIcons name="shoe-print" size={20} color="#f97316" />
                </View>
              </View>
              <View>
                <Text className="text-3xl font-black text-slate-900 dark:text-white tracking-tight -ml-0.5">
                  {steps.toLocaleString()}
                </Text>
                <Text className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Steps</Text>
              </View>
            </View>

            {/* Calories Card */}
            <View className="w-[48%] bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800 relative overflow-hidden">
              <View className="absolute -right-4 -top-4 w-24 h-24 bg-red-50 dark:bg-red-500/10 rounded-full" />
              <View className="flex-row justify-between items-start mb-6">
                <View className="bg-red-100 dark:bg-red-500/20 p-2.5 rounded-full">
                  <MaterialCommunityIcons name="fire" size={20} color="#ef4444" />
                </View>
              </View>
              <View>
                <Text className="text-3xl font-black text-slate-900 dark:text-white tracking-tight -ml-0.5">850</Text>
                <Text className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Kcal</Text>
              </View>
            </View>

            {/* Heart Rate Card */}
            <View className="w-full bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800 relative overflow-hidden mt-1">
              <View className="absolute -right-8 -top-8 w-40 h-40 bg-rose-50 dark:bg-rose-500/10 rounded-full" />
              <View className="flex-row items-center gap-4 mb-4">
                <View className="bg-rose-100 dark:bg-rose-500/20 p-3 rounded-full">
                  <MaterialCommunityIcons name="heart-pulse" size={24} color="#f43f5e" />
                </View>
                <Text className="text-lg font-bold text-slate-900 dark:text-white">Heart Rate</Text>
              </View>

              <View className="flex-row items-baseline gap-2">
                <Text className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">78</Text>
                <Text className="text-base font-medium text-slate-500 dark:text-slate-400">BPM</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

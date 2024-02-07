/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { Tabs } from 'expo-router';
import Books from './Books/Books';
import Profile from './Profile/Profile';
import Quote from './Quotes';
import CustomBottomTab from '~/app/component/CustomBottomTab';
import { Book, ProfileTick, QuoteDownCircle } from 'iconsax-react-native';

export type TabParamList = {
    Books: undefined;
    Quote: undefined;
    Profile: undefined;
  };

const CustomBottomTabs = (props: any) => {
    return <CustomBottomTab {...props} />;
};

const TabLayout = () => {

  return (
    <Tabs screenOptions={{ headerShown: false}} tabBar={CustomBottomTabs} initialRouteName="Quote">
        <Tabs.Screen 
            name="Books/Books" 
            
            options={{ 
                title: "Books", 
                tabBarLabel: 'Books',
                tabBarIcon: ({ color, size }) => 'home', 
                
            }} 
        />
        <Tabs.Screen 
            name="Quote/index" 
            options={{ 
                title: "Quote", 
                tabBarIcon: ({ color, size }) => 'home' }} 
        />
        <Tabs.Screen 
            name="Profile" 
            options={{ 
                title: "Profile", 
                tabBarIcon: ({ color, size }) => 'home' }} 
        />
    </Tabs>
  )
}

export default TabLayout;
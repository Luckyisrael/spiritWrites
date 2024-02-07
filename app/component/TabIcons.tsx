/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import { Book, ProfileTick, QuoteDownCircle } from 'iconsax-react-native';

interface Props {
  route: string;
  isFocused: boolean;
}

const TabIcons = ({route, isFocused}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const renderIcon = (route: string, isFocused: boolean) => {

    switch (route) {
      case 'Home':
        return (
            <QuoteDownCircle 
                size="32" 
                color="#FF8A65"
                variant='Bulk'
                fill={isFocused ? '#0067FF' : '#ffffff'}
            />
          
        );
      case 'Search':
        return (
            <Book 
                size="32" 
                color="#FF8A65" 
                variant="Bulk"
                fill={isFocused ? '#0067FF' : '#ffffff'}
            />
        );
      case 'Profile':
        return (
            <ProfileTick 
                size="32" 
                color="#FF8A65" 
                variant="Bulk"
                fill={isFocused ? '#0067FF' : '#ffffff'}
            />
        );
      default:
        break;
    }
  };

  return <View>{renderIcon(route, isFocused)}</View>;
};

export default TabIcons;
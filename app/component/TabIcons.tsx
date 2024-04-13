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
      case 'Quotes':
        return (
            <QuoteDownCircle 
                size="32" 
                color={isFocused ? '#FF8A65' : '#000000'}
                variant='Bold'
                
            />
          
        );
      case 'Books':
        return (
            <Book 
                size="32" 
                color={isFocused ? '#FF8A65' : '#000000'}
                variant="Bold"
        
            />
        );
      case 'Profile':
        return (
            <ProfileTick 
                size="32" 
                color={isFocused ? '#FF8A65' : '#000000'}
                variant="Bold"
               
            />
        );
      default:
        break;
    }
  };

  return <View>{renderIcon(route, isFocused)}</View>;
};

export default TabIcons;
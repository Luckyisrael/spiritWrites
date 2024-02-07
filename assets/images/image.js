/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import {Image} from 'react-native';
import onboardOne from './onboardOne.png';
import onboardTwo from './onboardTwo.png';
import  onboardThree from './onboardThree.png';


const onboardOneUri = Image.resolveAssetSource(onboardOne).uri;
const onboardTwoUri = Image.resolveAssetSource(onboardTwo).uri;
const onboardThreeUri = Image.resolveAssetSource(onboardThree).uri;

export {
    onboardOneUri,
    onboardThreeUri,
    onboardTwoUri
}
import { Image } from 'react-native';
import React from 'react';

import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION } from '../constants/routes';

const WelcomeScreen = () => {
    const navigation = useNavigation()
    return(
        <Onboarding
        onSkip={() => navigation.navigate(NAVIGATION.LOGIN)}
            onDone={() => navigation.navigate(NAVIGATION.LOGIN)}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../../assets/circle.png')} />,
                    title: 'Onboarding',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: '#fe6e58',
                    image: <Image source={require('../../assets/square.png')} />,
                    title: 'The Title',
                    subtitle: 'This is the subtitle that sumplements the title.',
                },
                {
                    backgroundColor: '#999',
                    image: <Image source={require('../../assets/triangle.png')} />,
                    title: 'Triangle',
                    subtitle: "Beautiful, isn't it?",
                },
            ]}
        />
    )
};

export default WelcomeScreen;
import {
    FlatList,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';

import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { selectTravelTimeInformation } from '../slices/navSlice';

const data = [
    {
        id: 'Uber-X-123',
        title: 'Uber X',
        multiplier: 1,
        image: 'https://links.papareact.com/3pn',
    },
    {
        id: 'Uber-XL-456',
        title: 'Uber XL',
        multiplier: 1.2,
        image: 'https://links.papareact.com/5w8',
    },
    {
        id: 'Uber-LUX-789',
        title: 'Uber LUX',
        multiplier: 1.75,
        image: 'https://links.papareact.com/7pf',
    },
];

const SURGE_CHANGE_RATE = 1.5;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity
                    style={tw`absolute top-3 left-5 p-3 rounded-full z-50`}
                    onPress={() => navigation.navigate('NavigateCard')}
                >
                    <Icon
                        name='chevron-left'
                        type='fontawesome'
                    />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>
                    Select a Ride - {travelTimeInformation?.distance?.text}
                </Text>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={tw`flex-row items-center justify-between px-5 ${selected?.id === item.id && 'bg-gray-200'}`}
                        onPress={() => setSelected(item)}
                    >
                        <Image
                            style={{
                                width: 85,
                                height: 85,
                                resizeMode: 'contain'
                            }}
                            source={{ uri: item.image }}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-xl font-semibold`}>
                                {item.title}
                            </Text>
                            <Text>
                                {travelTimeInformation?.duration?.text} Travel Time
                            </Text>
                        </View>
                        <Text style={tw`text-xl`}>
                            {new Intl.NumberFormat('en-us', {
                                style: 'currency',
                                currency: 'USD'
                            }).format((travelTimeInformation?.duration.value * SURGE_CHANGE_RATE * item.multiplier) / 1000)}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <View style={tw`mt-auto`}>
                <TouchableOpacity
                    disabled={!selected}
                    style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}
                >
                    <Text style={tw`text-center text-white text-xl`}>
                        Choose {selected?.title ?? 'Car'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default RideOptionsCard;

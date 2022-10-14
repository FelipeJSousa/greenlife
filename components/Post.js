import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import BlockImage from './BlockImage';

const Post = () => {
  const randomValue = () => Math.round(Math.random(1) * 1000);
  const initLike = randomValue();
  const initComents = randomValue();
  const [coment, setComent] = useState(initComents);
  const [like, setLike] = useState(initLike);
  const handleLike = () => setLike(like + 1);
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <BlockImage
          width={Dimensions.get('window').width}
          height={250}
          border={0}
        />
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 50, paddingHorizontal: 5 }}>
            Titulo do Post
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
            }}
          >
            <Text style={{ fontSize: 15 }}>Autor do post</Text>
            <Text style={{ fontSize: 15 }}>20/09/01 às 19:50</Text>
          </View>
          <Text style={{ fontSize: 20 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            at nibh tincidunt, pretium dui ut, laoreet lacus. Nunc faucibus arcu
            quis rutrum condimentum. Nam mollis lectus enim, a congue neque
            tristique at. Maecenas quam libero, scelerisque vitae porta non,
            congue semper erat. Pellentesque maximus lectus risus, eget ornare
            arcu ullamcorper vel. Fusce aliquet egestas justo sit amet
            efficitur. Donec ultricies cursus odio, id commodo dolor
          </Text>
          <View style={{ flex: 1, paddingVertical: 10, flexDirection: 'row' }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
              }}
            >
              <Entypo name="location-pin" size={50} color="black" />
            </View>
            <View
              style={{
                flex: 5,
                flexDirection: 'column',
              }}
            >
              <Text style={{ fontSize: 20, textAlign: 'center' }}>
                R. José Bongiovani 259 - Pres. Prudente - SP - 19050-050 -
                Brasil
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 30, paddingHorizontal: 5 }}>
            {coment} Comentários
          </Text>
          <TouchableNativeFeedback onPress={handleLike}>
            <View style={{ flexDirection: 'column', paddingHorizontal: 20 }}>
              <AntDesign name="like1" size={50} color="black" />
              <Text style={{ fontSize: 30 }}>{like}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </ScrollView>
  );
};

export default Post;

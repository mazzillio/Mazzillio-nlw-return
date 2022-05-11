import React from 'react';
import { View ,Text} from 'react-native';

import { styles } from './styles';

export function Copyright() {
  return (
    <View >
      <Text style={styles.text}>Minha primeira aplicação feita em RN por Mattheus Mazzillio mentorado pela rocketseat</Text>
    </View>
  );
}
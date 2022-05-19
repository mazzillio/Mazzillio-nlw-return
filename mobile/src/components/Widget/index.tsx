import React, {useRef} from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import { styles } from './styles';
import { theme } from '../../theme';
import BottomSheet from '@gorhom/bottom-sheet';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler'
import { Options } from '../Options';
import { Form } from '../Form';
import { feedbackTypes } from '../../utils/feedbackTypes';
export type FeedbackType = keyof typeof feedbackTypes;
function Widget(){
    const bootomCheetRef = useRef<BottomSheet>(null)
    const handleOpen=()=>{
        bootomCheetRef.current?.expand()
    }
    return (
    <>
        <TouchableOpacity style={styles.button} onPress={handleOpen}>
            <ChatTeardropDots 
                size={24}
                weight="bold"
                color={theme.colors.text_on_brand_color}
            />
        </TouchableOpacity>
        <BottomSheet ref={bootomCheetRef}
          snapPoints={[1,280]}
          backgroundStyle={styles.modal}
          handleIndicatorStyle={styles.indicator}  
        >
        <Form
            feedbackType='OTHER'
        />
        </BottomSheet>
    </>
  );
}
export default gestureHandlerRootHOC (Widget)
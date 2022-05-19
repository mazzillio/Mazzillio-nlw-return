import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { captureScreen } from 'react-native-view-shot'
import { styles } from './styles';
import { FeedbackType } from '../Widget';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { feedbackTypes } from '../../utils/feedbackTypes'
import { api } from '../../libs/api';
import * as FileSystem from 'expo-file-system'
interface FormProps {
    feedbackType: FeedbackType
    onFeedbackCanceled: () => void
    onFeedbackSent: () => void
}
export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: FormProps) {
    const feedbackTypeInfo = feedbackTypes[feedbackType]
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [isSeending, setIsSeending] = useState(false)
    const [comment, setComment] = useState("")
    function handleSreenshoot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8
        }).then(uri => setScreenshot(uri))
            .catch(err => console.error('erro na imagem', err))
    }
    function handleSreenshootRemove() {
        setScreenshot(null)
    }
    async function handleSendFeedback() {
        if (isSeending) {
            return
        }
        setIsSeending(true)

        const foto = screenshot && FileSystem.readAsStringAsync(screenshot,{encoding:'base64'})
        try {
            await api.post('/feedbacks', {
                type: feedbackType,
                screenshot,
                comment:`data:image/png;base64, ${foto}`
            })
            onFeedbackSent()
        } catch (err) {
            console.error(err)
            setIsSeending(false)
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackCanceled}>
                    <ArrowLeft
                        size={24}
                        weight='bold'
                        color={theme.colors.text_secondary}
                    />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Image
                        source={feedbackTypeInfo.image}
                        style={styles.image}
                    />
                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>
                </View>
            </View>
            <TextInput
                multiline
                style={styles.input}
                placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo"
                placeholderTextColor={theme.colors.text_secondary}
                autoCorrect={false}
                onChangeText={setComment}
            />
            <View style={styles.footer}>
                <ScreenshotButton
                    onTakeShot={handleSreenshoot}
                    onRemoveShot={handleSreenshootRemove}
                    screenshot={screenshot}
                />
                <Button isLoading={isSeending} onPress={handleSendFeedback} />
            </View>
        </View>
    );
}
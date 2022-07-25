import { VStack } from 'native-base';
import {useState} from 'react';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native'

export function Register() {
  const [isLoading, setIsloading] = useState(false);
  const [departamet, setDepartamet] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation()

  function handleNewOrderRegister(){
    if(!departamet || !description){
     return Alert.alert('Registrar', 'Preencha todos os campos')
    }

    setIsloading(true);

    firestore()
    .collection('orders')
    .add({
      departamet,
      description,
      status:'open',
      created_at:firestore.FieldValue.serverTimestamp()
    })
    .then(() =>{
      Alert.alert('Solicitação', 'Solicitação registrada com sucesso')
      navigation.goBack();
    })
    .catch((error)=>{
      console.log(error)
      setIsloading(false)
      return Alert.alert('Solicitação', 'Não foi possivel registrar o pedido')
    })
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
        <Header title="Nova solicitação"/>

        
        <Input
            placeholder="Departamento"
            mt={4}
            onChangeText={setDepartamet}
        />
        
        <Input
            placeholder="Descrição do problema"
            flex={1}
            mt={5}
            multiline
            textAlignVertical='top'
            onChangeText={setDescription}
        />

        <Button
            title="Cadastrar"
            mt={5}
            isLoading={isLoading}
            onPress={handleNewOrderRegister}
        />
    </VStack>
  );
}
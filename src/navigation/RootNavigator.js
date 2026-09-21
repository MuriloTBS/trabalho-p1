import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommentsScreen from '../screens/CommentsScreen';
import LoginScreen from '../screens/LoginScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import MainTabs from './MainTabs';

const Stack = createNativeStackNavigator();

// Navegação principal: Login -> Main (abas) -> Detalhe da publicação / Comentários
export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{ title: 'Publicação' }} />
        <Stack.Screen name="Comments" component={CommentsScreen} options={{ title: 'Comentários' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

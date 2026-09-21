import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ActivityScreen from '../screens/ActivityScreen';
import FeedScreen from '../screens/FeedScreen';
import NewPostScreen from '../screens/NewPostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import { currentUser } from '../data/users';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

// Ícone de cada aba: [ativo, inativo]
const TAB_ICONS = {
  Feed: ['home', 'home-outline'],
  Search: ['search', 'search-outline'],
  NewPost: ['add-circle', 'add-circle-outline'],
  Activity: ['heart', 'heart-outline'],
  Profile: ['person', 'person-outline'],
};

// Barra de abas inferior: Feed, Busca, Nova publicação, Atividade e Perfil
export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarIcon: ({ focused }) => {
          const [active, inactive] = TAB_ICONS[route.name];
          return <Ionicons name={focused ? active : inactive} size={26} color={colors.text} />;
        },
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name="NewPost" component={NewPostScreen} options={{ title: 'Nova publicação' }} />
      <Tab.Screen name="Activity" component={ActivityScreen} options={{ title: 'Atividade' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: currentUser.username }} />
    </Tab.Navigator>
  );
}

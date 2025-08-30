import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginMenu from '@/components/LoginMenu';
import RegisterMenu from '@/components/RegisterMenu';
import MainMenu from '@/components/MainMenu';
import UserDashboard from '@/components/UserDashboard';
import LoadingScreen from '@/components/LoadingScreen';
// import DashboardWithCharts from '@/components/DashboardWithCharts';
import Panel from '@/components/Panel';

const Stack = createNativeStackNavigator();

function WithPanel(Component) {
  const ComponentWithPanel = ({ navigation }) => {
    return <Panel navigation={navigation} mainView={(<Component/>)}/>;
  };

  return ComponentWithPanel;
}

export default function MenusManagement() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ animation: 'none', headerShown: false }}>
          <Stack.Screen name="MainMenu" component={MainMenu}/>
          <Stack.Screen name="UserDashboard" component={WithPanel(UserDashboard)}/>
          <Stack.Screen name="Loading" component={LoadingScreen}/>
          <Stack.Screen name="Login" component={LoginMenu}/>
          <Stack.Screen name="Register" component={RegisterMenu}/>
          {/* <Stack.Screen name="DashboardWithCharts" component={WithPanel(DashboardWithCharts)}/> */}
        </Stack.Navigator>
      </NavigationContainer>

  );
}

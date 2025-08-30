import { ContextManager } from '@/components/ContexManager';
import { ColorPickerProvider } from '@/components/ColorPickerContext';
import { DatePickerProvider } from '@/components/DatePickerContext';
import { TimePickerProvider } from '@/components/TimePickerContext';
import { UserProvider } from '@/components/UserContext';
import { AddUserToChartProvider} from '@/components/AddUserToChartBoxContext';

import MenusManagement from '@/components/MenusManagement';



export default function App() {

  return (
      <ContextManager contexts={[DatePickerProvider, TimePickerProvider, UserProvider, ColorPickerProvider, AddUserToChartProvider]}>
        <MenusManagement/>
      </ContextManager>

    // <ContextManager contexts={[AddUserToChartProvider, ColorPickerProvider]}>
    //   <View>
    //     <List/>
    //   </View> 
    // </ContextManager>

  );
}



// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// export default function App() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <ReorderList />
//     </GestureHandlerRootView>
//   );
// }


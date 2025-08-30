import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import DashboardList from '@/components/DashboardList';
import ListScroll from '@/components/ListScroll';
import AddDatetimeWidget from '@/components/AddDatetimeWidget';
// import AINotesBox from '@/components/AINotesBox';
import ListSanbox from '@/components/Chart';

import { useUser } from '@/components/UserContext';
import { useColorPicker } from '@/components/ColorPickerContext';

import { 
  addDatetime, createDatetimeForList, deleteDatetime, addSleepSatisfaction, 
  createDatetimesForList,//generateNote
} from '@/components/Backend';


export default function UserDashboard({ navigation }) {
  const [listWakeUpDates, updateListWakeUpDates] = useState([]);
  const [listSleepDates, updateListSleepDates] = useState([]);

  // const [AINote, setAINote] = useState(null);

  const { id: userId } = useUser();

  const { openColorPicker, colorPickerData } = useColorPicker();


  useEffect(() => {
    if (!userId) return;

    createDatetimesForList(userId, 'wakeup', dates => updateListWakeUpDates(dates));
    createDatetimesForList(userId, 'sleeptime', dates => updateListSleepDates(dates));
  }, [userId]);


  const onNewDate = (data) => {
    const { datetime, type, sleepSatisfactionPercent } = data;

    addDatetime(userId, datetime, type, data => {
      if (type === 'wakeup') {
        createDatetimeForList(data.id, datetime => updateListWakeUpDates(previous => [...previous, datetime]));
      }

      if (type === 'sleeptime') {
        createDatetimeForList(data.id, datetime => updateListSleepDates(previous => [...previous, datetime]));
      }

      if (sleepSatisfactionPercent) {
        addSleepSatisfaction(data.id, sleepSatisfactionPercent);
      }
    });

    //generateNote(userName, type, datetime, setAINote);

    // refresh button active more grey 
    // when all is synced button should have more opacity
  };


  const deleteFromWakeupList = (index) => {
    deleteDatetime(listWakeUpDates[index].id, _ => updateListWakeUpDates(previous => [...previous.slice(0, index), ...previous.slice(index + 1)]));
  };

  const deleteFromSleeptimeList = (index) => {
    deleteDatetime(listSleepDates[index].id, _ => updateListSleepDates(previous => [...previous.slice(0, index), ...previous.slice(index + 1)]));
  };

  const components = [
    <Text style={styles.header}>What time did you wake up today?</Text>,

    <AddDatetimeWidget 
      addData={onNewDate}
      typeWithLessItems={listWakeUpDates.length < listSleepDates.length ? 'wakeup' : 'sleeptime'}
    />,
    // [AINote && <AI_Rect message={AINote} onDiscard={() => setAINote(null)}/>],
    <View style={styles.row}>
      <ListScroll
        title="Sleeptime"
        data={listSleepDates}
        onDelete={deleteFromSleeptimeList}
      />
      <ListScroll 
        title="Wake-up"
        data={listWakeUpDates}
        onDelete={deleteFromWakeupList}
      />
    </View>,

    <ListSanbox/>,

    // <View style={{ borderWidth: 1, backgroundColor: '#697786ff', borderRadius: 8 }}>
    //   <TouchableOpacity onPress={updateChart}>
    //     <View>
    //       <Text style={{ fontSize: 20, textAlign: 'center' }}>Refresh chart</Text>
    //     </View>
    //   </TouchableOpacity>
    // </View>,

    <View style={{ borderWidth: 1, backgroundColor: colorPickerData ? colorPickerData : '#697786ff', borderRadius: 8 }}>
      <TouchableOpacity onPress={openColorPicker}>
        <View>
          <Text style={{ fontSize: 20, textAlign: 'center' }}>Show color picker</Text>
        </View>
      </TouchableOpacity>
    </View>
  ];

  return <DashboardList components={components}/>;
}

const styles = StyleSheet.create({
  header: {
    fontFamily: 'monospace',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingHorizontal: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
});
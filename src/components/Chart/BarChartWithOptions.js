import { Animated, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useEffect, useMemo, useState } from "react";

import { useAddUserToChartContext } from '@/components/AddUserToChartBoxContext';
import { useColorPicker } from "@/components/ColorPickerContext";
import { createChartDataForUsers  } from '@/components/Backend';
import { useUser } from '@/components/UserContext';

import ChartSandbox from '@/components/Chart/BarChart';
import ExpandableList from '@/components/Chart/ExpandableList';
import ColorPreview from '@/components/Chart/ColorPreview';

import AntDesign from '@expo/vector-icons/AntDesign';
import OptionsList from "./OptionsList";


function generateInt(a, b) {
  return Math.round(Math.random() * (b - a) + a);
}

function generateHexColor() {
  return '#' + Array(3).fill(null).map(_ => generateInt(0, 255).toString(16).padStart(2, '0')).join('');
} 


function updateUserOptions(options) {

}

function AddButton ({ onPress }) {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View
        style={{
        flex: 1,
        borderRadius: 8,
        borderWidth: 2,
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#4b9449ff',
        gap: 7
      }}>
        <AntDesign name="adduser" size={24} color="black" />
        <Text style={{ fontSize: 20, fontFamily: 'monospace' }}>Add user</Text>   
      </View>
  </TouchableOpacity>
  );
}

function createDataFromUsers(users) {
  return users.map(user => {
    return {
      userName: user.name,
      userId: user.id,
      hexColor: generateHexColor(),
      isActive: false
    }
  });
}

function PreviewColorsList({ onChange }) {
  const [items, setItems] = useState([]);
  
  const names = useMemo(() => {
    return items.map(user => user.userName);
  }, [items]);

  const [currentColorIndex, setCurrentColorIndex] = useState(-1);

  useEffect(() => {
    onChange(items.filter(item => item.isActive));
  }, [items]);

  const maxNameLength = useMemo(() => {
    return Math.max(...items.map(item => item.userName.length));
  }, [items]);

  const { open: openAddBox, data: addBoxData } = useAddUserToChartContext();
  const { open: openColorPicker, data: colorPickerData } = useColorPicker();

  const deleteItem = (item, index) => {
    setItems(previous => [...previous.slice(0, index), ...previous.slice(index + 1)]);
  };

  
  const onColorPress = (index) => {
    openColorPicker();
    setCurrentColorIndex(index);
  };

  useEffect(() => {
    if (!colorPickerData || currentColorIndex === -1) return;

    setItems(previous => [
        ...previous.slice(0, currentColorIndex), 
        {...previous[currentColorIndex], hexColor: colorPickerData }, 
        ...previous.slice(currentColorIndex + 1)
      ]
    );    
  }, [colorPickerData])

  const setIsActive = (index, value) => {
    setItems(previous => [
        ...previous.slice(0, index), 
        {...previous[index], isActive: value }, 
        ...previous.slice(index + 1)
      ]
    );
  };

  useEffect(() => {
    if (!addBoxData) return;

    const newUsers = createDataFromUsers(addBoxData.filter(item => !names.includes(item.name)));

    if (!newUsers) return;

    setItems(previous => [...previous, ...newUsers]);
  }, [addBoxData]);

  const onAddUser = () => {
    openAddBox();
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column', gap: 10 }}>
      <AddButton onPress={onAddUser}/>
      {items.map((item, index) => {
        return (
          <ColorPreview 
            key={index} 
            userName={item.userName.padEnd(maxNameLength, ' ')} 
            hexColor={item.hexColor} 
            onDelete={() => deleteItem(item, index)} 
            onColorPress={() => onColorPress(index)}
            isActive={item.isActive}
            setIsActive={(value) => setIsActive(index, value)}
          />
        );
      })}
    </View>
  );
}



export default function Chart () {
  const { id: userId, loading: isUserLoading } = useUser();

  const [data, setData] = useState([]);
  const [activeIds, setActiveIds] = useState([]);
  const [colors, setColors] = useState([]);

  const chartsNumber = useMemo(() => {
    return activeIds.length;
  }, [activeIds]);

  const chartValuesNumber = useMemo(() => {
    return data.length;
  }, [data]);

  useEffect(() => {
    if (isUserLoading) return;

    setActiveIds([userId]);
    setColors(['#fff']);
  }, [isUserLoading]);


  useEffect(() => {
    if (!activeIds || activeIds.length === 0) return;
    createChartDataForUsers(activeIds.toString(), 'H', 1, data => setData(data)); 
  }, [activeIds])

  const onActiveUsers = (items) => {
    if (isUserLoading) return;

    setActiveIds([userId, ...items.map(item => item.userId)]);
    setColors(['#fff', ...items.map(user => user.hexColor)]);  
  }


  const maxValue = Math.max(...data.map(group => Math.max(...group.other.map(item => item.value))));

	const settings = {
		colors: colors,
		chartsNumber: chartsNumber,
		chartValuesNumber: chartValuesNumber,
		maxValue: maxValue,
		backgroundColor: '#afb0b6ff',
		chartHeight: 150,
		contentWidthPadding: 10,
		labelFontSize: 11,
		labelFontFamily: 'monospace',
		fontSize: 14,
		fontFamily: 'monospace',
		fontWeight: 'bold',
		barWidth: 30,
		barRadius: 5,
		barBorderWidth: 1,
		barSpacing: 7,
		barGroupSpacing: 11,
		isBarColorGradient: false,
		barColor: '#365b52ff',
		extraBarColor: '#7cbdadff',
		minBarHeight: 0.0001,
		barValuePadding: 11,
		labelPadding: 15,
		labelColor: '#000000ff',
		emoticonVisible: true,
    emoticonGap: 8,
    satisfactionVisible: true,
    satisfactionGap: 4,

    fromColor: 'rgba(73, 164, 149, 1)',
		toColor: 'rgb(0,102,84)',

		get emoticonPadding() {
			return this.emoticonVisible ? 50 : 0;
		},
		get emoticonWidth() {
			return this.barWidth * 1.1;
		},
		get emoticonHeight() {
			return this.barWidth * 1.1;
		},
		get satisfactionPadding() {
			return this.satisfactionVisible ? 25 : 0;
		},
		get fixedChartHeight() {
			return this.chartHeight + this.labelPadding + this.barValuePadding + this.emoticonPadding + this.satisfactionPadding;
		},
		get contentWidth() {
			return 2*this.contentWidthPadding + 
				(this.chartValuesNumber - 1) * this.barGroupSpacing + 
				this.chartValuesNumber * this.chartsNumber * (this.barSpacing + this.barWidth);
		},
		get maxBarHeight() {
			return this.chartHeight - this.barValuePadding - this.labelPadding;
		},
	};

  return (
    <Animated.View style={styles.container}>
      <ChartSandbox data={data} settings={settings}/>

      <ExpandableList title={'Users'}>
        <PreviewColorsList onChange={onActiveUsers}/>
      </ExpandableList>

      <ExpandableList title={'Options'}>
        <OptionsList onChange={x => {}}/>
      </ExpandableList>

    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#afb0b6",
    overflow: "hidden",
    elevation: 2,
    borderRadius: 10,
		borderWidth: 2,
		borderColor: 'black',
  },
});
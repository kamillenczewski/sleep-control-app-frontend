import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ButtonsSwitch from '@/components/ButtonsSwitch';
import InputMask from '@/components/InputMask';
import ButtonWidget from '@/components/ButtonWidget';
import BatteryBar from '@/components/BatteryBar';

import { useTimePicker } from '@/components/TimePickerContext';
import { useDatePicker } from '@/components/DatePickerContext';	

import { createStatement } from '@/components/CreateValidationStatement';



function createDatetime(day, month, year, hour, minute, seconds='00') {
	day = day.toString().padStart(2, '0');
	month = month.toString().padStart(2, '0');
	year = year.toString().padStart(4, '0');

	hour = hour.toString().padStart(2, '0');
	minute = minute.toString().padStart(2, '0');
	seconds = seconds.toString().padStart(2, '0');

	return `${day}/${month}/${year} ${hour}:${minute}:${seconds}`;
}


const emoticonTypes = [
	'emoticon-dead-outline',
	'emoticon-confused-outline',
	'emoticon-sad-outline',
	'emoticon-neutral-outline',
	'emoticon-outline',
	'emoticon-cool-outline'
];

function TextsColumn({ texts, visibility }) {
	const maxLength = Math.max(...texts.map(text => text.length));

	return (
		<View style={styles.textsColumn}>
			{Array(Math.min(texts.length, visibility.length))
				.fill(null)
				.filter((_, index) => visibility[index])
				.map((_, index) => {
				return (
						<View key={index} style={{ flex: 1, justifyContent: 'center' }}>
							<Text style={styles.text}>{texts[index].padEnd(maxLength, ' ')}</Text>
						</View>
					);
				})
			}
		</View>
	);
}


function Rows({ items }) {
	const maxLength = Math.max(...items.map(item => item.description.length));

	return (
		<View style={{ flexDirection: 'column', gap: 10, borderColor: '#8e898982', padding: 12 }}>
			{items.filter(item => item.isActive).map((item, index) => {
				return (
					<View key={index} style={{ justifyContent: 'space-between', flexDirection: 'row', gap: 4 }}>
						<Text style={{ fontFamily: 'monospace', fontSize: 15, alignSelf: 'center', justifyContent: 'center' }}>
							{item.description.padEnd(maxLength, ' ')}
						</Text>
						{item.component}
					</View>
				);
			})}
		</View>
	);
}


export default function AddDatetimeWidget({ addData }) {
	const [day, setDay] = useState('');
	const [month, setMonth] = useState('');
	const [year, setYear] = useState('');

	const [hour, setHour] = useState('');
	const [minute, setMinute] = useState('');
	const [second, setSecond] = useState('');

	const [dateType, setDateType] = useState('sleeptime');

	const [statement, setStatement] = useState('');

	const { open: openTimePicker, data: timePickerData } = useTimePicker();
	const { open: openDatePicker, data: datePickerData } = useDatePicker();

	const [percent, setPercent] = useState(50);

	useEffect(() => {
		if (!datePickerData) return;

		const { year, month, day } = datePickerData;

		setDay(day.toString().padStart(2, '0'));
		setMonth(month.toString().padStart(2, '0'));
		setYear(year.toString().padStart(4, '0'));
	}, [datePickerData]);

	useEffect(() => {
		if (!timePickerData) return;

		const { hour, minute, second } = timePickerData;

		setHour(hour.toString().padStart(2, '0'));
		setMinute(minute.toString().padStart(2, '0'));
		setSecond(second.toString().padStart(2, '0'));
	}, [timePickerData]);

	const onButtonPress = () => {
		setStatement(createStatement(day, month, year, hour, minute, second));
		
		addData({ 
			datetime: createDatetime(day, month, year, hour, minute), 
			type: dateType,
			sleepSatisfactionPercent: dateType === 'wakeup' ? percent : null
		});
	};

	const [focusedIndex, setFocusedIndex] = useState(0);

	const onDateInputCompleted = () => {
		setFocusedIndex(1);
	};

	const onClockPress = () => {
		openTimePicker();
	};

	const onCalenderPress = () => {
		openDatePicker();
	};

	const getEmoticon = () => {
		return emoticonTypes[Math.round(percent / 100 * (emoticonTypes.length - 1))];
	};
 
	// const [isRegular, setIsRegular] = useState(true);

	// const napOrRegularButtonsSwitch = (
	// 	<ButtonsSwitch
	// 		names={['Regular', 'Nap']}
	// 		defaultActiveIndex={isRegular ? 0 : 1}
	// 		onChangeMethods={[() => setIsRegular(false), () => setIsRegular(true)]}
	// 		color='#a89696ff'
	// 	/>
	// );

	const buttonsSwitch = (
		<ButtonsSwitch
			names={['Sleeptime', 'Wake-up']}
			onChangeMethods={[() => setDateType('sleeptime'), () => setDateType('wakeup')]}
			color='#a89696ff'
		/>
	);
	
	const datePlaceholder = (
		<View style={{ flex: 1, flexDirection: 'row', gap: 5 }}>
			<InputMask 
				placeholders={['DD', 'MM', 'YYYY']} 
				values={[day, month, year]}
				updateMethods={[setDay, setMonth, setYear]}
				onLastInputCompleted={onDateInputCompleted}
				isFocused={focusedIndex === 0}
			/>
			<View style={{ alignSelf: 'center', justifyContent: 'center'  }}>
				<TouchableOpacity onPress={onCalenderPress}>
					<MaterialCommunityIcons name="calendar" size={40} color="#b0a4a4ff" />
					</TouchableOpacity>
			</View>
		</View>
	);

	const timePlaceholder = (
		<View style={{ flex: 1, flexDirection: 'row', gap: 5 }}>
			<InputMask 
				placeholders={['HH', 'MM', 'SS']} 
				values={[hour, minute]}
				updateMethods={[setHour, setMinute, setSecond]}
				isFocused={focusedIndex === 1}
			/>
				<View style={{ alignSelf: 'center', justifyContent: 'center' }}>
					<TouchableOpacity onPress={onClockPress}>
						<MaterialCommunityIcons name="clock-outline" size={40} color="#b0a4a4ff" />
					</TouchableOpacity>
				</View>
		</View>
	);

	const satisfactionBar = (
		<View key="features" style={{ flex: 1, flexDirection: 'row', gap: 5 }}>
			<BatteryBar percent={percent} setPercent={setPercent}/>
				<View style={{ alignSelf: 'center', justifyContent: 'center'  }}>
					<MaterialCommunityIcons name={getEmoticon()} size={40} color="#b0a4a4ff" />
				</View>
		</View>
	);

  return (
    <View style={{ flexDirection: 'column', gap: 5, padding: 3, borderWidth: 1, borderRadius: 10  }}> 
			<Rows 
				key="rows"
				items={[
					// { description: 'Sleep type:', component: napOrRegularButtonsSwitch, isActive: true },
					{ description: 'Date type:', component: buttonsSwitch, isActive: true },
					{ description: 'Time:', component: timePlaceholder, isActive: true },
					{ description: 'Date:', component: datePlaceholder, isActive: true },
					{ description: 'Satisfaction:', component: satisfactionBar, isActive: dateType === 'wakeup' },
				]}
			/>
		
			{[statement.length > 0 && 
				<Text key="statement" style={styles.statement}>{statement}</Text>
			]}

			<View key="add-button" style={styles.addDateButton}>
				<ButtonWidget title="Add" onPress={onButtonPress} />
			</View>

    </View>
  );
};

const styles = StyleSheet.create({
  addDateButton: {
		flex: 1,
		flexDirection: 'row',
		gap: 16,
  },
	statement: {
    color:  '#3d5e7dff',
    marginBottom: 5,
    padding: 5,
    fontWeight: 'bold',
  },
	text: { 
		fontFamily: 'monospace', 
		alignSelf: 'left',
	},
	textView: {
		flex: 1,
		justifyContent: 'center',
	},
	textsColumn: { 
		flexDirection: 'column', 
		justifyContent: 'center',
	}
});
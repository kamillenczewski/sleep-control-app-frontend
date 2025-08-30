import React from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import Svg, { Text, G, Defs, LinearGradient, Stop  } from 'react-native-svg';

import RoundedRect from '@/components/RoundedRect';

import DeadEmoticon from "@/assets/emoticons/dead.svg";
import BagsUnderEyesEmoticon from "@/assets/emoticons/bags-under-eyes.svg";
import WoozyEmoticon from "@/assets/emoticons/woozy.svg";
import SadEmoticon from "@/assets/emoticons/sad.svg";
import NeutralEmoticon from "@/assets/emoticons/neutral.svg";
import RelievedEmoticon from "@/assets/emoticons/relieved.svg";
import SmillingEmoticon from "@/assets/emoticons/smilling.svg";
import GrinningEmoticon from "@/assets/emoticons/grinning.svg";
import SunglassesEmoticon from "@/assets/emoticons/sunglasses.svg";


const emoticonTypes = [
	DeadEmoticon,
	BagsUnderEyesEmoticon,
	WoozyEmoticon,
	SadEmoticon,
	NeutralEmoticon,
	RelievedEmoticon,
	SmillingEmoticon,
	GrinningEmoticon,
	SunglassesEmoticon
];


function getEmoticon(settings, percent) {
	const { emoticonWidth, emoticonHeight } = settings;
	const Component = emoticonTypes[Math.round(percent / 100 * (emoticonTypes.length - 1))];
	return <Component width={emoticonWidth} height={emoticonHeight} fill='blue'/>
}

const lerp = (start, end, alpha) => Math.round(start + (end - start) * alpha);

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

function hexToRgb(hex) {
  return hex.slice(1).match(/.{1,2}/g).map(hexPart => parseInt(hexPart, 16));
}

function randomInt(a, b) {
	return Math.random() * (b - a) + a;
}

const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ';
const uuidLength = 20;

function generateUUID(specialText='') {
	specialText = specialText.toString();
	
	const uuid = 
		specialText + 
		(specialText.length > 0 ? '-' : '') + 
		Array(uuidLength)
			.fill(null)
			.map(_ => chars.at(randomInt(0, chars.length - 1)))
			.join('');

	return uuid;
}

function getSatisfactionPercentColor(percent) {
	const startColor = hexToRgb('#c35526ff');
	const endColor = hexToRgb('#28c020ff');
	
  const t = Math.max(0, Math.min(1, percent / 100));

  const r = lerp(startColor[0], endColor[0], t);
  const g = lerp(startColor[1], endColor[1], t);
  const b = lerp(startColor[2], endColor[2], t);

  const fill = rgbToHex(r, g, b);

	return fill;
}



function BarComposition(settings, item, index) {
	const { maxBarHeight, colors, maxValue, chartsNumber, extraBarColor, barSpacing, chartHeight, contentWidthPadding, labelFontSize, labelFontFamily, fontSize, fontFamily, fontWeight, barWidth, barRadius, barBorderWidth, barGroupSpacing, isBarColorGradient, barColor, minBarHeight, barValuePadding, labelPadding, labelColor, emoticonVisible, emoticonGap, emoticonWidth, emoticonHeight, satisfactionVisible, satisfactionGap, fromColor, toColor } = settings;

	const value = item.value ? item.value : 0;
	const preBarHeight = maxBarHeight * value / maxValue;
	const barHeight = preBarHeight <= 0 || !preBarHeight ? minBarHeight : preBarHeight;

	const extraValue = item.extraValue && item.extraValue > 3 ? item.extraValue : 0;
	const preExtraBarHeight = maxBarHeight * extraValue / maxValue;
	const extraBarHeight = preExtraBarHeight <= 0 || !preExtraBarHeight ? 0 : preExtraBarHeight;

	const valueInGroupIndex = index % chartsNumber;
	const groupIndex = parseInt((index - valueInGroupIndex) / chartsNumber);

	const xExtraBar = contentWidthPadding + groupIndex * barGroupSpacing + index * (barSpacing + barWidth);
	const yExtraBar = chartHeight - (extraBarHeight + barHeight);

	const xBar = xExtraBar;
	const yBar = yExtraBar + extraBarHeight;


	const xBarCenter = xBar + barWidth / 2;

	const xValue = xBarCenter;
	const yValue = yExtraBar - barValuePadding;

	const xLabel = xBarCenter;
	const yLabel = yBar + barHeight + labelPadding;

	const xEmoticon = xBarCenter - emoticonWidth / 2;
	const yEmoticon = yLabel + emoticonGap;

	const xSatisfaction = xBarCenter;
	const ySatisfaction = yEmoticon + emoticonHeight + fontSize + satisfactionGap;

	return (
		<React.Fragment key={index}>
			<Defs key={generateUUID()}>
        <LinearGradient id="grad" x1="0%" y1="15%" x2="20%" y2="40%">
          <Stop offset="0" stopColor={fromColor}/>
          <Stop offset="1" stopColor={toColor}/>
        </LinearGradient>
      </Defs>

			{/* <RoundedRect 
				key={11}
				x={xExtraBar}
				y={yExtraBar}
				width={barWidth}
				height={extraBarHeight}
				fill={valueInGroupIndex === 0 ? barColor : (valueInGroupIndex === 1 ? '#962a70ff': '#9d9e68ff')}
				opacity={0.7}
				strokeWidth={extraValue === 0 ? 0 : barBorderWidth}
				radiusTopLeft={barRadius}
				radiusTopRight={barRadius}
				strokeWidthTop={1}
				strokeWidthRight={1}
				strokeWidthBottom={0}
				strokeWidthLeft={1}
			/> */}

			<RoundedRect 
				key={generateUUID()}
				x={xBar}
				y={yBar}
				width={barWidth}
				height={barHeight}
				opacity="0.1"
				fill={colors[valueInGroupIndex]}
				strokeWidth={barBorderWidth}
				radiusBottomLeft={barRadius}
				radiusBottomRight={barRadius}
				radiusTopLeft={extraValue === 0 ? barRadius : 0}
				radiusTopRight={extraValue === 0 ? barRadius : 0}
				strokeWidthTop={0}
				strokeWidthRight={1}
				strokeWidthBottom={1}
				strokeWidthLeft={1}
			/>

			<Text 
				key={generateUUID()} 
				x={xValue} 
				y={yValue} 
				fontFamily={fontFamily} 
				fontWeight={fontWeight} 
				fontSize={fontSize} 
				fill={labelColor} 
				textAnchor="middle"
			>
				{value + extraValue}
			</Text>
						
								
			{[emoticonVisible && 
				<G 
					key={generateUUID()} 
					x={xEmoticon} 
					y={yEmoticon}
				>
          {getEmoticon(settings, item.satisfactionPercent)}
				</G>
			]}

			{satisfactionVisible && 
				<Text 
					key={generateUUID()} 
					strokeWidth={0} 
					x={xSatisfaction} 
					y={ySatisfaction} 
					fontFamily={fontFamily} 
					fontWeight={fontWeight} 
					fontSize={fontSize + 3} 
					fill={getSatisfactionPercentColor(item.satisfactionPercent)} 
					textAnchor="middle"
				>
					{item.satisfactionPercent}%
				</Text>
			}
		</React.Fragment>
	); 	
}





function BarsGroupComposition(settings, group, groupIndex) {
	const { barWidth, barGroupSpacing, contentWidthPadding, chartsNumber, labelFontFamily, labelFontSize, labelColor, chartHeight, labelPadding, barSpacing } = settings;

	const xLabel = 
		contentWidthPadding + 
		groupIndex * barGroupSpacing +  
		(barSpacing + barWidth)*(groupIndex * chartsNumber + (chartsNumber - 1) / 2);

	const yLabel = chartHeight + labelPadding;

	return (
		<G key={generateUUID(groupIndex)}>
			{group.other.map(item => BarComposition(settings, item, groupIndex * chartsNumber + item.userIndex))}
			<Text 
				x={xLabel} 
				y={yLabel} 
				fontFamily={labelFontFamily} 
				fontSize={labelFontSize} 
				fill={labelColor} 
			>
				{group.label}
			</Text>
		</G>
	);
}

export default function BarChart({ data, settings }) {
	const { width: fixedChartWidth } = useWindowDimensions();
	const { backgroundColor, fixedChartHeight, contentWidth } = settings;

	if (!data || data.length === 0) {
		return (
			<View 
				style={{ 
					width: fixedChartWidth, 
					height: fixedChartHeight, 
					backgroundColor: backgroundColor,
					borderWidth: 2, 
					borderRadius: 10,
					alignContent: 'center',
					justifyContent: 'center',
					alignSelf: 'center'
				}}>
				<Text style={{ 
						flex: 1, 
						textAlign: 'center', 
						alignContent: 'center', 
						fontFamily: 'monospace'
					}}
				>Waiting for your sleep time :)</Text>
			</View>
		)
	}

	return (
		<View
			style={{
				flexDirection: 'column',
				width: fixedChartWidth,
				height: fixedChartHeight,
				alignSelf: 'center',
				overflow: 'hidden',
				backgroundColor: backgroundColor,
				padding: 10
			}}
		>
			<ScrollView
        key={generateUUID()}
				horizontal
				style={{ flex: 1 }}
				contentContainerStyle={{ width: contentWidth }}
				showsHorizontalScrollIndicator={false}
			>
				<Svg key={generateUUID()} width={contentWidth} stroke='black' strokeWidth={1}>
					{data.map((group, groupIndex) => BarsGroupComposition(settings, group, groupIndex))}
				</Svg>
			</ScrollView>
		</View>
	);
}


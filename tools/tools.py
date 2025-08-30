class List(list):
	def __init__(self, items):
		super().__init__(items)

	def map(self, func):
		if isinstance(func, str):
			func = eval('lambda ' + func.replace('=>', ': ', 1))

		return List([func(item) for item in self])
	
	def first(self):
		return self[0] if self else None

text = """
const backgroundColor = '#afb0b6ff';
const chartHeight = 150;
const contentWidthPadding = 10;

const labelFontSize = 11;
const labelFontFamily = 'monospace';

const fontSize = 14;
const fontFamily = 'monospace';
const fontWeight = 'bold';

const barWidth = 30;
const barRadius = 5;
const barBorderWidth = 1;
const barSpacing = 9;
const isBarColorGradient = true;
const barColor = '#467a6d';
const extraBarColor = '#7cbdadff'
const minBarHeight = 0.0001;
const barValuePadding = 11;
const labelPadding = 15;
const labelColor = '#000000ff';

const emoticonVisible = true;
const emoticonPadding = emoticonVisible ? 40 : 0; // @compound
const emoticonGap = 8;
const emoticonWidth = barWidth * 1.1; // @compound
const emoticonHeight = barWidth * 1.1; // @compound

const satisfactionVisible = true;
const satisfactionPadding = satisfactionVisible ? 30 : 0; // @compound
const satisfactionGap = 4;

const fixedChartHeight = chartHeight + labelPadding + barValuePadding + emoticonPadding + satisfactionPadding; // @compound
const contentWidth = 2 * contentWidthPadding + data.length * (barWidth + barSpacing); // @compound

const fromColor = 'rgba(73, 164, 149, 1)';
const toColor = 'rgb(0,102,84)';
"""

def returnList(func):
	def _(*args, **kwargs):
		return list(func(*args, **kwargs))
	
	return _

@returnList
def normalizeText(text):
	for line in text.split('\n'):
		line = line.removeprefix('const')
		
		semicolonIndex = line.find(';')
		  
		if semicolonIndex == -1:
			continue

		tag = line[semicolonIndex + 1:].replace(' ', '').removeprefix('//@')
		
		line = line[:semicolonIndex]

		equalitySignIndex = line.find('=')

		if equalitySignIndex == -1:
			continue

		name = line[:equalitySignIndex].strip()
		value = line[equalitySignIndex + 1:].strip()

		yield name, value, tag


class SettingsComposer:
	def __init__(self):
		self.lines = ["const settings = {"]
		self.indentation = '  '

	def addBasic(self, name, value):
		self.lines.append(self.indentation + name + ': ' + value + ',')

	def addCompound(self, name, value):
		self.lines.append(self.indentation + 'get ' + name + '() {')
		self.lines.append(self.indentation*2 + 'return ' + value + ';')
		self.lines.append(self.indentation + '},')

	def composeFrom(self, preparedData):
		for name, value, tag in preparedData:
			if tag == 'compound':
				self.addCompound(name, value)
			else:
				self.addBasic(name, value)
		
		return self

	def build(self):
		self.lines.append('};') 
		return '\n'.join(self.lines)

def composeExtractionStatement(preparedData):
	return f'const {{{' ' + ', '.join(name for name, _, _ in preparedData) + ' '}}} = settings;'

preparedData = normalizeText(text)
settings = SettingsComposer().composeFrom(preparedData).build()
extractionStatement = composeExtractionStatement(preparedData)

print(extractionStatement)
from os import listdir
from os.path import isfile, join

count = 0

for fileName in listdir('src'):
    filePath = join('src', fileName)

    if not isfile(filePath) or not fileName.endswith('.js'):
        continue
    
    with open(filePath, 'r', encoding='utf-8') as file:
        print(filePath)
        count += len(file.readlines())

print(count)
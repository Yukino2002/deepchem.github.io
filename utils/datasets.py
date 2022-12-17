import os
import requests
from bs4 import BeautifulSoup
import subprocess

datasets = []

r = requests.get('https://github.com/deepchem/deepchem/tree/master/datasets')
datasetURL = 'https://raw.githubusercontent.com/deepchem/deepchem/master/datasets/'
soup = BeautifulSoup(r.content, 'html.parser')

fileNames = soup.find_all('a', attrs= {'class': 'js-navigation-open Link--primary'})
for fileName in fileNames:
    fileName = fileName.text
    if(fileName != '.gitignore'):
        datasets.append(fileName.replace(' ', '%20'))

os.makedirs('../deepchem/data/datasets')

for dataset in datasets:
    subprocess.call(f'curl -o ../deepchem/data/datasets/{dataset} {datasetURL + dataset}', shell=True)

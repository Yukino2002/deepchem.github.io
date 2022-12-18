import os
import requests
import json
import gzip
import shutil
from bs4 import BeautifulSoup
import urllib.request
import subprocess
import tarfile

dataLoaders = []
dataLoaderURLs = {}

r = requests.get('https://github.com/deepchem/deepchem/tree/master/deepchem/molnet/load_function')
URL = 'https://github.com/deepchem/deepchem/blob/master/deepchem/molnet/load_function/'
soup = BeautifulSoup(r.content, 'html.parser')

fileNames = soup.find_all('a', attrs= {'class': 'js-navigation-open Link--primary'})
for fileName in fileNames:
    fileName = fileName.text
    if(fileName.endswith('_datasets.py')):
        dataLoaders.append(fileName)

for i in range(len(dataLoaders)):
    index = dataLoaders[i].find('_')
    loaderURL = URL + dataLoaders[i]

    _r = requests.get(loaderURL)
    _soup = BeautifulSoup(_r.content, 'html.parser')
    _name = _soup.findAll('span', attrs= {'class': 'pl-s'})
    for _n in _name:
        _n = _n.text
        if(_n.startswith('"https://deepchemdata.s3-us-west-1.amazonaws.com/datasets/')):
            dataLoaderURLs[dataLoaders[i][:index]] = _n
            break

for dataset in dataLoaderURLs:
    print(dataset, dataLoaderURLs[dataset])

os.makedirs('../deepchem/data/dataLoaders')

for dataset in dataLoaderURLs:
    # get the dataset name
    index = dataLoaderURLs[dataset].find('datasets/')
    datasetName = dataLoaderURLs[dataset][index + 9:]
    # remove the double quotes
    datasetName = datasetName.replace('"', '')

    print(datasetName)
    if datasetName != '':
        subprocess.call(f'curl -o  ../deepchem/data/dataLoaders/{datasetName} {dataLoaderURLs[dataset]}', shell=True)

# list of datasets
subprocess.call(['ls', '../deepchem/data/dataLoaders/'])

os.makedirs('../deepchem/data/dataLoadersCSV')

fromPath = "../deepchem/data/dataLoaders/"
toPath = "../deepchem/data/dataLoadersCSV/"

fileNames = os.listdir(fromPath)

for fileName in fileNames:
    if fileName.endswith(".csv"):
        shutil.copyfile(fromPath + fileName, toPath + fileName)
    elif fileName.endswith(".pkl.gz") or fileName.endswith(".mat"):
        continue
    elif fileName.endswith(".tar.gz"):
        tar = tarfile.open(fileName, "r:gz")
        tar.extractall()
        tar.close()
        # shutil.move(fileName[:-7], toPath + fileName[:-7])
    elif fileName.endswith(".gz"):
        inFile = fromPath + fileName
        outfile = toPath + fileName[:-3]
        with gzip.open(inFile, 'rb') as f_in:
            with open (outfile, 'wb') as f_out:
                shutil.copyfileobj(f_in, f_out)
    else:
        continue

fileNames = os.listdir(toPath)
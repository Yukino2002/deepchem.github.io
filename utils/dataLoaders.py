import os
import gzip
import json
import shutil
import tarfile
import requests
import subprocess
import pandas as pd
from bs4 import BeautifulSoup


datasets = []
datasetURLs = {}
filteredDatasetURLs = {}
fromPath = "../deepchem/data/datasets/"
toPath = "../deepchem/data/datasetsCSV/"
finalPath = "../deepchem/data/datasetsJSON/"
os.makedirs(fromPath)
os.makedirs(toPath)
os.makedirs(finalPath)


# Scrape the datasets from the deepchem github repo for the dataset URLs

r = requests.get('https://github.com/deepchem/deepchem/tree/master/deepchem/molnet/load_function')
URL = 'https://github.com/deepchem/deepchem/blob/master/deepchem/molnet/load_function/'
soup = BeautifulSoup(r.content, 'html.parser')

fileNames = soup.find_all('a', attrs= {'class': 'js-navigation-open Link--primary'})
for fileName in fileNames:
    fileName = fileName.text
    if(fileName.endswith('_datasets.py')):
        datasets.append(fileName)

for i in range(len(datasets)):
    index = datasets[i].find('_')
    loaderURL = URL + datasets[i]

    _r = requests.get(loaderURL)
    _soup = BeautifulSoup(_r.content, 'html.parser')
    _name = _soup.findAll('span', attrs= {'class': 'pl-s'})
    for _n in _name:
        _n = _n.text
        if(_n.startswith('"https://deepchemdata.s3-us-west-1.amazonaws.com/datasets/')):
            _n = _n[1:-1]
            datasetURLs[datasets[i][:index]] = _n
            break


# Filter the scraped URLs

for dataset in datasetURLs:
    try:
        response = requests.head(datasetURLs[dataset])
        
        # Check if the URL is valid
        if response.status_code == 200:
            
            # Check if the URL is empty at the end
            index = datasetURLs[dataset].find('datasets/')
            datasetName = datasetURLs[dataset][index + 9:]
            if datasetName != '':

                # Set the URL to the filtered URLs
                filteredDatasetURLs[dataset] = datasetURLs[dataset]
        else:
            continue

    # If the URL is not valid, print the error
    except requests.ConnectionError as e:
        print(e)


# Download the datasets from the filtered URLs

for dataset in filteredDatasetURLs:
    # Get the dataset name from the URL
    index = filteredDatasetURLs[dataset].find('datasets/')
    datasetName = filteredDatasetURLs[dataset][index + 9:]
    
    # Replace the dataset name
    index = datasetName.find('.')
    datasetName = dataset + datasetName[index:]

    # Download the dataset
    subprocess.call(f'curl -o {fromPath}{datasetName} {filteredDatasetURLs[dataset]}', shell=True)

subprocess.call(['ls', '../deepchem/data/datasets/'])


















# fileNames = os.listdir(fromPath)

# for fileName in fileNames:
#     if fileName.endswith(".csv"):
#         shutil.copyfile(fromPath + fileName, toPath + fileName)
#     elif fileName.endswith(".pkl.gz"):
#         continue
#     # elif fileName.endswith(".tar.gz"):
#     #     tar = tarfile.open(fileName, "r:gz")
#     #     tar.extractall()
#     #     tar.close()
#         # shutil.move(fileName[:-7], toPath + fileName[:-7])
#     elif fileName.endswith(".gz"):
#         inFile = fromPath + fileName
#         outfile = toPath + fileName[:-3]
#         with gzip.open(inFile, 'rb') as f_in:
#             with open (outfile, 'wb') as f_out:
#                 shutil.copyfileobj(f_in, f_out)
#     else:
#         continue

# # subprocess.call(['ls', '../deepchem/data/datasetsCSV/'])

# fileNames = os.listdir(toPath)

# for i in range(len(fileNames)):
#     if fileNames[i].endswith('.sdf.csv'):
#         fileNames[i] = fileNames[i].replace('.sdf.csv', '')
#     elif fileNames[i].endswith('.csv'):
#         fileNames[i] = fileNames[i].replace('.csv', '')

# with open('../deepchem/data/datasets.json', 'w') as f:
#     f.write(json.dumps(fileNames, indent=4))

# fileNames = os.listdir(toPath)

# subprocess.call(['ls', '../deepchem/data/datasetsCSV/'])

# for fileName in fileNames:
#     if fileName.endswith(".tar"):
#         continue
#     file = toPath + fileName
#     df = pd.read_csv(file)
#     file = finalPath + fileName

#     jsonFile = df.iloc[0:5].to_json(orient='records')
#     with open(file[:-3] + 'json', 'w') as outfile:
#         outfile.write(jsonFile)

# subprocess.call(['ls', '../deepchem/data/datasetsJSON/'])
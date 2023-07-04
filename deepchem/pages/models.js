import React, {useEffect, useState} from 'react';

// import Image from 'next/image';

// import ModelCard from '/components/Models/ModelCard';
// import FilterButton from '/components/Models/FilterButton';

// import models from '/data/models/models.json';
// import backendList from '/data/models/backends.json';
// import typeList from '/data/models/types.json';
// import featurizerList from '/data/models/featurizers.json';

// import deepchemPyTorch from '/public/icons/deepchem-pytorch.png';
// import deepchemKeras from '/public/icons/deepchem-keras.png';
// import deepchemClassifier from '/public/icons/deepchem-classifier.png';
// import deepchemRegressor from '/public/icons/deepchem-regressor.png';
// import deepchemFilter from '/public/icons/deepchem-filter.png';

export default function Models() {
  // const [filteredModels, setFilteredModels] = useState(models);
  // const [backends, setBackends] = useState([]);
  // const [types, setTypes] = useState([]);
  // const [featurizers, setFeaturizers] = useState([]);
  // const [isPopUp, setIsPopUp] = useState(false);

  // const handleClick = (category, value) => {
  //   switch (category) {
  //     case 'backends':
  //               (backends.includes(value)) ? setBackends(backends.filter((item) => item !== value)) : setBackends([...backends, value]);
  //       break;
  //     case 'types':
  //               (types.includes(value)) ? setTypes(types.filter((item) => item !== value)) : setTypes([...types, value]);
  //       break;
  //     case 'featurizers':
  //               (featurizers.includes(value)) ? setFeaturizers(featurizers.filter((item) => item !== value)) : setFeaturizers([...featurizers, value]);
  //       break;
  //     case 'clear':
  //       setBackends([]);
  //       setTypes([]);
  //       setFeaturizers([]);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const handlePopUp = () => {
  //   setIsPopUp(!isPopUp);
  // };

  // useEffect(() => {
  //   let newmodels = []; const fmodels = models;
  //   if (backends.length === 0 && types.length === 0 && featurizers.length === 0) {
  //     newmodels = models;
  //   } else {
  //     fmodels.map((fmodel) => {
  //       let exist = 1;
  //       backends.map((value) => {
  //         if (!fmodel.backends.includes(value)) {
  //           exist = 0;
  //         }
  //       });

  //       types.map((value) => {
  //         if (!fmodel.types.includes(value)) {
  //           exist = 0;
  //         }
  //       });

  //       featurizers.map((value) => {
  //         if (!fmodel.featurizers.includes(value)) {
  //           exist = 0;
  //         }
  //       });

  //       if (exist == 1) {
  //         newmodels.push(fmodel);
  //       }
  //     });
  //   }

  //   setFilteredModels(newmodels);
  // }, [backends, types, featurizers]);

  // useEffect(() => {
  //   window.addEventListener('resize', () => {
  //     if (window.innerWidth > 1024) {
  //       setIsPopUp(false);
  //     }
  //   });
  // }, []);

  return (
    <>
     
    </>
  );
}

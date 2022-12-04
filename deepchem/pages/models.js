import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";

import ModelCard from "../components/Models/ModelCard";
import FilterButton from "../components/Models/FilterButton";

import deepchemPyTorch from "../public/icons/deepchem-pytorch.png";
import deepchemKeras from "../public/icons/deepchem-keras.png";
import deepchemClassifier from "../public/icons/deepchem-classifier.png";
import deepchemRegressor from "../public/icons/deepchem-regressor.png";

import models from "../data/models.json";

export default function Models() {
    const [filteredModels, setFilteredModels] = useState(models.models);
    const [backends, setBackends] = useState([]);
    const [types, setTypes] = useState([]);
    const [featurizers, setFeaturizers] = useState([]);

    const handleClick = (category, value) => {
        switch (category) {
            case "backends":
                (backends.includes(value)) ? setBackends(backends.filter((item) => item !== value)) : setBackends([...backends, value]);
                break;
            case "types":
                (types.includes(value)) ? setTypes(types.filter((item) => item !== value)) : setTypes([...types, value]);
                break;
            case "featurizers":
                (featurizers.includes(value)) ? setFeaturizers(featurizers.filter((item) => item !== value)) : setFeaturizers([...featurizers, value]);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        let newmodels = [], fmodels = models.models;
        if (backends.length === 0 && types.length === 0 && featurizers.length === 0) {
            newmodels = models.models;
        } else {
            fmodels.map(fmodel => {
                let exist = 1;
                backends.map(value => {
                    if(!fmodel.backends.includes(value)){
                        exist = 0;
                    }
                })

                types.map(value => {
                    if(!fmodel.types.includes(value)){
                        exist = 0;
                    }
                })

                featurizers.map(value => {
                    if(!fmodel.featurizers.includes(value)){
                        exist = 0;
                    }
                })
                
                if(exist == 1){
                    newmodels.push(fmodel);
                }
            })
        }

        setFilteredModels(newmodels);
    }, [backends, types, featurizers]);

    return (
        <>
            <div className="flex flex-col items-start md:px-72 md:py-16 gap-12">
                {/* HEADER BEGIN */}
                <div className="flex flex-row items-start py-2.5">
                    <p className="text-4xl">
                        Our Models
                    </p>
                </div>
                {/* HEADER END */}

                <div className="flex flex-row items-start gap-12">
                    {/* FILTER SECTION BEGIN */}
                    <div className="flex flex-col items-start gap-5 min-w-[30%]">

                        {/* BACKEND BEGIN */}
                        <div className="category-filter">
                            <p className="category-text-filter">
                                Backend
                            </p>
                            <div className="btn-container-filter">
                                <Button className="rmv-filter" onClick={() => {
                                    handleClick("backends", "PyTorch");
                                }}>
                                    <FilterButton category={backends} name={"PyTorch"} image={deepchemPyTorch} />
                                </Button>
                                <Button className="rmv-filter" onClick={() => {
                                    handleClick("backends", "Keras");
                                }}>
                                    <FilterButton category={backends} name={"Keras"} image={deepchemKeras} />
                                </Button>
                            </div>
                        </div>
                        {/* BACKEND END */}

                        {/* TYPE BEGIN */}
                        <div className="category-filter">
                            <p className="category-text-filter">
                                Type
                            </p>
                            <div className="btn-container-filter">
                                <Button className="rmv-filter" onClick={() => {
                                    handleClick("types", "Classifier");
                                }}>
                                    <FilterButton category={types} name={"Classifier"} image={deepchemClassifier} />
                                </Button>
                                <Button className="rmv-filter" onClick={() => {
                                    handleClick("types", "Regressor");
                                }}>
                                    <FilterButton category={types} name={"Regressor"} image={deepchemRegressor} />
                                </Button>
                            </div>
                        </div>
                        {/* TYPE END */}

                        {/* FEATURIZER BEGIN */}
                        <div className="category-filter">
                            <p className="category-text-filter">
                                Featurizer
                            </p>
                            <div className="btn-container-filter">
                                <Button className="rmv-filter" onClick={() => {
                                    handleClick("featurizers", "CircularFingerPrint");
                                }}>
                                    <FilterButton category={featurizers} name={"CircularFingerPrint"} image={null} />
                                </Button>
                                <Button className="rmv-filter" onClick={() => {
                                    handleClick("featurizers", "RDKitDescriptors");
                                }}>
                                    <FilterButton category={featurizers} name={"RDKitDescriptors"} image={null} />
                                </Button>
                                <Button className="rmv-filter" onClick={() => {
                                    handleClick("featurizers", "ElementPropertyFingerPrint");
                                }}>
                                    <FilterButton category={featurizers} name={"ElementPropertyFingerPrint"} image={null} />
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* FEATURIZER END */}
                    {/* FILTER SECTION END */}

                    {/* MODEL CARDS SECTION BEGIN */}
                    <div className="flex flex-col items-start gap-12 px-8">
                        <div className="flex flex-row items-start gap-12 flex-wrap">
                            {filteredModels && filteredModels.map((model) => (
                                <ModelCard key={model.id} model={model} />
                            ))}
                        </div>
                    </div>
                    {/* MODEL CARDS SECTION END */}
                </div>
            </div>
        </>
    );
}
import React, { useState, useEffect } from 'react';
import parts from './parts';
import Dropdown from '../Dropdown/Dropdown';
import ModelViewer from '../ModelViewer/ModelViewer';

const PartsPicker = () => {
  const [selectedParts, setSelectedParts] = useState({
    type1: '',
    type2: '',
    type3: '',
    type4: '',
    type5: [], // Assuming this will hold an array of IDs for multiple selections
  });

  const [loadedModels, setLoadedModels] = useState([]);

  useEffect(() => {
    // Update loadedModels based on selectedParts
    const newLoadedModels = [];
    Object.keys(selectedParts).forEach(type => {
      const partIDs = Array.isArray(selectedParts[type]) ? selectedParts[type] : [selectedParts[type]];
      partIDs.forEach(id => {
        const part = parts.find(p => p.id === id);
        if (part && part.model && !newLoadedModels.includes(part.model)) {
          newLoadedModels.push(part.model);
        }
      });
    });
    setLoadedModels(newLoadedModels);
  }, [selectedParts]); // Recalculate loadedModels whenever selectedParts changes

  const handleDropdownChange = (type, event) => {
    let value = event.target.value;
    // For multiple selects, value needs to be an array of selected option values
    if (type === 'type5' && event.target.selectedOptions) {
      value = Array.from(event.target.selectedOptions, option => option.value);
    }

    setSelectedParts(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const getOptionsForType = (type) =>
    parts.filter(part => part.type === type).map(part => ({
      value: part.id,
      label: part.name,
    }));

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold text-black mb-6">MRW Parts Picker</h1>
      <div className="flex space-x-4 mb-6">
        {["type1", "type2", "type3", "type4", "type5"].map((type, index) => (
          <Dropdown
            key={type}
            id={type}
            options={getOptionsForType(type)}
            multiple={type === "type5"}
            onChange={(e) => handleDropdownChange(type, e)}
            value={selectedParts[type] || (type === "type5" ? [] : '')}
          />
        ))}
      </div>
      <ModelViewer modelPaths={loadedModels} />
    </div>
  );
};

export default PartsPicker;
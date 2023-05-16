import { useEffect, useState } from "react";
import Select from "react-select";
import AverageCost from "./components/AverageCost";
import ContainerLayout from "./components/UI/ContainerLayout";
import { customStyles } from "./selectStyles";

const App = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  //Get the list of codes
  useEffect(() => {
    const fetchCodes = async () => {
      const response = await fetch("http://localhost:3001/api/cptCodes");
      const data = await response.json();

      //Transform options so they can be use with the react-select component libray
      const transformedOptions = data.map((option) => ({
        label: option.code,
        value: option.id,
      }));

      setOptions(transformedOptions);
    };

    fetchCodes();
  }, []);

  console.log(selectedOption);

  return (
    <div className="min-h-screen flex justify-center items-center w-full">
      <ContainerLayout>
        <Select
          options={options}
          onChange={setSelectedOption}
          styles={customStyles}
          placeholder={"Select a code..."}
        />
        {selectedOption !== null && (
          <AverageCost
            id={selectedOption?.value}
            code={selectedOption?.label}
          />
        )}
      </ContainerLayout>
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import Select from "react-select";
import AverageCost from "./components/AverageCost";
import Form from "./components/Form";
import ContainerLayout from "./components/UI/ContainerLayout";
import { customStyles } from "./selectStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [cptCodes, setCptCodes] = useState([]);

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
  return (
    <div className="min-h-screen flex justify-center items-center w-full">
      <ContainerLayout>
        <ToastContainer />
        <Select
          options={options}
          onChange={setSelectedOption}
          styles={customStyles}
          placeholder={"Select a code..."}
        />
        {selectedOption !== null && (
          <>
            <AverageCost
              id={selectedOption?.value}
              code={selectedOption?.label}
              cptCodes={cptCodes}
              setCptCodes={setCptCodes}
            />
            <Form
              id={selectedOption?.value}
              cptCodes={cptCodes}
              setCptCodes={setCptCodes}
            />
          </>
        )}
      </ContainerLayout>
    </div>
  );
};

export default App;

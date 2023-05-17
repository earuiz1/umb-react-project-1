import { useEffect } from "react";
import PropTypes from "prop-types";

const AverageCost = ({ id, code, cptCodes, setCptCodes }) => {
  //Fetch the costs
  useEffect(() => {
    const fetchAvgCost = async () => {
      const response = await fetch(
        `http://localhost:3001/api/cptCodes/${id}/costs`
      );
      const data = await response.json();

      setCptCodes(data);
    };

    fetchAvgCost();
  }, [id]);

  //Get All Costs
  const allCosts = cptCodes.map((code) => code.cost);

  //Get the Avg Cost
  const sumAvgCost =
    allCosts.length > 0
      ? allCosts.reduce((sum, cost) => sum + cost, 0) / allCosts.length
      : 0;

  return (
    <span className="text-slate-900 font-semibold bg-slate-100 text-sm md:text-base rounded-sm py-2 px-6 self-center">
      Average cost of code {code} is ${sumAvgCost.toFixed(2)}
    </span>
  );
};

AverageCost.propTypes = {
  id: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
  cptCodes: PropTypes.array.isRequired,
  setCptCodes: PropTypes.func.isRequired,
};

export default AverageCost;

import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = ({ id, cptCodes, setCptCodes }) => {
  const onSubmit = async (values) => {
    //console.log(values);
    try {
      const response = await fetch(`http://localhost:3001/api/costs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cptCodeId: id,
          cost: Number(values.newCost),
          facilityType: values.newFacilityType,
          copay: Number(values.newCopay),
        }),
      });

      const data = await response.json();

      //Update the state with the new data
      setCptCodes([...cptCodes, data]);

      //Show a success toast after submitting a new cost
      toast.success("New cost added!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      /* Resetting the form  */
      reset();
    } catch (error) {
      //Show a success toast after submitting a new cost
      toast.error(`${error}`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  /* React Hook Form */
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-1">
        <label
          htmlFor="newCost"
          className="font-semibold text-slate-100 text-sm md:text-base"
        >
          Enter new cost:
        </label>
        <input
          name="newCost"
          className="w-full p-2 rounded-md outline-none focus:border-[3px] focus:border-[#ac162c]"
          {...register("newCost", {
            required: "Cost is required!",
            min: { value: 0, message: "Cost must be a positive number!" },
          })}
        />
        {errors.newCost && (
          <p className="text-red-500 font-bold text-sm md:text-base underline">
            {errors.newCost.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="newFacilityType"
          className="font-semibold text-slate-100 text-sm md:text-base"
        >
          Enter new Facility Type:
        </label>
        <input
          type="text"
          name="newFacilityType"
          className="w-full p-2 rounded-md outline-none focus:border-[3px] focus:border-[#ac162c]"
          {...register("newFacilityType", {
            required: "Facility Type is required!",
          })}
        />
        {errors.newFacilityType && (
          <p className="text-red-500 font-bold text-sm md:text-base underline">
            {errors.newFacilityType.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="copay"
          className="font-semibold text-slate-100 text-sm md:text-base"
        >
          Enter new copay:
        </label>
        <input
          name="newCopay"
          className="w-full p-2 rounded-md outline-none focus:border-[3px] focus:border-[#ac162c]"
          {...register("newCopay", {
            required: "Copay is required!",
            min: { value: 0, message: "Copay must be a positive number!" },
          })}
        />
        {errors.newCopay && (
          <p className="text-red-500 font-bold text-sm md:text-base underline">
            {errors.newCopay.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="bg-[#C63531] hover:bg-[#C63531]/70 text-slate-100 font-semibold py-2 rounded-sm"
      >
        Submit
      </button>
    </form>
  );
};

Form.propTypes = {
  id: PropTypes.number.isRequired,
  cptCodes: PropTypes.array.isRequired,
  setCptCodes: PropTypes.func.isRequired,
};

export default Form;

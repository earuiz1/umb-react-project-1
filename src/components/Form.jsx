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

  console.log("Form");
  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="newCost" className="font-semibold text-slate-100">
          Enter new cost:
        </label>
        <input
          type="number"
          name="newCost"
          className="w-full p-2 rounded-md outline-none focus:border-[3px] focus:border-[#ac162c]"
          {...register("newCost", {
            required: "New cost is required!",
            min: { value: 0, message: "New cost must be a positive number!" },
          })}
        />
        {errors.newCost && (
          <p className="text-red-100 font-bold text-sm">
            {errors.newCost.message}
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

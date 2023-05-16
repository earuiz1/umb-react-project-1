import PropTypes from "prop-types";

const ContainerLayout = ({ children }) => {
  return (
    <div className="bg-[#18181A]/80 flex flex-col min-w-[90%] md:min-w-[70%] lg:md:min-w-[60%] rounded-md mx-auto px-6 py-10 gap-5">
      <h1 className="text-center font-extrabold text-2xl md:text-3xl text-slate-100">
        UMB React Project
      </h1>
      {children}
    </div>
  );
};

ContainerLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContainerLayout;

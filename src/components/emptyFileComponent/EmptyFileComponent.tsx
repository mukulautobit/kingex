import emptyFileIcons from "../../assets/icons/emptyFileIcons.svg";

interface Props {
  label: string;
}

const EmptyFileComponent = ({ label }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      
      <img
        src={emptyFileIcons}
        alt="Empty"
        className="w-25 h-25 mb-4 opacity-70"
      />

      <p className="text-[16px] text-white font-small">
        {label}
      </p>

      

    </div>
  );
};

export default EmptyFileComponent;

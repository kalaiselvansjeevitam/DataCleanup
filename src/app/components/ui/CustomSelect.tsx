import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select"; // adjust path based on your project

type CustomSelectProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  options: string[];
};

function CustomSelect({
  name,
  value,
  onChange,
  placeholder,
  options,
}: CustomSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(val) => {
        const syntheticEvent = {
          target: { name, value: val },
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange(syntheticEvent);
      }}
    >
      <SelectTrigger className="w-full border p-2 rounded text-sm">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CustomSelect;

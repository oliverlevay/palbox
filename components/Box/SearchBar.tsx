import { useData } from "../DataProvider";
import InputField from "../InputField";

export default function SearchBar() {
  const { search } = useData();
  return (
    <InputField
      placeholder="Search"
      className="w-[160px]"
      onChange={(text) => {
        search(text);
      }}
    />
  );
}

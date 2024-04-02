import { useData } from "../DataProvider";

export default function SearchBar() {
  const { search } = useData();
  return (
    <input
      placeholder="Search"
      className="pl-1 text-sm rounded-sm bg-lightBlue w-[160px] h-[20px] text-[rgba(0,0,0,0.8)]"
      onChange={(e) => {
        search(e.target.value);
      }}
    />
  );
}

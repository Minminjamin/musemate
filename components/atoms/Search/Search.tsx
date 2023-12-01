import React, { FormEvent, useState } from "react";
import S from "./Search.module.scss";
import { IoSearch } from "react-icons/io5";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchProps {
  // onSearch: (event: FormEvent<HTMLFormElement>) => void;
  onSearch: (event: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  const [search, setSearch] = useState<string>("");

  const debounceSearch = useDebounce(search);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(debounceSearch);
  };

  return (
    <form className={S.searchContainer} onSubmit={onSubmit}>
      <IoSearch className={S.searchIcon} color="767676" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default Search;

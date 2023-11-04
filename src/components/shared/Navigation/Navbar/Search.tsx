"use client";

import { useState } from "react";

import { MdOutlineSearch } from "react-icons/md";

const Search = () => {
  const [text, setText] = useState("");
  return (
    <form className="flex flex-row border-[1px] border-neutral-700 rounded-full overflow-hidden w-2/5">
      <input
        type="text"
        placeholder="Search"
        className="w-full px-4 py-2 bg-neutral-900"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button type="submit" className="px-3 bg-neutral-800 border-none">
        <MdOutlineSearch className="h-6 w-6" />
      </button>
    </form>
  );
};

export default Search;

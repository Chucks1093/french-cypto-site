import { useState } from "react";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import './Autocomplete.css'



export default function DropdownDemo() {
  const popularCountries = [
    "United States",
    "China",
    "India",
    "Japan",
    "Germany",
    "United Kingdom",
    "France",
    "Canada",
    "Australia",
    "Brazil",
  ];

  const [value, setValue] = useState<string>("");
  const [items, setItems] = useState<string[]>([]);

  // const search = (event: AutoCompleteCompleteEvent) => {
  //     let _items = [...Array(10).keys()];
  //     setItems(event.query ? [...Array(10).keys()].map(item => event.query + '-' + item) : _items);
  // }

  const searchFn = (event: AutoCompleteCompleteEvent) => {
    // let items = popularCountries.map((item) => event.query + item);
    setItems(event.query ? popularCountries.map((item) => event.query + item): popularCountries);
  };

  return (
    <div className="card flex justify-content-center">
      <AutoComplete
        value={value}
        suggestions={items}
        completeMethod={searchFn}
        onChange={(e: any) => setValue(e.value)}
        dropdown
        placeholder="+234 123 456 7890"
        className="
        "
      />
    </div>
  );
}

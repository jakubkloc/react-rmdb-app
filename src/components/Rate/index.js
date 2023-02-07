import React, { useContext, useState } from "react";
import Button from "../Button";
import { Context } from "../../context";

const Rate = ({ callback }) => {
  const { languageData } = useContext(Context);
  const { language } = languageData;

  const [value, setValue] = useState(5);

  return (
    <div>
      <input
        type="range"
        min="1"
        max="10"
        step="0.5"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      {value}
      <p>
        <Button
          text={language === "pl" ? "Oceń" : "Rate"}
          callback={() => callback(value)}
        ></Button>
      </p>
    </div>
  );
};

export default Rate;

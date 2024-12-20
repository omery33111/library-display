import { useEffect, useState } from "react";

const Flag = ({ country }: { country: string }) => {
  const [flagUrl, setFlagUrl] = useState<string>("");

  useEffect(() => {
    const fetchFlag = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${country}?fields=flags`);
        const data = await response.json();
        setFlagUrl(data[0]?.flags?.png || "");
      } catch {
        setFlagUrl("");
      }
    };
    fetchFlag();
  }, [country]);

  if (!flagUrl) return null;
  return (
    <img src={flagUrl} alt={`${country} flag`} className = "country-flags" />
  );
};

export default Flag;

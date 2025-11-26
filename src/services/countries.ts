
export type RestCountryGrid = {
  name: { common: string ; official: string };
  flags:{ png?: string; svg?: string; alt?: string};
  population?: number;
  region?: string;
  capital?: string[];
  cca3?: string;
};

export type CountryCard = {
  name: string;
  flagsSrc: string;
  flagAlt: string;
  population: number | null;
  region: string | null;
  capital: string | null;
  code: string | null;
};
export type RestCountryDetail = {
    name: {
        common: string;
        official: string;
        nativeName?: Record<string, {official?: string; common?: string }>;
    }
    flags: {png?: string; svg?: string; alt?: string };
    population?: number;
    region?: string;
    subregion?: string;
    capital?: string[];
    tld?: string[];
    currencies?: Record<string, { name: string; symbol?: string}>;
    languages?: Record<string, string>;
    borders?: string[];
    cca3?: string;
}

export type CountryDetail = {
    name: string;
    nativeName: string | null;
    flagSrc: string;
    flagAlt: string;
    population: number | null;
    region: string | null;
    subregion: string | null;
    capital: string | null;
    tld: string[];
    currencies: string[];
    languages: string[];
    borders: string[];
}

const API = 'https://restcountries.com/v3.1';
const gridFields = 'name,flags,population,region,capital,cca3';

const detailFields = 'name,flags,population,region,subregion,capital,tld,currencies,languages,borders,cca3';



export async function getAllCountries(): Promise<RestCountryGrid[]> {
  const res = await fetch(`${API}/all?fields=${gridFields}`,);

  if (!res.ok) {
    throw new Error("Error fetching data");
  }

  // const data = await res.json();
  // console.log(data);
  return res.json();
};

export function toCountryCard(countryData: RestCountryGrid): CountryCard {
  return {
    name: countryData.name?.common ?? 'No known country',
    flagsSrc: countryData.flags?.png ?? countryData.flags?.svg ?? '',
    flagAlt: countryData.flags.alt ?? `${countryData.name?.common ?? 'Country'} flag`,
    population: countryData.population ?? null,
    region: countryData.region ?? null,
    capital: countryData.capital?.[0] ?? null,
    code: countryData.cca3 ?? null,

  };
}

export async function getCountrybyName(name: string): Promise<RestCountryDetail> {
    console.log(name);
    const res = await fetch(`${API}/name/${encodeURIComponent(name)}?fullText=true&fields=${detailFields}`);

    if (!res.ok) {
        throw new Error('Failed to fetch country!');
    }

    const array = (await res.json()) as RestCountryDetail[];
    if (!array.length) {
        throw new Error('Country not found');
    }
    return array[0];
}

export async function getCountryNamebyCodes(codes: string[]) {
    if (!codes.length) return [] as { code: string; name: string }[];
    const res = await fetch(`${API}/alpha?codes=${codes.join(',')}&fields=name,cca3`);
    if (!res.ok) {
        throw new Error('Failed to fertch borders');
    }
    const data = (await res.json()) as { name: { common: string }; cca3: string }[];
    return data.map(data => ({ code: data.cca3, name: data.name.common }));
}


export function toCountryDetail(country: RestCountryDetail): CountryDetail {
    const native = country.name.nativeName ? Object.values(country.name.nativeName)[0] : undefined;
    const currencies = country.currencies ? Object.values(country.currencies).map(money => money.name) : [];
    const languages = country.languages ? Object.values(country.languages) : [];

    return {
        name: country.name.common ?? 'Unknown',
        nativeName: native?.official ?? native?.common ?? null,
        flagSrc: country.flags.png ?? country.flags.svg ?? '',
        flagAlt: country.flags.alt ?? `${country.name.common ?? 'Country'} flag`,
        population: country.population ?? null,
        region: country.region ?? null,
        subregion: country.subregion ?? null,
        capital: country.capital?.[0] ?? null,
        tld: country.tld ?? [],
        currencies,
        languages,
        borders: country.borders ?? [],
    };
}
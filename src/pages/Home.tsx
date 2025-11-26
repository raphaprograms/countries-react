import { useEffect, useState, useMemo } from "react";
import { getAllCountries, toCountryCard, type CountryCard } from "../services/countries";
import CountryGrid from "../components/CountryGrid";


export default function Home() {
    const [cards , setCards] = useState<CountryCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState('');
    const [region, setRegion] = useState('');

    useEffect(() => {
        let mounted = true; 
        (async () => {
            try {
                const raw = await getAllCountries();
                const mapped = raw.map(toCountryCard);
                if(mounted) {
                    setCards(mapped)
                }

            } catch (error: any) {
                if (mounted) {
                    setError(error?.message ?? 'Failed to fetch countries');
                }
            
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        })();
        return () => {
            mounted = false;
        }
    }, [])

     const visible = useMemo(() => {
        const searchCountries = search.trim().toLowerCase();
        const searchRegion = region.trim();
        return cards.filter(card => {
            const matchName = searchCountries === '' || card.name.toLowerCase().includes(searchCountries);
            const matchRegion = searchRegion === '' || card.region === region;
            return matchName && matchRegion;
        })
    }, [cards, search, region]);

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    if (error) {
        return (
            <div>{error}</div>
        )
    }

    return (
        <>
            <section className="navbar">
                <input 
                type="search"
                placeholder="Choose your country by name"
                value={search}
                onChange={event => setSearch(event.target.value)}
                 />
                 <select value={region} onChange={event => setRegion(event.target.value)}  name="" id="">
                    <option value="">All Regions</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                 </select>
            </section>
            <section id="grid" className="grid">
                <CountryGrid cards={visible}/>
                {visible.map(country => (
                    <div key={country.code ?? country.name} className="card">
                        <img className="flag" src={country.flagsSrc} alt={country.flagAlt} />
                        <div className="card-body">
                            <h2 className="name">{country.name}</h2>
                            <p className="population">Population: {country.population ?? '-'}</p>
                            <p className="region">Region: {country.region ?? 'not found'}</p>
                            <p className="capital">Capital: {country.capital ?? 'not found'}</p>
                        </div>
                    </div>
                ))}
            </section> 
            <div>
                Cards: {cards.length}
            </div>
        </>
    );
}
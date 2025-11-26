import { useEffect, useState } from "react";
import { getAllCountries, toCountryCard, type CountryCard } from "../services/countries";


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

            } catch (error) {
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
            <div>
                Cards: {cards.length}
            </div>
        </>
    );
}
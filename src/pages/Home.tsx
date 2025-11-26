import { useEffect, useState } from "react";
import { getAllCountries, toCountryCard, type CountryCard } from "../services/countries";


export default function Home() {
    const [cards , setCards] = useState<CountryCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        <div>
            {cards.slice(0, 5).map(card => (
                <div key={card.code ?? card.name}></div>
            ))}
        </div>
    );
}
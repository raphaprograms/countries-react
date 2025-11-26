import CountryCard from './CountryCard';
import type { CountryCard as CountryCardType } from '../services/countries';

export default function CountryGrid({ cards }: { cards: CountryCardType[] }) {


    return (
        <>
            {cards.map(card => (
                <CountryCard key={card.code ?? card.name}  card={card}/>
            ))}
        </>
    )
}
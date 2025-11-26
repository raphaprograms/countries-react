import type { CountryCard as CountryCardType } from "../services/countries";
import { Link } from 'react-router-dom';

export default function CountryCard({ card }: {card: CountryCardType}) {
    const id = card.code ?? encodeURIComponent(card.name);
    

    return (
        <Link className="card" to={`/country/${id}`}>
            <img src={card.flagsSrc} alt={card.flagAlt} />
            <div className="card-body">
                <h2 className="name">{card.name}</h2>
                <p className="population">Population: {card.population ?? '-'}</p>
                <p className="region">Region: {card.region ?? 'not found'}</p>
                <p className="capital">Capital: {card.capital ?? 'not found'}</p>
            </div>
        </Link>
    )
}
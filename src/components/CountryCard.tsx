import type { CountryCard as CountryCardType } from "../services/countries";

export default function CountryCard({ card }: {card: CountryCardType}) {
    

    return (
        <div className="card">
            <img src={card.flagsSrc} alt={card.flagAlt} />
            <div className="card-body">
                <h2 className="name">{card.name}</h2>
                <p className="population">Population: {card.population ?? '-'}</p>
                <p className="region">Region: {card.region ?? 'not found'}</p>
                <p className="capital">Capital: {card.capital}</p>
            </div>

        </div>
    )
}
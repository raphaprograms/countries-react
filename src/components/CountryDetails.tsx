import { Link } from 'react-router-dom';
import type { CountryDetail } from '../services/countries';


export default function CountryDetails({ detail, borders } : { detail: CountryDetail; borders: { code: string; name: string }[] }) {

    return(
        <div className='country-detail'>
            <img className='flag-details' src={detail.flagSrc} alt={detail.flagAlt} />
            <div className='data'>
                <h2>{detail.name}</h2>
                <ul className='facts'>
                    <li><strong>Native Name: </strong>{detail.nativeName ?? '-'}</li>
                    <li><strong>Population: </strong>{detail.population?.toLocaleString() ?? '-'}</li>
                    <li><strong>Region: </strong>{detail.region ?? '-'}</li>
                    <li><strong>Sub Region: </strong>{detail.subregion ?? '-'}</li>
                    <li><strong>Capital: </strong>{detail.capital ?? '-'}</li>
                    <li><strong>Top Level Domain: </strong>{detail.tld.join(', ') || '-'}</li>
                    <li><strong>Currencies: </strong>{detail.currencies.join(', ') || '-'}</li>
                    <li><strong>Languges: </strong>{detail.languages.join(', ') || '-'}</li>
                </ul>
                <div className='borders'>
                    <strong>Border Countries:</strong>
                    <span className='border-list'>
                        {borders.length ? borders.map(border => (
                            <Link key={border.code} className='"b-link' to={`/country/${encodeURIComponent(border.name)}`}>
                                {border.name}
                            </Link>
                        )) : 'none' }
                    </span>
                </div>
            </div>
        </div>
    )
}
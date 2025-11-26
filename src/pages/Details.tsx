import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCountrybyName, getCountryNamebyCodes, toCountryDetail } from "../services/countries";
import type { CountryDetail } from "../services/countries";
import CountryDetails from "../components/CountryDetails";



export default function Details() {
    const { nameParam } = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState<CountryDetail | null>(null);
    const [borders, setBorders] = useState<{ code: string; name: string}[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!nameParam) return; 
        setLoading(true);
        setError(null);
        setDetail(null);
        setBorders([]);
        (async () => {
            try {
                const name = decodeURIComponent(nameParam);
                const raw = await getCountrybyName(name);
                const viewModel = toCountryDetail(raw);
                setDetail(viewModel);
                const borderNames = await getCountryNamebyCodes(viewModel.borders);
                setBorders(borderNames);
            } catch (error: any) {
                setError(error?.message ?? 'Failed to load country')
            } finally {
                setLoading(false);
            }
        })();
    }, [nameParam]);

    return (
       <main className="container">
        <button className="back" onClick={() => navigate('/')}>Back</button>
        <section className="detail" id="detail">
            {loading ? "Loading..." : error ? error: detail ? (
            <CountryDetails detail={detail} borders={borders}/>
            ) : null}
        </section>
       </main>
    )
}
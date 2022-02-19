const SportInput = ({
    sport, 
    setSport, 
    setError,
    sportsAction: {loading, sportsItem, error}
}) => {
    return (
        <div className="form__group">
            <label htmlFor='sport'>Sport:</label>
            <select required className="form__select" value={sport} name="sportType" onChange={(e) => setSport(e.target.value)}>
            <option value="">Choose sport...</option>
            {loading ? null : error ? setError(error) : sportsItem.map(sport => (
                <option key={sport.id} value={sport.nameId}>{sport.name}</option>
            ))}
            </select>
        </div>
    )
}

export default SportInput
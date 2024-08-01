export default function InputSearchClimatCountryInformation() {
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
  };

  return (
    <>
      <form className="search-box" onSubmit={handleSubmit}>
        <input
          type="search"
          className="input-search"
          placeholder="Ville ou Pays"
        />
        <input
          type="button"
          className="button-search lato-bold"
          value="Rechercher"
        />
      </form>
    </>
  );
}

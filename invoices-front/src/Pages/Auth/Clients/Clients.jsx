export default function Clients() {
  return (
    <>
      <div>
        <div>
          <h1>Clients Page</h1>
        </div>
        <div>
          <form action="/createclient">
            <input
              className="button-17 mainButton"
              type="submit"
              value="Create Client"
            />
          </form>
        </div>
      </div>
    </>
  );
}

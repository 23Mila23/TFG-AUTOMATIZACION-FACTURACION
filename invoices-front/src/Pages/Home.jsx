export default function Home() {
  return (
    <>
      <section class="cards-home-wrapper">
        <div class="card-grid-space">
          <a class="card" href="">
            <div>
              <h1>Register</h1>
              <p>Start automating your business</p>
              <div class="tags">
                <form action="/register">
                  <input className="tag" type="submit" value="Register" />
                </form>
              </div>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}

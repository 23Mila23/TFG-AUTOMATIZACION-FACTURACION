import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section class="cards-home-wrapper">
        <div class="card-grid-space">
          <a class="card" href="#">
            <div>
              <h1>Register</h1>
              <p>Start automating your business</p>
              <div class="tags">
                <button
                  className="tag"
                  onClick={() => navigate("/register")}
                  value="register"
                >
                  Register
                </button>
              </div>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}

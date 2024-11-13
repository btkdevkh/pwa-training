import Link from "next/link";

const About = () => {
  return (
    <div className="text-center container m-auto">
      <br />
      <h2>
        GreenMétéo est une progressive web app qui affiche la météo du jour, les
        prévisions pour la semaine. <br />
        Elle est développée avec Next.js et optimisée en PWA. <br />
        Version 1.0.0.0.
      </h2>
      <br />
      <Link href="/" className="btn btn-outline btn-info">
        Retour
      </Link>
    </div>
  );
};

export default About;

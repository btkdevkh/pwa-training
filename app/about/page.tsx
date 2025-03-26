import Link from "next/link";

const About = () => {
  return (
    <div className="max-w-xl m-auto text-balance text-center">
      <br />
      <h2>
        GreenMétéo est une progressive web app avec NextJS qui affiche la météo
        du jour et les prévisions pour la semaine en fonction de la
        localisation.
      </h2>
      <br />

      <p>
        C'est une test app sur la librarie Serwist avant le développement d'une
        application en PWA pour une client de mon entreprise. Elle sert juste à
        tester les fonctionnalités de la librairie Serwist.
      </p>
      <br />

      <p className="text-sm text-gray-500">Version 1.0.0</p>

      <br />
      <Link href="/" className="btn btn-outline px-8">
        Retour
      </Link>
    </div>
  );
};

export default About;

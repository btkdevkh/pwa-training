import Image from "next/image";

type WeatherForcastProps = {
  temp: number;
  city?: string;
  country?: string;
  date?: string;
  hr?: string;
};

const WeatherForcast = ({
  temp,
  city,
  country,
  date,
  hr,
}: WeatherForcastProps) => {
  return (
    <div className="card bg-base-100 image-full w-full h-44 shadow-xl">
      <Image
        className="rounded-2xl p-2"
        src="/meteo_bg.jpg"
        alt="Seaside"
        fill
        priority
        sizes="100%"
      />

      <div className="card-body">
        <p className="text-xl text-center">
          {hr && `${hr} `}
          {city && `${city}, `}
          {country && `${country}, `}
          {date && `${date}, `}
        </p>
        <p className="text-lime-400 text-center text-2xl">
          {kelvinToCelsius(temp)} °C
        </p>
      </div>
    </div>
  );
};

export default WeatherForcast;

export const kelvinToCelsius = (kelvin: number): number => {
  const celsius = kelvin - 273.15;
  return Math.floor(celsius);
  // return celsius;
};

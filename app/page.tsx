"use client";

import { useContext, useEffect, useState } from "react";
import getWeatherForcastPos from "./https/openweather/getWeatherForcastPos";
import WeatherForcast from "./components/weatherForcast/WeatherForcast";
import { AuthContext } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import WeatherGraph from "./components/weatherForcast/WeatherGraph";

const Home = () => {
  const router = useRouter();
  const { authenticatedUser } = useContext(AuthContext);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [weatherForcast, setWeatherForcast] = useState<any | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [weatherForcast5days, setWeatherForcast5days] = useState<any | null>(
    null
  );
  const [, setLatitude] = useState<number>(48);
  const [, setLongitude] = useState<number>(22);

  useEffect(() => {
    getCurrentPosition().then(({ lat, lng }) => {
      setLatitude(lat);
      setLongitude(lng);

      getWeatherForcastPos(lat, lng).then(data => {
        setWeatherForcast(data.openweatherpos);

        const formatMeteo5days = Object.entries(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.openweather5days.list.reduce((acc: any, meteo: any) => {
            const initDate = meteo.dt_txt.split(" ")[0];
            if (!acc[initDate]) {
              acc[initDate] = [];
            }
            acc[initDate].push(meteo);
            return acc;
          }, {})
        ).map(([, entries]) => ({
          city: data.openweather5days.city,
          days: entries,
        }));

        setWeatherForcast5days(formatMeteo5days);
      });
    });
  }, []);

  // Redirect not authenticated user to "/login"
  useEffect(() => {
    if (!authenticatedUser) router.push("/login");
  }, [authenticatedUser, router]);

  const weatherForcastGraph = weatherForcast5days && weatherForcast5days[0];

  return (
    <>
      {authenticatedUser && (
        <div className="container m-auto">
          <br />
          {/* Graphique */}
          {weatherForcast && (
            <>
              <h2 className="text-lg text-lime-500">
                Prévisions du jour, {weatherForcast.name},{" "}
                {weatherForcast && weatherForcast.sys.country}, le{" "}
                {new Date().toLocaleDateString()}
              </h2>
              <br />

              {/* Weather banner */}
              <WeatherForcast
                city={weatherForcast.name}
                country={weatherForcast.sys.country}
                temp={weatherForcast.main.temp}
              />
              <br />

              <p style={{ color: "#595e65" }}>Température °C</p>
              <WeatherGraph weatherForcastGraph={weatherForcastGraph} />
            </>
          )}

          <br />
          <br />

          {/* Weather of the week */}
          {weatherForcast && (
            <h2 className="text-lg text-lime-500">
              Prévisions de la semaine, {weatherForcast.name},{" "}
              {weatherForcast && weatherForcast.sys.country}
            </h2>
          )}

          <br />

          <div className="grid sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {weatherForcast5days &&
              weatherForcast5days.length > 0 &&
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              weatherForcast5days.map((weather: any, idx: number) => {
                return (
                  <div key={idx} className="">
                    {/* <p>{weather.city.name}</p> */}

                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <p className="bg-lime-600 py-1 mb-1 text-center rounded">
                      {weather.days[0].dt_txt.split(" ")[0].split("-")[2]}/
                      {weather.days[0].dt_txt.split(" ")[0].split("-")[1]}/
                      {weather.days[0].dt_txt.split(" ")[0].split("-")[0]}
                    </p>

                    <div className="grid gap-2">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {weather.days.map((w: any, i: number) => (
                        <div key={i} className="">
                          <WeatherForcast
                            temp={w.main.temp}
                            hr={w.dt_txt.split(" ")[1]}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>

          <br />
        </div>
      )}
    </>
  );
};

export default Home;

const getCurrentPosition = (): Promise<{
  lat: number;
  lng: number;
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
    } else {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          resolve({ lat, lng });
        },
        error => {
          console.log("Error :", error);
          // reject(error);

          const lat = 48.854582744110935;
          const lng = 2.3643341823348307;
          resolve({ lat, lng });
        }
      );
    }
  });
};

const getWeatherForcastPos = async (lat: number, lng: number) => {
  try {
    const res = await fetch(`/api/openweather?lat=${lat}&lng=${lng}`);
    const data = await res.json();

    return data;
  } catch (err) {
    console.log("Error :", err);
  }
};

export default getWeatherForcastPos;

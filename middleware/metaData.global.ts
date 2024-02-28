
export default defineNuxtRouteMiddleware((to, from) => {
  const SupervisoryInfo = localStorage.getItem("SupervisoryInfo");

  const supervisoryInfo =SupervisoryInfo ?JSON.parse(SupervisoryInfo):{}
const token =supervisoryInfo.token
  const router = useRouter();

  if (!token && to.path !== "/login") {
    return navigateTo("/login");
  }

  const utcDateTime = new Date();
  const iranDateTimeFormat = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tehran',
    hour12: true,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
    const iranDateTimeString = iranDateTimeFormat.format(utcDateTime);
    const currentDateStart = new Date(utcDateTime.getFullYear(), utcDateTime.getMonth(), utcDateTime.getDate());
    const tomorrow = new Date(currentDateStart);
    tomorrow.setDate(currentDateStart.getDate() + 1);
    const tomorrowDateString = iranDateTimeFormat.format(tomorrow);
    const  DateTimeString=localStorage.getItem("ArrivalTime")

  console.log(iranDateTimeString,DateTimeString)
  if (DateTimeString){

    if (DateTimeString == iranDateTimeString.substring(0,9)) {
      console.log("auth is okey")
    }else{
      localStorage.removeItem("SurveyBaseInfo");
      localStorage.removeItem("SupervisoryInfo");
      localStorage.removeItem("GetSurveysList")
      localStorage.removeItem("nuxt-color-mode");
      localStorage.removeItem("GetCartables");
      localStorage.removeItem("ArrivalTime");
      for (let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        if (key.startsWith("user")) {
          localStorage.removeItem(key)
        }
      }
      router.push("/login");
    }
  }




});

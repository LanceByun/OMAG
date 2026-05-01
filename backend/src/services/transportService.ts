import axios from "axios";

const BUS_ARRIVAL_API_URL = "http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalListv2";
const SERVICE_KEY = "YOUR_API_KEY";
const STATION_ID = "YOUR_STATION_ID";

export async function getTransportInfo(): Promise<string> {
  try {
    const res = await axios.get(BUS_ARRIVAL_API_URL, {
      params: {
        serviceKey: SERVICE_KEY,
        stationId: STATION_ID,
        format: "json",
      },
    });

    console.log(res.data);

    const items = res?.data?.response?.body?.items;
    const list = Array.isArray(items) ? items : items ? [items] : [];

    const bus611 = list.find((item: any) => {
      const routeName = String(item?.routeName ?? "");
      return routeName.includes("611");
    });

    if (!bus611) {
      return "버스 정보 없음";
    }

    const routeName = String(bus611.routeName ?? "611");
    const predictTime1 = String(bus611.predictTime1 ?? "-");

    return `${routeName}번 버스 ${predictTime1}분 후 도착`;
  } catch (error) {
    return "버스 정보 가져오기 실패";
  }
}

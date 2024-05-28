import { DM_Sans, DM_Serif_Display } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
});

export const BACKEND_IP = "https://legal.boothcentral.co";
export const SOCKET_IP = "wss://legal.boothcentral.co";

// export const BACKEND_IP = "http://192.168.1.19:8000";
// export const SOCKET_IP = "ws://192.168.1.19:8000";

export { dmSans, dmSerifDisplay };

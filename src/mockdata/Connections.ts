import { ConnectionStatus } from "../enums/connections";
import { Connection } from "../interfaces/Connection";
import cover1 from "../assets/covers/card1.png";
import cover2 from "../assets/covers/card2.png";
import cover3 from "../assets/covers/card3.png";

export const otherConnectionList: Connection[] = [
  {
    status: ConnectionStatus.NOT_CONNECTED,
    name: "Asana",
    avatar: "base64 Image",
    cover: cover1,
  },
  {
    status: ConnectionStatus.NOT_CONNECTED,
    name: "Grammarly",
    avatar: "base64 Image",
    cover: cover2,
  },
  {
    status: ConnectionStatus.NOT_CONNECTED,
    name: "Random",
    avatar: "base64 Image",
    cover: cover3,
  },
  {
    status: ConnectionStatus.NOT_CONNECTED,
    name: "Grammarly",
    avatar: "base64 Image",
    cover: cover2,
  },
  {
    status: ConnectionStatus.NOT_CONNECTED,
    name: "Random",
    avatar: "base64 Image",
    cover: cover3,
  },
  {
    status: ConnectionStatus.NOT_CONNECTED,
    name: "Random",
    avatar: "base64 Image",
    cover: cover3,
  },
  {
    status: ConnectionStatus.NOT_CONNECTED,
    name: "Random",
    avatar: "base64 Image",
    cover: cover3,
  },
  {
    status: ConnectionStatus.NOT_CONNECTED,
    name: "Random",
    avatar: "base64 Image",
    cover: cover3,
  },
];

export const connectionList: Connection[] = [
  {
    status: ConnectionStatus.SYNC_FAILED,
    name: "Source Name",
    avatar: "base64 Image",
    cover: cover1,
  },
  {
    status: ConnectionStatus.SYNC_FAILED,
    name: "Source Name",
    avatar: "base64 Image",
    cover: cover1,
  },
  {
    status: ConnectionStatus.CONNECTED,
    name: "Source Name",
    avatar: "base64 Image",
    cover: cover1,
  },
  {
    status: ConnectionStatus.CONNECTED,
    name: "Source Name",
    avatar: "base64 Image",
    cover: cover1,
  },
  {
    status: ConnectionStatus.CONNECTED,
    name: "Source Name",
    avatar: "base64 Image",
    cover: cover1,
  },
];

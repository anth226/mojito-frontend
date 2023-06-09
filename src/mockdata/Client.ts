import { Avatars } from "../assets/base64Icons";
import { ClientRoles, ClientStatus } from "../enums/clients";
import { Client } from "../interfaces/Client";

export const mockClients: Client[] = [
  {
    email: "example1@gmail.com",
    avatar: Avatars.AVATAR2,
    name: "Marvin",
    surname: "McKinney",
    role: ClientRoles.CLIENT,
    status: ClientStatus.INVITED,
  },
  {
    email: "example2@gmail.com",
    avatar: Avatars.AVATAR3,
    name: "Guy",
    surname: "Hawkins",
    role: ClientRoles.USER,
    status: ClientStatus.ACTIVE,
  },
  {
    email: "example3@gmail.com",
    avatar: Avatars.AVATAR4,
    name: "Arlene",
    surname: "McCoy",
    role: ClientRoles.USER,
    status: ClientStatus.ACTIVE,
  },
];

export const performanceClientList: Client[] = [
  {
    avatar: Avatars.AVATAR1,
    name: "Annette Black",
    value: 1280,
    percentage: 7.2,
    email: "example@gmail.com",
  },
  {
    avatar: Avatars.AVATAR2,
    name: "Wade Warren",
    value: 1280,
    percentage: 7.2,
    email: "example@gmail.com",
  },
  {
    avatar: Avatars.AVATAR3,
    name: "Cameron Williamson",
    value: 1280,
    percentage: 7.2,
    email: "example@gmail.com",
  },
  {
    avatar: Avatars.AVATAR4,
    name: "Esther Howard",
    value: 1280,
    percentage: 7.2,
    email: "example@gmail.com",
  },
  {
    avatar: Avatars.AVATAR5,
    name: "Leslie Alexander",
    value: 1280,
    percentage: 7.2,
    email: "example@gmail.com",
  },
  {
    avatar: Avatars.AVATAR6,
    name: "Ronald Richards",
    value: 1280,
    percentage: 7.2,
    email: "example@gmail.com",
  },
  {
    avatar: Avatars.AVATAR7,
    name: "Brooklyn Simmons",
    value: 1280,
    percentage: 7.2,
    email: "example@gmail.com",
  },
];

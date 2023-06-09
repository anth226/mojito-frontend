import { Key } from "react";
import { ConnectionStatus } from "../enums/connections";

export interface Connection {
    status?: ConnectionStatus.CONNECTED | ConnectionStatus.NOT_CONNECTED | ConnectionStatus.SYNC_FAILED;
    name: string;
    avatar: string;
    cover: string;
    description?: string;
    key?: Key
}
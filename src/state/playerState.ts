// pinia user state
import { defineStore } from 'pinia'
import { io, Socket } from "socket.io-client";
import { ElNotification } from 'element-plus';
import { useRouter } from "vue-router";

export interface roomStore {
    name: string,
    id: string,
    maxPlayers: number,
    master: string, // 房主的名字
    type: "text" | "canvas" | string, // 返回房间类型
    needKey: boolean, // 是否需要密码
}

export interface RoomProfile {
    roomName: string,
    maxPlayers: number,
    playerId: string,
    key: number | null,
    needKey: boolean,
    type: "text" | "canvas",
    [propname: string]: any
}

const playerState = defineStore("user", {
    state: () => ({
        remoteUrl: import.meta.env.VITE_REMOTE_URL,
        playerId: "",
        playerName: "",
        currentRoomId: "",
        currentRoomName: "",
        auth: false,
        router: useRouter(),
        currentRooms: [{
            name: "test",
            id: "test",
            maxPlayers: 2,
            master: "test",
            type: "text",
            needKey: false
        }],
        playerCurrentRoom: "",
        rooms: [""],
        socket: io(import.meta.env.VITE_URL_PREFIX || "http://localhost:3000", {
            autoConnect: false,
        }) as Socket,

    }),


    actions: {
        connectToServer() {
            console.log(import.meta.env);
            this.currentRooms = [];
            this.rooms = [];
            this.socket.connect();
            this.socket.emit("player:rename", this.playerName);
            this.socket.on("connect", () => {
                this.auth = true;
                ElNotification({
                    title: "连接成功",
                    message: `您以成功连接到远程服务器!`,
                })
            })
            this.socket.emit("player:whoami");
            this.socket.on("player:whoami", (userinfo: { playerId: string, playerName: string }) => {
                this.playerId = userinfo.playerId;
                ElNotification({
                    title: "个人信息",
                    message: `${userinfo.playerName} 欢迎光临!`
                })
            })
            this.socket.emit("room:get");
            this.socket.on("room:get", (rooms: roomStore[]) => {
                this.currentRooms = rooms;
                ElNotification({
                    title: "房间信息",
                    message: `当前房间数量: ${rooms.length}`
                })
            })


            this.socket.on("room:create", (info) => {
                console.log(info);
                if (info.success) {
                    // 如果成功
                    this.rooms.push(info.roomInfo.id);
                    this.router.push(`/room/${info.roomInfo.id}`);
                    this.playerCurrentRoom = info.roomInfo.id;
                    ElNotification({
                        title: "创建成功",
                        message: `您已成功创建房间 ${info.roomInfo.name}`,
                        type: "success",
                        duration: 5000,
                    })
                }
            })

            this.socket.on("player:join", (info) => {
                console.log(info);

                // 如果成功
                this.router.push(`/room/${info.roomId}`);
                this.playerCurrentRoom = info.roomId;
                ElNotification({
                    title: "加入成功",
                    message: `您已成功加入房间 ${info.roomName}`,
                    type: "success",
                    duration: 5000,
                })
            })
        },

        createRoom(roomProfile: RoomProfile) {
            roomProfile.playerId = this.playerId;
            this.socket.emit("room:create", roomProfile);
            this.socket.emit("room:get");
        },

        joinRoom(roomId: string, roomName: string, key: number | null) {
            this.socket.emit("player:join", {
                roomId,
                roomName,
                key
            })
        },

        updateRoom() {
            this.socket.emit("room:get");
            console.log("update room");
        }
    }
})

export default playerState
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiConfig } from "../config/apiConfig";

let connection = null;

const connectToMessageHub = async (onReceiveMessage) => {
  const token = await AsyncStorage.getItem("token");

  connection = new HubConnectionBuilder()
    .withUrl(apiConfig.hubs.chatHub, {
      accessTokenFactory: () => token,
    })
    .configureLogging(LogLevel.Information)
    .build();

  connection.on("ReceiveMessage", (message) => {
    console.log("New message received:", message);
    onReceiveMessage(message);
  });

  try {
    await connection.start();
    console.log("Connected to SignalR MessageHub");
  } catch (error) {
    console.error("SignalR Connection Error: ", error);
  }

  return connection;
};

const sendMessage = async (message) => {
  if (connection) {
    try {
      await connection.invoke("SendMessage", message);
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  }
};

const connectToNotificationHub = async (onReceiveMessage) => {
  const token = await AsyncStorage.getItem("token");

  connection = new HubConnectionBuilder()
    .withUrl(apiConfig.hubs.chatHub, {
      accessTokenFactory: () => token,
    })
    .configureLogging(LogLevel.Information)
    .build();

  connection.on("ReceiveNotification", (notification) => {
    onReceiveMessage(message);
  });

  try {
    await connection.start();
  } catch (error) {
    console.error("SignalR Connection Error: ", error);
  }

  return connection;
};

export { connectToMessageHub, sendMessage, connectToNotificationHub };

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

  const startConnection = async () => {
    try {
      await connection.start();
      console.log("Connected to SignalR MessageHub");
    } catch (error) {
      console.error("SignalR Connection Error: ", error);
      setTimeout(startConnection, 5000); // Retry connection after 5 seconds
    }
  };

  startConnection();

  connection.onclose(async () => {
    await startConnection();
  });

  return connection;
};

const sendMessage = async (message) => {
  if (connection && connection.state === "Connected") {
    try {
      await connection.invoke(
        "SendMessage",
        message.chatPartnerId,
        message.content
      );
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  } else {
    console.error(
      'Cannot send data if the connection is not in the "Connected" state.'
    );
  }
};
export { connectToMessageHub, sendMessage };

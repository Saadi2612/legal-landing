import { useEffect, useRef } from "react";

function useWebSocket(url, onMessage, onError) {
  const retryCountRef = useRef(0);
  const wsRef = useRef(null);
  const pingIntervalIdRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      console.log("Connection established");
      retryCountRef.current = 0; // Reset the retry count

      // Start sending a 'ping' message every 10 seconds
      console.log("Checking readyState");
      console.log(wsRef.current.readyState);
      console.log(WebSocket.OPEN);
      //   pingIntervalIdRef.current = setInterval(() => {
      //     if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      //       console.log("Sending 'ping'");
      //       wsRef.current.send("ping");
      //     } else {
      //       console.log("Cannot send 'ping', connection is not open");
      //     }
      //   }, 10000);
    };

    wsRef.current.onmessage = onMessage;

    wsRef.current.onerror = onError;

    wsRef.current.onclose = () => {
      console.log("Connection closed");
      if (retryCountRef.current < 3) {
        setTimeout(() => {
          wsRef.current = new WebSocket(url);
          retryCountRef.current++;
        }, 5000); // Retry connection after 5 seconds
      } else {
        console.log("Failed to connect after 3 attempts");
        // Display error message
      }
    };

    // const handleVisibilityChange = () => {
    //   if (!document.hidden) {
    //     wsRef.current = new WebSocket(url);
    //   } else if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
    //     wsRef.current.close();
    //   }
    // };

    // document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      //   document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [url, onMessage, onError]);

  // Define the sendMessage function
  function sendMessage(message) {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.log("Cannot send message, connection is not open");
    }
  }

  return { wsRef, sendMessage };
}

// Export both the hook and the function
export default useWebSocket;

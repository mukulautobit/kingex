// src/services/WebSocketClient.ts

// FIX: Use 'import type' for the Store type.
import type { Store } from '@reduxjs/toolkit';
import { updateInstrumentFeed } from '../store/slices/instrumentsSlice';
// WebSocketClient.ts
// import { store } from "../store/store";
// import { setPositions } from "../store/slices/positionsSlice";
// import { setOpenOrders } from "../store/slices/openOrdersSlice";


// This import is now used correctly.
// import { setApiStatus, setStreamStatus } from '../store/slices/webSocketSlice';

export type WebSocketStatus = 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

// FIX: Define a generic response payload to avoid using 'any'
export interface ResponsePayload<T = unknown> {
  // / eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: T;
  data?: T;
  message: string;
  status: 'success' | 'failed' | 'aborted'; // ✅ Added 'aborted' status
}

interface PendingRequest<T> {
  // FIX: Make the resolve function type-safe
  resolve: (value: ResponsePayload<T>) => void;
  reject: (reason?: ResponsePayload<T>) => void;
  // FIX: Use ReturnType<typeof setTimeout> which works in all environments (browser/node)
  timer: ReturnType<typeof setTimeout>;
  onAbort?: () => void;

}

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private url: string;
  // FIX: Make the Map type-safe with <unknown> to handle various response types.
  private pendingRequests = new Map<string, PendingRequest<unknown>>();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectInterval = 3000;
  private status: WebSocketStatus = 'disconnected';
  private store: Store;
  private statusUpdater: (status: WebSocketStatus) => { type: string; payload: WebSocketStatus };
  private pingIntervalId: ReturnType<typeof setInterval> | null = null;
  private messageHandler: ((msg: unknown) => void) | null = null;
  //  ADD THIS NEW PROPERTY
  private onConnectCallbacks: (() => void)[] = [];

  constructor(
    url: string,
    store: Store,
    statusUpdater: (status: WebSocketStatus) => { type: string; payload: WebSocketStatus }
  ) {
    this.url = url;
    this.store = store;
    this.statusUpdater = statusUpdater;
    this.connect();
  }

  // ... (setStatus, connect methods are the same as before)
  private setStatus(newStatus: WebSocketStatus) {
    if (this.status === newStatus) return;
    this.status = newStatus;
    // console.log(`[WebSocket] Status for ${this.url}: ${newStatus.toUpperCase()}`);
    console.log(`[WebSocket] Status for ${this.url.split('?')[0]} is now: ${newStatus}`);
    // console.log(this.url)
    // console.log(this.statusUpdater, "63-for-the")
    this.store.dispatch(this.statusUpdater(newStatus));
  }

  public connect() {
    this.setStatus('connecting');
    if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
      console.warn("[WebSocket] Already connected or connecting.");
      return;
    }
    this.ws = new WebSocket(this.url);
    // console.log(this.url)
    this.ws.onopen = () => {
      this.setStatus('connected');
      this.reconnectAttempts = 0;
      this.startPinging();
      // Run any pending callbacks now that we are connected
      console.log(`[WebSocket] Connection to ${this.url.split('?')[0]} established. Executing queued tasks.`);
      this.onConnectCallbacks.forEach(cb => cb());
      this.onConnectCallbacks = []; // Clear the queue after running
    };

    this.ws.onmessage = (event) => {
      // console.log(" RAW WS MESSAGE:--------------", event.data);

      const msg = JSON.parse(event.data);
      // console.log("MSG-90-------------", msg)
      // console.log("MSG-91////////////////-------------", msg.component)

      // Important funtion to update the instrument feed------->
      if (msg.component === 'quotes') {
        this.store.dispatch(
          updateInstrumentFeed({
            instrument_id: msg.instrument.id,
            data: {
              quotes: msg.data,
            }
          })
        )
        this.messageHandler?.(msg)
        return;
      }

      // if (msg?.type === "positions") {
      //   store.dispatch(setPositions(msg.data));
      // }

      // if (msg?.type === "orders") {
      //   store.dispatch(setOpenOrders(msg.data));
      // }

      if (msg.type === "feed" && msg.instrument) {
        this.messageHandler?.(msg);
        return;
      }

      const rid = msg.rid;
      if (!rid) return;

      const pending = this.pendingRequests.get(rid);
      if (!pending) return;

      clearTimeout(pending.timer);
      this.pendingRequests.delete(rid);

      const payload = msg.payload;



      //  payload has all data&messages
      if (payload?.status === "success") {
        // if(this.messageHandler) this.messageHandler()
        pending.resolve({
          status: "success",
          data: payload.data,
          message: payload.message ?? "",
        });
      } else {
        // console.log("dkfwoifn-vifo")
        pending.reject({
          status: "failed",
          message: payload?.message || "Request failed",
        });
      }
    };



    this.ws.onclose = () => {
      this.setStatus('disconnected');
      this.stopPinging();
      this.pendingRequests.forEach((pending, rid) => {
        clearTimeout(pending.timer);
        pending.reject({
          status: 'failed', message: "WebSocket closed before response was received.",
          payload: undefined
        });
        this.pendingRequests.delete(rid);
      });
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        this.setStatus('reconnecting');
        setTimeout(() => this.connect(), this.reconnectInterval);
      } else {
        console.error(`[WebSocket] Max reconnect attempts reached for ${this.url}.`);
      }
    };
    this.ws.onerror = (err) => {
      console.error(`⚠️ WebSocket error for ${this.url}:`, err);
      this.ws?.close();
    };
  }

  public disconnect() {
    if (!this.ws) return;

    console.log("[WebSocket] Closing connection...");
    this.reconnectAttempts = this.maxReconnectAttempts; // stop auto-reconnect
    this.stopPinging();
    this.ws.close(); // 🔥 THIS triggers onclose
  }

  /**
   * Sends a message and returns a Promise that resolves with the response.
   * @param target The API endpoint/target.
   * @param payload The data to send.
   * @param timeout Timeout in seconds.
      * @param signal The AbortSignal for cancellation. ✅ NEW PARAMETER

   */
  public send<T>(target: string, payload: object, timeout = 30, signal?: AbortSignal): Promise<ResponsePayload<T>> {
    console.log("SEND_CALLED_156")
    return new Promise((resolve, reject) => {

      console.log("SEND_CALLED_AND_PAYLOAD", payload)
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        // console.log("IF_CONDITION", this.ws, this.ws?.readyState, WebSocket.OPEN)
        // console.log("IF_CONDITION", this.ws)
        // console.log("IF_CONDITION", this.ws?.readyState)
        // console.log("IF_CONDITION", WebSocket.OPEN)
        return reject({ message: "WebSocket is not connected.", status: "failed" });
      }

      const rid = crypto.randomUUID();
      // const session = new URL(this.url).searchParams.get("t") || "xyz";
      const message = { rid, target, payload };
      // console.log("line-166", message)
      // ✅ Cancellation Cleanup Function
      const cleanup = () => {
        clearTimeout(timer);
        this.pendingRequests.delete(rid);
        signal?.removeEventListener('abort', onAbort); // Remove listener on completion/rejection
      };
      // console.log("line-173")
      //  Abort Handler
      const onAbort = () => {
        cleanup();
        reject({ message: "Request aborted.", status: "aborted" }); // Reject with an 'aborted' status
      };
      // console.log("line-179_Signal", signal)
      // If a signal is provided, set up the listener
      if (signal) {
        if (signal.aborted) {
          return reject({ message: "Request aborted.", status: "aborted" });
        }
        signal.addEventListener('abort', onAbort);
      }

      console.log("📤 Sending WebSocket message:", message);

      // Set the timeout timer
      const timer = setTimeout(() => {
        cleanup(); // Use the cleanup function
        reject({ message: `Request timed out after ${timeout} seconds.`, status: "failed" });
      }, timeout * 8000);
      console.log("line-195")
      // Store the request
      this.pendingRequests.set(rid, { resolve, reject, timer, onAbort } as PendingRequest<unknown>);
      console.log(message)
      this.ws.send(JSON.stringify(message));
    });
  }
  //     const timer = setTimeout(() => {
  //       if (this.pendingRequests.has(rid)) {
  //         this.pendingRequests.delete(rid);
  //         reject({ message: `Request timed out after ${timeout} seconds.`, status: "failed" });
  //       }
  //     }, timeout * 1000);
  //     this.pendingRequests.set(rid, { resolve, reject, timer } as PendingRequest<unknown>);
  //     this.ws.send(JSON.stringify(message));
  //   });
  // }

  public sendStreamMessage(message: object): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error("❌ Stream WebSocket is not connected. Cannot send message:", message);
      return;
    }
    console.log("📤 Sending Stream Message:", message);
    this.ws.send(JSON.stringify(message));
  }

  public setMessageHandler(handler: (msg: unknown) => void) {
    this.messageHandler = handler;
  }

  private startPinging() {
    if (this.pingIntervalId) {
      clearInterval(this.pingIntervalId);
    }
    this.pingIntervalId = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        const message = {
          rid: crypto.randomUUID(),
          target: "ping",
          payload: {}
        };
        console.log("🏓 Pinging the server:", message);
        this.ws.send(JSON.stringify(message));
      }
    }, 20000);
  }

  private stopPinging() {
    if (this.pingIntervalId) {
      clearInterval(this.pingIntervalId);
      this.pingIntervalId = null;
    }
  }

  public isOpen(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  // ✅ ADD THIS ENTIRE NEW METHOD
  /**
   * Queues a callback to be executed once the WebSocket connection is established.
   * If the connection is already open, the callback is executed immediately.
   * @param callback The function to execute upon connection.
   */
  public onConnected(callback: () => void): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      // If we're already connected, run it straight away.
      callback();
    } else {
      // Otherwise, add it to the queue to run when onopen fires.
      this.onConnectCallbacks.push(callback);
    }
  }
}


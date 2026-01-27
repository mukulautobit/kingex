// export const WEBSOCKET_API_URL ="wss://api-swastiik.fintrabit.com/ws"

// export const WEBSOCKET_STREAM_URL = "wss://stream-swastiik.fintrabit.com/stream"

// export const WEBSOCKET_EVENT_URL =  "wss://event-swastiik.fintrabit.com/event"; 


export const WEBSOCKET_API_URL ="ws://api-test.swtik.com/ws"

// export const WEBSOCKET_STREAM_URL = "ws://api-test.swtik.com/stream"
export const WEBSOCKET_STREAM_URL = "ws://192.46.213.87:6868/stream"

export const WEBSOCKET_EVENT_URL =  "ws://192.46.213.87:6868/event";
// export const WEBSOCKET_EVENT_URL =  "ws://api-test.swtik.com/event";

export const BASE_URL = "https://api-test.swtik.com"

export const TRADE_PENDING = "fintrabit.orders[status=\"pending\" or status=\"partial_filled\"]. _desc(placed_time){instruments.trading_name,account_id,end_execution_time,filled_qty,id,instrument_id,metadata,order_type,placed_qty,placed_time,position_id,price,side,start_execution_time,status,tid,instruments.static_data}"

export const TRADE_CLOSE = "fintrabit.positions[status=\"closed\" and created_at>1][0:30]{account_id,closed_pnl,created_at,id,instrument_id,price,qty,side,status,tid,updated_at,used_balance,\"trading_name\":instruments.trading_name[0],instruments.static_data,trades,torders[status=\"filled\"],instruments.static_data}"

export const TRADE_MARKET = "fintrabit.positions[status=\"open\" or status=\"partial\"]{account_id,closed_pnl,created_at,id,instrument_id,price,qty,side,status,tid,updated_at,used_balance,\"trading_name\":instruments.trading_name[0],torders[status=\"pending\"],instruments.static_data}"

export const HISTORY_POSITIONS = TRADE_CLOSE

export const HISTORY_ORDERS = "fintrabit.orders[status=\"close\"]._desc(placed_time){side,id,price,placed_time,status,\"trading_name\":instruments.trading_name[0]}"

export const HISTORY_DEALS = "fintrabit.orders[status=\"filled\" and placed_time>1766102400]._desc(placed_time)[0:30]{instruments.trading_name,account_id,end_execution_time,filled_qty,id,instrument_id,metadata,order_type,placed_qty,placed_time,position_id,price,side,start_execution_time,status,tid,instruments.static_data}"



export const CONSOLE =  "fintrabit.positions[status=\"console\"]"

export const CHAT_HISTORY_LIMIT = 20;

export const TOKEN =
  localStorage.getItem("token") ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoiQUNDLTQ2OThmOGJhNGFkODRhMmM4NDFjNjUyYWVjNTI2YjhlIiwiYWNjaWQiOiJlYTg5MWU0OS02ZjA3LTQyODgtODU0NC01MmY5OTdmZTdkM2UiLCJyb2xlIjoiYWNjb3VudCIsImlwIjoiMTAzLjE1OC4yMzkuMTQ1In0.XHQWbzaN8YcL5GXjTjZ1xdRyRKNcQFDR7U4tBzL2u5g";

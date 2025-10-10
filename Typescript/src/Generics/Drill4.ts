//4: Default Type Parameters
//1.1. Write default type
type ApiResponse<T = unknown> = {
  status: number;
  data: T;
  }
  
  //1.2. Use with and without generic
  let success: ApiResponse<string> = { status: 200, data: "OK" };
  let fail: ApiResponse = { status: 404, data: "Not Found" };
  
  //1.3. Observe defaulting
  // failed as T defaults to unknown, so data is unknown.
  
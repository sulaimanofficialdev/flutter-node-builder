const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem('token');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || 'An error occurred' };
    }

    return { data };
  } catch (error) {
    console.error('API request error:', error);
    return { error: 'Network error. Please check your connection.' };
  }
}

// Vehicles
export const vehicleApi = {
  getAll: (params?: { status?: string; page?: number; limit?: number }) => {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return request<any>(`/vehicles${queryString}`);
  },
  getById: (id: string) => request<any>(`/vehicles/${id}`),
  create: (data: any) => request<any>('/vehicles', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => request<any>(`/vehicles/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request<any>(`/vehicles/${id}`, { method: 'DELETE' }),
};

// Containers
export const containerApi = {
  getAll: (params?: { status?: string; page?: number; limit?: number }) => {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return request<any>(`/containers${queryString}`);
  },
  getById: (id: string) => request<any>(`/containers/${id}`),
  create: (data: any) => request<any>('/containers', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => request<any>(`/containers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request<any>(`/containers/${id}`, { method: 'DELETE' }),
  addVehicle: (containerId: string, vehicleId: string) => 
    request<any>(`/containers/${containerId}/vehicles`, { method: 'POST', body: JSON.stringify({ vehicleId }) }),
  getProfitLoss: (id: string) => request<any>(`/containers/${id}/profit-loss`),
};

// Inventory
export const inventoryApi = {
  getAll: (params?: { category?: string; status?: string; location?: string; page?: number; limit?: number }) => {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return request<any>(`/inventory${queryString}`);
  },
  getById: (id: string) => request<any>(`/inventory/${id}`),
  create: (data: any) => request<any>('/inventory', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => request<any>(`/inventory/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request<any>(`/inventory/${id}`, { method: 'DELETE' }),
  getValuation: () => request<any>('/inventory/valuation'),
  getLowStock: () => request<any>('/inventory/low-stock'),
};

// Customers
export const customerApi = {
  getAll: (params?: { type?: string; isActive?: boolean; page?: number; limit?: number }) => {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return request<any>(`/customers${queryString}`);
  },
  getById: (id: string) => request<any>(`/customers/${id}`),
  create: (data: any) => request<any>('/customers', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => request<any>(`/customers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request<any>(`/customers/${id}`, { method: 'DELETE' }),
  search: (q: string) => request<any>(`/customers/search?q=${encodeURIComponent(q)}`),
  getBalance: (id: string) => request<any>(`/customers/${id}/balance`),
};

// Orders
export const orderApi = {
  getAll: (params?: { customerId?: string; status?: string; paymentStatus?: string; page?: number; limit?: number }) => {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return request<any>(`/orders${queryString}`);
  },
  getById: (id: string) => request<any>(`/orders/${id}`),
  create: (data: any) => request<any>('/orders', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => request<any>(`/orders/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request<any>(`/orders/${id}`, { method: 'DELETE' }),
  recordPayment: (id: string, amount: number) => 
    request<any>(`/orders/${id}/payment`, { method: 'POST', body: JSON.stringify({ amount }) }),
  getMonthlySales: (year: number, month?: number) => {
    const params = month ? `?year=${year}&month=${month}` : `?year=${year}`;
    return request<any>(`/orders/monthly-sales${params}`);
  },
};

// Employees
export const employeeApi = {
  getAll: (params?: { department?: string; location?: string; status?: string; page?: number; limit?: number }) => {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return request<any>(`/employees${queryString}`);
  },
  getById: (id: string) => request<any>(`/employees/${id}`),
  create: (data: any) => request<any>('/employees', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => request<any>(`/employees/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request<any>(`/employees/${id}`, { method: 'DELETE' }),
  addExpense: (id: string, data: any) => 
    request<any>(`/employees/${id}/expenses`, { method: 'POST', body: JSON.stringify(data) }),
  getExpenseReport: (year: number, month?: number, location?: string) => {
    const params = new URLSearchParams({ year: year.toString() });
    if (month) params.append('month', month.toString());
    if (location) params.append('location', location);
    return request<any>(`/employees/expense-report?${params.toString()}`);
  },
};

// Properties
export const propertyApi = {
  getAll: (params?: { type?: string; location?: string; ownership?: string; status?: string; page?: number; limit?: number }) => {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return request<any>(`/properties${queryString}`);
  },
  getById: (id: string) => request<any>(`/properties/${id}`),
  create: (data: any) => request<any>('/properties', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => request<any>(`/properties/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request<any>(`/properties/${id}`, { method: 'DELETE' }),
  getIncomeReport: (year: number, month?: number) => {
    const params = month ? `?year=${year}&month=${month}` : `?year=${year}`;
    return request<any>(`/properties/income-report${params}`);
  },
};

// Transactions
export const transactionApi = {
  getAll: (params?: { type?: string; category?: string; startDate?: string; endDate?: string; page?: number; limit?: number }) => {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return request<any>(`/transactions${queryString}`);
  },
  getById: (id: string) => request<any>(`/transactions/${id}`),
  create: (data: any) => request<any>('/transactions', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => request<any>(`/transactions/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request<any>(`/transactions/${id}`, { method: 'DELETE' }),
  getFinancialSummary: (year: number, month?: number, location?: string) => {
    const params = new URLSearchParams({ year: year.toString() });
    if (month) params.append('month', month.toString());
    if (location) params.append('location', location);
    return request<any>(`/transactions/financial-summary?${params.toString()}`);
  },
  getCashFlow: (year: number, location?: string) => {
    const params = location ? `?year=${year}&location=${location}` : `?year=${year}`;
    return request<any>(`/transactions/cash-flow${params}`);
  },
  getAccountBalances: () => request<any>('/transactions/account-balances'),
};

// Reports
export const reportApi = {
  getDashboardStats: () => request<any>('/reports/dashboard'),
  getContainerProfitLoss: (startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    return request<any>(`/reports/container-profit-loss?${params.toString()}`);
  },
  getReceivables: () => request<any>('/reports/receivables'),
  getPayables: () => request<any>('/reports/payables'),
};

// Auth
export const authApi = {
  login: (email: string, password: string) => 
    request<any>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (data: any) => 
    request<any>('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  getProfile: () => request<any>('/auth/me'),
  updateProfile: (data: any) => 
    request<any>('/auth/me', { method: 'PUT', body: JSON.stringify(data) }),
  changePassword: (currentPassword: string, newPassword: string) =>
    request<any>('/auth/change-password', { method: 'PUT', body: JSON.stringify({ currentPassword, newPassword }) }),
};

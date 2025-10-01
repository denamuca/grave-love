import React, { createContext, useContext, useMemo, useReducer } from 'react';
import type { PropsWithChildren } from 'react';
import { cemeteries as seedCemeteries, memorials as seedMemorials, posts as seedPosts, serviceTypes as seedServiceTypes } from '@/data/mock';

export type Memorial = typeof seedMemorials[number];
export type Post = typeof seedPosts[number];
export type ServiceType = typeof seedServiceTypes[number];
export type Cemetery = typeof seedCemeteries[number];

export type Order = {
  id: string;
  memorial_id: string;
  service_type_id: string;
  scheduled_date: string;
  notes?: string;
  status: 'created' | 'scheduled' | 'completed';
  price: string;
};

export type Subscription = {
  id: string;
  memorial_id: string;
  plan_key: 'flowers_monthly' | 'cleaning_seasonal';
  status: 'active' | 'paused' | 'canceled';
  next_run: string;
};

type State = {
  memorials: Memorial[];
  posts: Post[];
  serviceTypes: ServiceType[];
  cemeteries: Cemetery[];
  orders: Order[];
  subscriptions: Subscription[];
  reminders: Record<string, { birthday: boolean; passing: boolean; religious: boolean }>; // per memorial
  candlesByName: Record<string, string>; // memorial_id -> ISO until
};

type Action =
  | { type: 'ADD_MEMORIAL'; payload: Memorial }
  | { type: 'ADD_POST'; payload: Post }
  | { type: 'CREATE_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { id: string; status: Order['status'] } }
  | { type: 'ADD_SUBSCRIPTION'; payload: Subscription }
  | { type: 'SET_REMINDERS'; payload: { memorial_id: string; values: Partial<State['reminders'][string]> } }
  | { type: 'SET_NAME_CANDLE'; payload: { memorial_id: string; until: string } };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_MEMORIAL':
      return { ...state, memorials: [action.payload, ...state.memorials] };
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] };
    case 'CREATE_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map((o) => (o.id === action.payload.id ? { ...o, status: action.payload.status } : o)),
      };
    case 'ADD_SUBSCRIPTION':
      return { ...state, subscriptions: [action.payload, ...state.subscriptions] };
    case 'SET_REMINDERS':
      return {
        ...state,
        reminders: {
          ...state.reminders,
          [action.payload.memorial_id]: {
            birthday: state.reminders[action.payload.memorial_id]?.birthday ?? true,
            passing: state.reminders[action.payload.memorial_id]?.passing ?? true,
            religious: state.reminders[action.payload.memorial_id]?.religious ?? false,
            ...action.payload.values,
          },
        },
      };
    case 'SET_NAME_CANDLE':
      return {
        ...state,
        candlesByName: { ...state.candlesByName, [action.payload.memorial_id]: action.payload.until },
      };
    default:
      return state;
  }
}

const initial: State = {
  memorials: seedMemorials,
  posts: seedPosts,
  serviceTypes: seedServiceTypes,
  cemeteries: seedCemeteries,
  orders: [],
  subscriptions: [],
  reminders: {},
  candlesByName: {},
};

type Ctx = State & {
  addMemorial: (m: Omit<Memorial, 'id'>) => Memorial;
  addPost: (p: Omit<Post, 'id' | 'created_at'>) => Post;
  createOrder: (o: Omit<Order, 'id' | 'status' | 'price'>) => Order;
  setOrderCompleted: (id: string) => void;
  addSubscription: (s: Omit<Subscription, 'id' | 'status'>) => Subscription;
  setReminders: (memorial_id: string, values: Partial<State['reminders'][string]>) => void;
  startNameCandle: (memorial_id: string, hours?: number) => string; // returns until ISO
};

const AppContext = createContext<Ctx | null>(null);

export function AppProvider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(reducer, initial);

  const api = useMemo<Ctx>(() => {
    function uid(prefix: string) {
      return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
    }

    return {
      ...state,
      candlesByName: state.candlesByName,
      addMemorial: (m) => {
        const newM: Memorial = { ...m, id: uid('m') } as Memorial;
        dispatch({ type: 'ADD_MEMORIAL', payload: newM });
        return newM;
      },
      addPost: (p) => {
        const newP: Post = { ...p, id: uid('p'), created_at: new Date().toISOString() } as Post;
        dispatch({ type: 'ADD_POST', payload: newP });
        return newP;
      },
      createOrder: (o) => {
        const st = state.serviceTypes.find((s) => s.id === o.service_type_id);
        const newO: Order = {
          ...o,
          id: uid('o'),
          status: 'scheduled',
          price: st?.price ?? '$0',
        };
        dispatch({ type: 'CREATE_ORDER', payload: newO });
        return newO;
      },
      setOrderCompleted: (id) => dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id, status: 'completed' } }),
      addSubscription: (s) => {
        const newS: Subscription = { ...s, id: uid('sub'), status: 'active' };
        dispatch({ type: 'ADD_SUBSCRIPTION', payload: newS });
        return newS;
      },
      setReminders: (memorial_id, values) => dispatch({ type: 'SET_REMINDERS', payload: { memorial_id, values } }),
      startNameCandle: (memorial_id, hours = 24) => {
        const until = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
        dispatch({ type: 'SET_NAME_CANDLE', payload: { memorial_id, until } });
        return until;
      },
    };
  }, [state]);

  return <AppContext.Provider value={api}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('AppProvider missing');
  return ctx;
}

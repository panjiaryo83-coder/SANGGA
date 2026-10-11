import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export type UserRole = 'maya' | 'raka' | 'andi';

export type MissionStatus =
  | 'none'
  | 'created'
  | 'pending_auth'
  | 'authorized'
  | 'in_progress'
  | 'completed';

export type AndiRequestStatus =
  | 'none'
  | 'received'
  | 'accepted'
  | 'confirmed'
  | 'dispatched'
  | 'arrived'
  | 'completed';

export interface AppState {
  currentUser: UserRole | null;
  mission: {
    status: MissionStatus;
    needed: number;
    confirmedByAndi: number;
    arrivedTrucks: number;
    timelineEvents: string[];
    secondMission: {
      status: 'none' | 'created' | 'pending_auth';
    };
  };
  andiRequest: {
    status: AndiRequestStatus;
    trucksRequested: number;
    trucksConfirmed: number;
  };
  andiPostMission: 'none' | 'needs_update' | 'ready';
  notifications: {
    maya: number;
    raka: number;
    andi: number;
  };
}

const initialState: AppState = {
  currentUser: null,
  mission: {
    status: 'none',
    needed: 10,
    confirmedByAndi: 0,
    arrivedTrucks: 0,
    timelineEvents: [],
    secondMission: { status: 'none' },
  },
  andiRequest: {
    status: 'none',
    trucksRequested: 3,
    trucksConfirmed: 0,
  },
  andiPostMission: 'none',
  notifications: { maya: 1, raka: 2, andi: 1 },
};

type Action =
  | { type: 'LOGIN'; user: UserRole }
  | { type: 'LOGOUT' }
  | { type: 'CREATE_MISSION' }
  | { type: 'SUBMIT_FOR_AUTH' }
  | { type: 'APPROVE_ACTIVATION' }
  | { type: 'ANDI_ACCEPT_REQUEST' }
  | { type: 'ANDI_CONFIRM_CAPACITY'; trucks: number }
  | { type: 'ANDI_DISPATCH' }
  | { type: 'ANDI_ARRIVE' }
  | { type: 'COMPLETE_MISSION' }
  | { type: 'POST_MISSION_READINESS'; choice: 'ready' | 'needs_update' }
  | { type: 'CREATE_SECOND_MISSION' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, currentUser: action.user };
    case 'LOGOUT':
      return { ...state, currentUser: null };
    case 'CREATE_MISSION':
      return {
        ...state,
        mission: {
          ...state.mission,
          status: 'created',
          needed: 10,
          timelineEvents: ['Kebutuhan dibuat · 10 menit lalu'],
        },
        notifications: { ...state.notifications, raka: state.notifications.raka + 1 },
      };
    case 'SUBMIT_FOR_AUTH':
      return {
        ...state,
        mission: {
          ...state.mission,
          status: 'pending_auth',
          timelineEvents: [...state.mission.timelineEvents, 'Diajukan ke otoritas · Baru saja'],
        },
      };
    case 'APPROVE_ACTIVATION':
      return {
        ...state,
        mission: {
          ...state.mission,
          status: 'authorized',
          timelineEvents: [...state.mission.timelineEvents, 'Disetujui oleh Raka Pratama · Baru saja'],
        },
        andiRequest: {
          ...state.andiRequest,
          status: 'received',
          trucksRequested: 3,
        },
        notifications: { ...state.notifications, andi: state.notifications.andi + 1, raka: Math.max(0, state.notifications.raka - 1) },
      };
    case 'ANDI_ACCEPT_REQUEST':
      return {
        ...state,
        andiRequest: { ...state.andiRequest, status: 'accepted' },
        mission: {
          ...state.mission,
          timelineEvents: [...state.mission.timelineEvents, 'Permintaan diterima oleh PT Nusantara · Baru saja'],
        },
        notifications: { ...state.notifications, andi: Math.max(0, state.notifications.andi - 1) },
      };
    case 'ANDI_CONFIRM_CAPACITY':
      return {
        ...state,
        andiRequest: {
          ...state.andiRequest,
          status: 'confirmed',
          trucksConfirmed: action.trucks,
        },
        mission: {
          ...state.mission,
          status: 'in_progress',
          confirmedByAndi: action.trucks,
          timelineEvents: [...state.mission.timelineEvents, `${action.trucks} truk dikonfirmasi · Baru saja`],
        },
      };
    case 'ANDI_DISPATCH':
      return {
        ...state,
        andiRequest: { ...state.andiRequest, status: 'dispatched' },
        mission: {
          ...state.mission,
          timelineEvents: [...state.mission.timelineEvents, 'Truk diberangkatkan · Baru saja'],
        },
      };
    case 'ANDI_ARRIVE':
      return {
        ...state,
        andiRequest: { ...state.andiRequest, status: 'arrived' },
        mission: {
          ...state.mission,
          arrivedTrucks: state.andiRequest.trucksConfirmed,
          timelineEvents: [...state.mission.timelineEvents, `${state.andiRequest.trucksConfirmed} truk tiba di lokasi · 14.32`],
        },
      };
    case 'COMPLETE_MISSION':
      return {
        ...state,
        andiRequest: { ...state.andiRequest, status: 'completed' },
        mission: {
          ...state.mission,
          status: 'completed',
          timelineEvents: [...state.mission.timelineEvents, 'Misi selesai · 16.00'],
        },
      };
    case 'POST_MISSION_READINESS':
      return {
        ...state,
        andiPostMission: action.choice,
        notifications: action.choice === 'needs_update'
          ? { ...state.notifications, maya: state.notifications.maya + 1 }
          : state.notifications,
      };
    case 'CREATE_SECOND_MISSION':
      return {
        ...state,
        mission: {
          ...state.mission,
          secondMission: { status: 'created' },
        },
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

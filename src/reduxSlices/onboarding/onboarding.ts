import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { connections } from 'constants/Connections';
import { ConnectionStatus } from 'enums/connections';
import { Client, NewClient } from 'interfaces/Client';
import { Connection } from 'interfaces/Connection';
import { AgencyOnBoardingPaths, BusinessOnBoardingPaths } from 'pages/paths';

enum defaultValues {
  BILLING_PLAN = -1,
}
interface Plan {
  id: string;
  amount: number;
  planName: string;
  currency: string;
  internal: string;
  trialPeriodDays: string;
  billingScheme: string;
}
interface onboardingStateInterface {
  step: number;
  prevStep: number;
  nested: boolean;
  disableContine: boolean;
  nestedSteps: number;
  nestedLimit: number;
  billingPlan:Plan|null;
  nestedPath: `${AgencyOnBoardingPaths}` | `${BusinessOnBoardingPaths}` | '';
  clients: Client[];
  users: NewClient[];
  allConnectionList: Connection[];
  billing: {
    plan: number;
    billingDetails: {};
  };
}

const initialState: onboardingStateInterface = {
  step: 1,
  prevStep: 0,
  nested: false,
  nestedSteps: 0,
  nestedLimit: 0,
  nestedPath: '',
  billingPlan:null,
  disableContine:false,
  clients: [] as Client[],
  users: [] as NewClient[],
  allConnectionList: connections,
  billing: {
    plan: defaultValues.BILLING_PLAN,
    billingDetails: {},
  },
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    next: (state) => {
      if (state.nested) {
        if (state.nestedSteps < state.nestedLimit) {
          state.nestedSteps += 1;
        } else {
          state.step += 1;
        }
      } else {
        state.prevStep = state.step;
        state.step += 1;
      }
    },
    back: (state) => {
      if (state.nested) {
        if (state.nestedSteps > 0) {
          state.nestedSteps -= 1;
        } else {
          state.step -= 1;
        }
      } else {
        if (state.step > 0) {
          state.prevStep = state.step;
          state.step -= 1;
        }
      }
    },
    nested: (state, payloadWithType) => {
      if (payloadWithType.payload === '') {
        state.nested = false;
        state.nestedSteps = 0;
      } else {
        state.nested = true;
      }
      state.nestedPath = payloadWithType.payload;
    },
    setNestedStepsLimit: (state, payloadWithType) => {
      state.nestedLimit = payloadWithType.payload.index;
    },
    setClientsInStore: (state, payloadWithType) => {
      state.clients = payloadWithType.payload;
    },
    setUsersInStore: (state, payloadWithType) => {
      state.users = payloadWithType.payload;
    },
    updateUsersInStore: (state, payloadWithType) => {
      const index = state.users.findIndex(
        (user: NewClient) => user.email === payloadWithType.payload.email
      );
      state.users[index].invited = true;
      state.users[index].role = payloadWithType.payload.role;
    },
    updateConnections: (state, payloadWithType) => {
      if (
        state.allConnectionList[payloadWithType.payload.index].status ===
        ConnectionStatus.NOT_CONNECTED
      ) {
        state.allConnectionList[payloadWithType.payload.index].status =
          ConnectionStatus.CONNECTED;
      } else {
        state.allConnectionList[payloadWithType.payload.index].status =
          ConnectionStatus.NOT_CONNECTED;
      }
      if (payloadWithType.payload.notNested) {
        return;
      }
    },
    countNestedConnections: (state, payloadWithType) => {
      const connections = state.allConnectionList.reduce(
        (accumulator, currentObject) => {
          if (currentObject.status === ConnectionStatus.CONNECTED) {
            accumulator += 1;
          }
          return accumulator;
        },
        0
      );
      state.nestedLimit = connections;
      if (payloadWithType.payload.set) {
        state.nestedSteps = connections;
      }
    },
    updateConnectionsOfClient: (state, payloadWithType) => {
      if (payloadWithType.payload.action === 'add') {
        state.clients[payloadWithType.payload.index].connections?.push({
          connectionKey: payloadWithType.payload.connectionKey.toString(),
          connectionId: payloadWithType.payload.connectionId,
          clientMutationId: payloadWithType.payload.clientMutationId,
        });
      }

      if (payloadWithType.payload.action === 'remove') {
        state.clients[payloadWithType.payload.index].connections =
          state.clients[payloadWithType.payload.index].connections?.filter(
            (connection) =>
              connection.connectionKey !== payloadWithType.payload.connectionKey
          );
      }
    },
    setBilling: (state, payloadWithType) => {
      if (payloadWithType.payload.set) {
        if (state.billing.plan !== defaultValues.BILLING_PLAN) {
          state.nestedSteps = 1;
        }
      }
      state.nested = true;
      state.nestedLimit = 1;
    },
    setBillingPlan: (state, payloadWithType) => {
      state.billing.plan = payloadWithType.payload;
    },
    setBillingDetails: (state, payloadWithType) => {
      state.billing.billingDetails = payloadWithType.payload;
    },
    setBillingPlanObject:(state, payloadWithType) => {
     state.billingPlan = payloadWithType.payload;
    },

    clearOnBoardingStore: (state) => {
      state.step = 1;
      state.prevStep = 0;
      state.nested = false;
      state.nestedSteps = 0;
      state.nestedLimit = 0;
      state.nestedPath = '';
      state.clients = [] as Client[];
      state.users = [] as NewClient[];
      state.allConnectionList = connections;
      state.billing.plan = defaultValues.BILLING_PLAN;
      state.billing.billingDetails = {};
    },
    setLoading:(state,payloadWithType)=>{
      state.disableContine = payloadWithType.payload
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
});

export const {
  next,
  back,
  nested,
  setNestedStepsLimit,
  setClientsInStore,
  setUsersInStore,
  updateUsersInStore,
  updateConnections,
  countNestedConnections,
  updateConnectionsOfClient,
  setBilling,
  setBillingPlan,
  setBillingDetails,
  clearOnBoardingStore,
  setBillingPlanObject,
  setLoading
} = onboardingSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.onboarding.value)`
export const getOnboardingFromStore = (state: RootState) => state.onboarding;

export default onboardingSlice.reducer;

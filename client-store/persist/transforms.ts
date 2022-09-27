import { createTransform, Transform } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import createCompressor from "redux-persist-transform-compress";

// settings
import { defaultSecretKey } from "../../settings/client-store-encrypt";
import whitelist from "../../settings/client-store-transform-whitelist";
import { StoreState } from "..";

const DEV = true;

const demoTransform = createTransform<StoreState, StoreState>(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    // convert mySet to an Array.
    return inboundState;
  },
  // transform state being rehydrated
  (outboundState, key) => {
    // convert mySet back to a Set.
    return outboundState;
  },
  {
    whitelist,
  }
);

// also see: https://github.com/maxdeviant/redux-persist-transform-encrypt
const encrypt = encryptTransform<StoreState>(
  {
    secretKey: defaultSecretKey,
    onError: function (error) {
      console.log(error);
    },
  },
  {
    whitelist,
  }
);

// also see: https://github.com/rt2zz/redux-persist-transform-compress
const compressor = createCompressor<StoreState, string>({
  whitelist,
});

export const transforms: Transform<StoreState, any>[] = DEV
  ? [demoTransform]
  : [demoTransform, encrypt, compressor];

import Contentstack from "contentstack";

const apiKey = process.env.CONTENTSTACK_API_KEY;
const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN;
const environment = process.env.CONTENTSTACK_ENVIRONMENT || "dev";

function createQueryStub(): any {
  return {
    includeReference: () => createQueryStub(),
    where: () => createQueryStub(),
    toJSON: () => createQueryStub(),
    find: async () => [[], []],
  };
}

const Stack = apiKey && deliveryToken
  ? Contentstack.Stack({
      api_key: apiKey,
      delivery_token: deliveryToken,
      environment,
      region: Contentstack.Region.EU  // 👈 this is the fix!
    })
  : {
      ContentType: () => ({ Query: createQueryStub }),
    };

export { Stack };

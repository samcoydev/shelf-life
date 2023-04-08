import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: "us-east-2_C3EtisuFW",
  ClientId: "2ak85eftqov209augksrbap1ki"
}

export default new CognitoUserPool(poolData);
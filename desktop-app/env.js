const dotenv = require("dotenv");

/**
 * staging, development, production 등의 phase 정보가 세팅되었는지 확인한다.
 */
const validatePhase = () => {
  if ("NODE_ENV" in process.env) {
    console.log("resolved NODE_ENV to", process.env["NODE_ENV"]);
  } else {
    throw new Error("NODE_ENV not given");
  }
};

/**
 * phase 에 맞게 가져온 세부적인 환경변수의 validation 을 진행한다.
 * 실제로는, 단순히 있는지 확인하며 사실상 있는지 확인하는 대상은 아직 1개밖에 없다.
 */
const validateRequiredEnviornment = () => {
  if ("api_key" in process.env) {
    console.log("resolved api_key to", process.env["api_key"]);
  } else {
    throw new Error("api_key not given");
  }
};

validatePhase();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
validateRequiredEnviornment();

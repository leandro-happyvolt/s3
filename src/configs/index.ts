import "dotenv/config";

if (
    !process.env.DATABASE_URL ||
    !process.env.IP_LOCAL ||
    !process.env.REST_API ||
    !process.env.AWS_BUCKET_NAME ||
    !process.env.AWS_BUCKET_REGION ||
    !process.env.AWS_ACCESS_KEY_ID ||
    !process.env.AWS_SECRET_ACCESS_KEY
) {
    throw new Error("Missing environment variables");
}
const configs = {
    DATABASE_URL: process.env.DATABASE_URL,
    IP_LOCAL: process.env.IP_LOCAL,
    REST_API: process.env.REST_API,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
};

export default configs;
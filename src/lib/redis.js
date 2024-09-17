import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://smashing-seal-61103.upstash.io",
  token: "Ae6vAAIjcDE5OTBhMTZiN2ZlOWQ0ZDVmODI1YjI0NzExNWU1MmVkMnAxMA",
});

await redis.set("foo", "bar");
const data = await redis.get("foo");

import { web } from "./app/configs/web";
import { logger } from "./app/utils/logging";

require("dotenv").config();

web.listen(3000, () => {
    logger.info("Listening on port 3000");
});

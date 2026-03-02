import "dotenv/config";
import app from "./app.js";

const port = Number(process.env.PORT) || 3310;

app.listen(port, () => {
	console.info(`Server running on http://localhost:${port}`);
});

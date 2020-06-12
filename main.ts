import { Application, Router } from "./deps.ts";
import {
  getTimbrature,
  inserisciTimbratura,
  getTimbratura,
} from "./controllers/timbraturaController.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
const env = Deno.env.toObject();
const PORT = env.PORT || 4000;
const HOST = env.HOST || "0.0.0.0";

/* 

export const updateDog = async ({
	params,
	request,
	response,
}: {
	params: {.get('/dogs', getDogs
		name: string
	}
	request: any
	response: any
}) => {
	const temp = dogs.filter((existingDog) => existingDog.name === params.name)
	const body = await request.body()
	const { age }: { age: number } = body.value

	if (temp.length) {
		temp[0].age = age
		response.status = 200
		response.body = { msg: 'OK' }
		return
	}

	response.status = 400
	response.body = { msg: `Cannot find dog ${params.name}` }
}

export const removeDog = ({
	params,
	response,
}: {
	params: {
		name: string
	}
	response: any
}) => {
	const lengthBefore = dogs.length
	dogs = dogs.filter((dog) => dog.name !== params.name)

	if (dogs.length === lengthBefore) {
		response.status = 400
		response.body = { msg: `Cannot find dog ${params.name}` }
		return
	}

	response.body = { msg: 'OK' }deps
	response.status = 200
} */

const router = new Router();
router
  .get("/timbratura", getTimbrature)
  .post("/timbratura", inserisciTimbratura)
  .get("/timbratura/:id", getTimbratura);
/* 
	.get('/dogs/:name', getDog)
	.put('/dogs/:name', updateDog)
	.delete('/dogs/:name', removeDog) */

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${PORT}...`);

await app.listen(`${HOST}:${PORT}`);

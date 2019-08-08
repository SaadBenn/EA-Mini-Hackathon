const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
	// we are in the main thread

	// create the worker
	const worker = new Worker(__filename);

	worker.on('message', (msg) => { console.log(msg); });
} else {
	// worker code

	// send message from the worker to the parent
	
}